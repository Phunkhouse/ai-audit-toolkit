#!/usr/bin/env bash
# Run an audit Skill headlessly against a fixture repository and score the report.
set -euo pipefail

evals_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
repo_dir="$(cd -- "$evals_dir/.." && pwd -P)"
skills_dir="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
fixture='invoice-app'
audit=''
runs=1
model=''
keep=0

usage() {
  cat <<'USAGE'
Usage: evals/run.sh --audit NAME [--fixture NAME] [--runs N] [--model MODEL] [--keep]

Copies evals/fixtures/<fixture>/repo into a fresh temporary Git repository,
runs the audit-<NAME> Skill there with `claude -p`, then checks the report
format, scores it against evals/fixtures/<fixture>/expected.tsv and appends a
row to evals/results/results.tsv. Each run costs a full audit's model usage.

  --audit NAME    Audit to run, e.g. security or correctness (required).
  --fixture NAME  Fixture directory under evals/fixtures (default invoice-app).
  --runs N        Number of independent runs (default 1). Audits vary between
                  runs; compare several runs before and after a change.
  --model MODEL   Passed to claude --model.
  --keep          Keep the temporary repositories for inspection.

Environment:
  EVAL_AGENT_CMD  Replace the default agent command. It runs with sh -c inside
                  the fixture repository, with the prompt in $EVAL_PROMPT, for
                  example: EVAL_AGENT_CMD='codex exec "$EVAL_PROMPT"'.
  CLAUDE_SKILLS_DIR  Where the Skills are installed (default ~/.claude/skills).
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --audit) audit="${2:?}"; shift 2 ;;
    --fixture) fixture="${2:?}"; shift 2 ;;
    --runs) runs="${2:?}"; shift 2 ;;
    --model) model="${2:?}"; shift 2 ;;
    --keep) keep=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$1" >&2; usage >&2; exit 2 ;;
  esac
done

[[ -n "$audit" ]] || { usage >&2; exit 2; }
[[ "$runs" =~ ^[1-9][0-9]*$ ]] || { printf -- '--runs must be a positive integer\n' >&2; exit 2; }
fixture_dir="$evals_dir/fixtures/$fixture"
expected="$fixture_dir/expected.tsv"
[[ -d "$fixture_dir/repo" && -f "$expected" ]] || { printf 'Unknown fixture: %s\n' "$fixture" >&2; exit 2; }
if ! cut -f2 "$expected" | tail -n +2 | tr ',' '\n' | grep -qx "$audit"; then
  printf 'Fixture %s has no expected items for audit %s\n' "$fixture" "$audit" >&2
  exit 2
fi

skill="audit-$audit"
if [[ -z "${EVAL_AGENT_CMD:-}" ]]; then
  command -v claude >/dev/null || { printf 'claude CLI not found; set EVAL_AGENT_CMD\n' >&2; exit 2; }
  link="$skills_dir/$skill"
  if [[ ! -L "$link" || "$(readlink "$link")" != "$repo_dir/skills/$skill" ]]; then
    printf '%s does not link to this checkout; run ./scripts/install.sh first\n' "$link" >&2
    exit 2
  fi
fi

toolkit_commit="$(git -C "$repo_dir" rev-parse --short HEAD 2>/dev/null || echo uncommitted)"
toolkit_state=clean
[[ -z "$(git -C "$repo_dir" status --porcelain -- skills references templates profiles 2>/dev/null)" ]] || toolkit_state=modified
results_dir="$evals_dir/results"
mkdir -p "$results_dir"
results="$results_dir/results.tsv"
[[ -f "$results" ]] || printf 'time\ttoolkit\tstate\tfixture\taudit\tmodel\trun\tfound\tdefects\tdecoys\tunplanted\tfindings\tformat\tpreserved\treport\n' > "$results"

prompt="Run the $skill Skill on the repository in the current directory and write its report as the Skill instructs. This is an unattended evaluation run: do not ask questions. Where a fact is missing, make a reasonable assumption and record it in the report."
# One comma-separated argument, so patterns containing spaces stay whole.
allowed='Read,Grep,Glob,Write,Edit,Bash(git:*),Bash(ls:*),Bash(cat:*),Bash(find:*),Bash(wc:*),Bash(mktemp:*),Bash(tar:*),Bash(readlink:*),Bash(pwd),Bash(date:*),Bash(node:*),Bash(npm test:*),Bash(npm run test:*),Bash('"$repo_dir"'/scripts/validate.sh),Bash('"$repo_dir"'/scripts/check-report.sh:*)'

for ((run = 1; run <= runs; run++)); do
  stamp="$(date +%Y%m%dT%H%M%S)"
  work="$(mktemp -d)"
  target="$work/repo"
  cp -R "$fixture_dir/repo" "$target"
  (
    cd "$target"
    git init -q
    git add -A
    GIT_AUTHOR_DATE='2026-10-01T12:00:00Z' GIT_COMMITTER_DATE='2026-10-01T12:00:00Z' \
      git -c user.name='Fixture' -c user.email='fixture@example.invalid' commit -qm 'Fixture snapshot'
  )
  printf '[%s] run %d/%d: %s on %s in %s\n' "$stamp" "$run" "$runs" "$skill" "$fixture" "$target"

  log="$results_dir/$stamp-$audit-$run.log"
  agent_status=0
  if [[ -n "${EVAL_AGENT_CMD:-}" ]]; then
    (cd "$target" && EVAL_PROMPT="$prompt" sh -c "$EVAL_AGENT_CMD") >"$log" 2>&1 || agent_status=$?
  else
    args=(-p "$prompt" --permission-mode acceptEdits --add-dir "$repo_dir" --allowedTools "$allowed")
    [[ -n "$model" ]] && args+=(--model "$model")
    (cd "$target" && claude "${args[@]}" </dev/null) >"$log" 2>&1 || agent_status=$?
  fi
  [[ "$agent_status" -eq 0 ]] || printf '  agent exited with %d; see %s\n' "$agent_status" "$log"

  report="$(find "$target/docs/audits" -name "$audit.md" -type f 2>/dev/null | sort | tail -n 1 || true)"
  if [[ -z "$report" ]]; then
    outcome='no report'
    [[ "$agent_status" -eq 0 ]] || outcome="agent failed ($agent_status)"
    printf '  %s; see %s\n' "$outcome" "$log"
    grep -m1 -iE 'authenticate|login|error' "$log" | sed 's/^/  /' || true
    printf '%s\t%s\t%s\t%s\t%s\t%s\t%d\t\t\t\t\t\t%s\t\t\n' "$stamp" "$toolkit_commit" "$toolkit_state" "$fixture" "$audit" "${model:-default}" "$run" "$outcome" >> "$results"
    [[ "$keep" -eq 1 ]] || rm -rf "$work"
    continue
  fi
  saved="$results_dir/$stamp-$audit-$run.md"
  cp "$report" "$saved"

  format=ok
  "$repo_dir/scripts/check-report.sh" "$report" > "$results_dir/$stamp-$audit-$run.format.txt" 2>&1 || format="$(grep -c . "$results_dir/$stamp-$audit-$run.format.txt") errors"

  preserved=yes
  if [[ -n "$(git -C "$target" status --porcelain --untracked-files=all | grep -v ' docs/audits/' || true)" ]]; then
    preserved=no
  fi

  "$evals_dir/score.sh" "$expected" "$audit" "$report" | tee "$results_dir/$stamp-$audit-$run.score.txt" | sed 's/^/  /' | grep -v RESULT || true
  IFS=$'\t' read -r _ found defects decoys unplanted findings other < <(grep '^RESULT' "$results_dir/$stamp-$audit-$run.score.txt")
  printf '  defects %s/%s, decoys flagged %s, unplanted %s, other-audit %s, format %s, repository preserved %s\n' "$found" "$defects" "$decoys" "$unplanted" "$other" "$format" "$preserved"
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%d\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$stamp" "$toolkit_commit" "$toolkit_state" "$fixture" "$audit" "${model:-default}" "$run" \
    "$found" "$defects" "$decoys" "$unplanted" "$findings" "$format" "$preserved" "${saved#$evals_dir/}" >> "$results"

  [[ "$keep" -eq 1 ]] || rm -rf "$work"
done

printf 'Results appended to %s\n' "$results"
