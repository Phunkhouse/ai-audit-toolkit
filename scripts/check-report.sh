#!/usr/bin/env bash
# Check audit reports against the toolkit's report format.
# Usage: scripts/check-report.sh REPORT.md [REPORT.md ...]
set -euo pipefail

if [[ $# -eq 0 || "$1" == '-h' || "$1" == '--help' ]]; then
  cat <<'USAGE'
Usage: scripts/check-report.sh REPORT.md [REPORT.md ...]

Checks the report header, required sections, finding headings and IDs,
exact Severity/Confidence/Status/Priority values, required finding fields
and the executive summary counts. Prints one line per problem and exits
non-zero if any report has errors.
USAGE
  [[ $# -eq 0 ]] && exit 2 || exit 0
fi

status=0
for report in "$@"; do
  if [[ ! -f "$report" ]]; then
    printf '%s: file not found\n' "$report" >&2
    status=1
    continue
  fi
  if ! awk -v file="$report" '
    function err(line, msg) { printf "%s:%d: %s\n", file, line, msg; errors++ }
    function trim(s) { sub(/^[ \t]+/, "", s); sub(/[ \t]+$/, "", s); return s }
    function close_finding(   i, f) {
      if (cur == "") return
      for (i = 1; i <= nreq; i++) {
        f = req[i]
        if (!((cur, f) in seen)) err(cur_line, cur " is missing field \"" f "\"")
      }
      if (needs_priority[cur_prefix] && !((cur, "Priority") in seen))
        err(cur_line, cur " is missing field \"Priority\" (required for " cur_prefix " findings)")
      if (sev != "" && st != "") count[sev, st]++
      cur = ""; sev = ""; st = ""
    }
    BEGIN {
      nreq = split("Severity|Confidence|Status|Previous finding|Location|Evidence|Impact|Remediation|Verification", req, "|")
      split("SEC COR PRD PERF ARC CLN WEB SCE LEG TCI", p, " "); for (i in p) prefix[p[i]] = 1
      split("PERF ARC CLN TCI", p, " "); for (i in p) needs_priority[p[i]] = 1
      allowed["Severity"] = "|Critical|High|Medium|Low|"
      allowed["Confidence"] = "|High|Medium|Low|"
      allowed["Status"] = "|Confirmed|Suspected|"
      allowed["Priority"] = "|Now|Next|Later|"
      nhdr = split("Date|Scope|Audited project commit|Toolkit commit|Toolkit working tree|Previous audit|Evidence sources and access limitations", hdr, "|")
      nsec = split("Coverage log|Not verified", sections, "|")
      in_code = 0; cur = ""; section = ""
    }
    /^```/ { in_code = !in_code; next }
    in_code { next }
    /^## / {
      close_finding()
      section = trim(substr($0, 4)); has_section[section] = 1
      next
    }
    /^### / {
      close_finding()
      h = substr($0, 5)
      if (h ~ /^[A-Z]+-[0-9]+:/ ) {
        id = h; sub(/:.*/, "", id)
        pre = id; sub(/-.*/, "", pre)
        num = id; sub(/^[A-Z]+-/, "", num)
        if (!(pre in prefix)) err(NR, "unknown ID prefix in " id)
        else if (length(num) < 3) err(NR, id " should use at least three digits")
        if (id in ids) err(NR, "duplicate finding " id " (first at line " ids[id] ")")
        else ids[id] = NR
        if (trim(substr(h, length(id) + 2)) == "") err(NR, id " has no title")
        nfind++; cur = id; cur_prefix = pre; cur_line = NR
      } else if (h ~ /^[A-Z]+-[0-9]+/) {
        err(NR, "finding heading needs \"ID: title\": " h)
      }
      next
    }
    /^- [A-Za-z][A-Za-z ]*:/ {
      line = substr($0, 3); name = line; sub(/:.*/, "", name); value = trim(substr(line, length(name) + 2))
      if (section == "" && cur == "") { header[name] = value; next }
      if (cur == "") next
      seen[cur, name] = 1
      if (name in allowed) {
        if (index(allowed[name], "|" value "|") == 0) {
          err(NR, cur " " name " must be exactly one of " substr(allowed[name], 2, length(allowed[name]) - 2) ", got \"" value "\"")
          bad_values++
        }
        if (name == "Severity") sev = value
        if (name == "Status") st = value
      }
      next
    }
    section == "Executive summary" && /^\| *(Critical|High|Medium|Low) *\|/ {
      n = split($0, cells, "|")
      lvl = trim(cells[2]); summary[lvl, "Confirmed"] = trim(cells[3]); summary[lvl, "Suspected"] = trim(cells[4]); has_summary = 1
      next
    }
    END {
      close_finding()
      for (i = 1; i <= nhdr; i++) if (!(hdr[i] in header)) err(1, "header is missing \"- " hdr[i] ":\"")
      for (i = 1; i <= nsec; i++) if (!(sections[i] in has_section)) err(1, "missing section \"## " sections[i] "\"")
      if (nfind > 0 && !("Remediation log" in has_section)) err(1, "missing section \"## Remediation log\"")
      if (has_summary && !bad_values) {
        split("Critical High Medium Low", lv, " ")
        for (i = 1; i <= 4; i++) for (j = 1; j <= 2; j++) {
          s = (j == 1) ? "Confirmed" : "Suspected"
          want = ((lv[i], s) in count) ? count[lv[i], s] : 0
          got = ((lv[i], s) in summary) ? summary[lv[i], s] : ""
          if (got != "" && got + 0 != want) err(1, "summary says " got " " s " " lv[i] ", findings have " want)
        }
      }
      if (errors) exit 1
      printf "%s: ok (%d findings)\n", file, nfind
    }
  ' "$report"; then
    status=1
  fi
done
exit "$status"
