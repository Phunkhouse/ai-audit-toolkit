#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
repo_dir="$(cd -- "$script_dir/.." && pwd -P)"
count=0

for skill_dir in "$repo_dir"/skills/*; do
  [[ -d "$skill_dir" ]] || continue
  skill="$skill_dir/SKILL.md"
  name="${skill_dir##*/}"

  if [[ ! -f "$skill" || "$(head -n 1 "$skill")" != '---' ]]; then
    printf 'Invalid or missing frontmatter: %s\n' "$skill" >&2
    exit 1
  fi

  frontmatter_end="$(awk 'NR > 1 && $0 == "---" { print NR; exit }' "$skill")"
  if [[ -z "$frontmatter_end" ]]; then
    printf 'Unclosed frontmatter: %s\n' "$skill" >&2
    exit 1
  fi

  frontmatter="$(sed -n "2,$((frontmatter_end - 1))p" "$skill")"
  if ! printf '%s\n' "$frontmatter" | grep -qFx "name: $name"; then
    printf 'Skill name must match directory: %s\n' "$skill" >&2
    exit 1
  fi
  if ! printf '%s\n' "$frontmatter" | grep -qE '^description: .+'; then
    printf 'Missing description: %s\n' "$skill" >&2
    exit 1
  fi

  while IFS= read -r reference; do
    [[ -n "$reference" ]] || continue
    if [[ ! -e "$skill_dir/$reference" ]]; then
      printf 'Missing reference %s in %s\n' "$reference" "$skill" >&2
      exit 1
    fi
  done < <(grep -oE '\.\./\.\./(references|profiles|templates)/[A-Za-z0-9._/-]+' "$skill" | sort -u || true)

  printf 'Valid: %s\n' "$name"
  count=$((count + 1))
done

if [[ "$count" -eq 0 ]]; then
  printf 'No Skills found.\n' >&2
  exit 1
fi

bash -n "$script_dir/install.sh"
printf 'Validated %s Skills and installer syntax.\n' "$count"
if git -C "$repo_dir" rev-parse --verify HEAD >/dev/null 2>&1; then
  printf 'Toolkit commit: %s\n' "$(git -C "$repo_dir" rev-parse HEAD)"
  if [[ -n "$(git -C "$repo_dir" status --porcelain --untracked-files=normal)" ]]; then
    printf 'Toolkit working tree: modified\n'
  else
    printf 'Toolkit working tree: clean\n'
  fi
else
  printf 'Toolkit commit: uncommitted\n'
fi
