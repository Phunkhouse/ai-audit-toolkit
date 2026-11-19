#!/usr/bin/env bash
# Rescore saved eval reports after changing score.sh or a fixture's expected.tsv.
# Rewrites the score columns of evals/results/results.tsv in place, keeping a .bak copy.
set -euo pipefail

evals_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
results="$evals_dir/results/results.tsv"
[[ -f "$results" ]] || { printf 'No results at %s\n' "$results" >&2; exit 2; }

cp "$results" "$results.bak"
tmp="$(mktemp)"
{
  IFS= read -r header
  case "$header" in *$'\tunderrated') ;; *$'\tother') header="$header"$'\tunderrated' ;; *) header="$header"$'\tother\tunderrated' ;; esac
  printf '%s\n' "$header"
  while IFS=$'\t' read -r time toolkit state fixture audit model run found defects decoys unplanted findings format preserved report other underrated; do
    if [[ -n "$report" && -f "$evals_dir/$report" ]]; then
      score="${report%.md}.score.txt"
      "$evals_dir/score.sh" "$evals_dir/fixtures/$fixture/expected.tsv" "$audit" "$evals_dir/$report" > "$evals_dir/$score"
      IFS=$'\t' read -r _ found defects decoys unplanted findings other underrated < <(grep '^RESULT' "$evals_dir/$score")
    fi
    printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$time" "$toolkit" "$state" "$fixture" "$audit" "$model" "$run" \
      "$found" "$defects" "$decoys" "$unplanted" "$findings" "$format" "$preserved" "$report" "${other:-}" "${underrated:-}"
  done
} < "$results" > "$tmp"
mv "$tmp" "$results"
printf 'Rescored %s (previous version in %s.bak)\n' "$results" "$results"
