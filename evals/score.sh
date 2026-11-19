#!/usr/bin/env bash
# Score an audit report against a fixture's expected findings.
# Usage: evals/score.sh EXPECTED.tsv AUDIT REPORT.md
#   AUDIT is the audit name used in the expected file, e.g. security or correctness.
# Prints one line per planted item and finding, then a tab-separated RESULT line:
#   RESULT  defects_found  defects_total  decoys_flagged  unplanted  findings  other_audit
set -euo pipefail

if [[ $# -ne 3 ]]; then
  printf 'Usage: %s EXPECTED.tsv AUDIT REPORT.md\n' "$0" >&2
  exit 2
fi
expected="$1" audit="$2" report="$3"
[[ -f "$expected" && -f "$report" ]] || { printf 'Missing input file\n' >&2; exit 2; }

awk -F '\t' -v audit="$audit" -v tol=5 '
  function abs(x) { return x < 0 ? -x : x }
  function ends_with(s, t) { return length(s) >= length(t) && substr(s, length(s) - length(t) + 1) == t }
  function same_file(cited, want) {
    sub(/^\.\//, "", cited)
    return cited == want || ends_with(cited, "/" want) || ends_with(want, "/" cited)
  }
  # Expected rows: first file
  FNR == NR {
    if (FNR == 1) next
    # Keep every row for matching; only defects for this audit count toward recall.
    n++; eid[n] = $1; kind[n] = $3; efile[n] = $4; es[n] = $5 + 0; ee[n] = $6 + 0; ekw[n] = tolower($8)
    mine[n] = (index("," $2 ",", "," audit ",") > 0)
    if (mine[n] && $3 == "defect" && !($1 in counted)) { counted[$1] = 1; defects++ }
    rows_in_file[$4]++
    next
  }
  # Report: second file
  /^```/ { in_code = !in_code; next }
  in_code { next }
  /^## / { cur = ""; next }
  # Accept loose headings such as "### SEC-001 (High): ..." so recall is scored
  # separately from format, which check-report.sh reports.
  /^### [A-Z]+-[0-9]+([^0-9]|$)/ { cur = $0; sub(/^### /, "", cur); match(cur, /^[A-Z]+-[0-9]+/); cur = substr(cur, 1, RLENGTH); nf++; fid[nf] = cur; title[cur] = tolower($0); next }
  /^#/ { cur = ""; next }
  cur != "" && /^- Location:/ { loc[cur] = loc[cur] " " substr($0, 13); next }
  cur != "" { body[cur] = body[cur] " " $0; next }
  END {
    for (k = 1; k <= nf; k++) {
      f = fid[k]; best = 0; best_score = -1
      # Without a Location field, fall back to file references in the finding body.
      text = (f in loc) ? loc[f] : body[f]
      if (!(f in loc)) loc[f] = " no Location field"
      while (match(text, /[A-Za-z0-9_.\/-]+\.[A-Za-z]+(:[0-9]+(-[0-9]+)?)?/)) {
        tok = substr(text, RSTART, RLENGTH); text = substr(text, RSTART + RLENGTH)
        path = tok; ls = 0; le = 0
        if (match(tok, /:[0-9]+(-[0-9]+)?$/)) {
          path = substr(tok, 1, RSTART - 1); range = substr(tok, RSTART + 1)
          split(range, r, "-"); ls = r[1] + 0; le = (2 in r) ? r[2] + 0 : ls
          delete r
        }
        for (i = 1; i <= n; i++) {
          if (!same_file(path, efile[i])) continue
          # A finding title naming the planted issue outweighs line numbers, which reports often get wrong.
          named = (ekw[i] != "" && title[f] ~ ekw[i]) ? 3 : 0
          score = 0
          if (ls == 0) {
            if (rows_in_file[efile[i]] == 1) score = 0.5
          } else {
            # Prefer citations inside the planted range; allow `tol` lines of slack otherwise.
            lo = (ls > es[i]) ? ls : es[i]; hi = (le < ee[i]) ? le : ee[i]
            if (hi >= lo) score = 2 + (hi - lo + 1) / (ee[i] - es[i] + 1)
            else {
              dist = (le < es[i]) ? es[i] - le : ls - ee[i]
              if (dist <= tol) score = 1 + 1 / (1 + dist)
            }
          }
          if (score == 0 && !named) continue
          # A decoy is a specific wrong claim; other findings on the same lines are not hits.
          if (kind[i] == "decoy" && !named) continue
          score += named
          if (score > best_score) { best_score = score; best = i }
        }
      }
      if (best == 0) { unplanted++; printf "unplanted %s (%s)\n", f, substr(loc[f], 2) }
      else if (kind[best] == "defect" && !mine[best]) { other++; printf "other     %s matches %s, planted for another audit\n", f, eid[best] }
      else if (kind[best] == "decoy") { if (!(eid[best] in decoy_hit)) decoys++; decoy_hit[eid[best]] = decoy_hit[eid[best]] " " f }
      else hit[eid[best]] = hit[eid[best]] " " f
    }
    for (i = 1; i <= n; i++) {
      if (eid[i] in printed || (!mine[i] && kind[i] == "defect")) continue
      printed[eid[i]] = 1
      if (kind[i] == "defect") {
        if (eid[i] in hit) { found++; printf "found     %s by%s\n", eid[i], hit[eid[i]] }
        else printf "missed    %s (%s:%d-%d)\n", eid[i], efile[i], es[i], ee[i]
      } else if (eid[i] in decoy_hit) printf "decoy     %s flagged by%s\n", eid[i], decoy_hit[eid[i]]
    }
    printf "RESULT\t%d\t%d\t%d\t%d\t%d\t%d\n", found, defects, decoys, unplanted, nf, other
  }
' "$expected" "$report"
