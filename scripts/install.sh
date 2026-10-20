#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
repo_dir="$(cd -- "$script_dir/.." && pwd -P)"
codex_dir="${CODEX_SKILLS_DIR:-$HOME/.agents/skills}"
claude_dir="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
install_codex=1
install_claude=1
dry_run=0
uninstall=0

usage() {
  cat <<'USAGE'
Usage: ./scripts/install.sh [--codex-only | --claude-only] [--dry-run] [--uninstall]

Links this repository's audit skills into personal Codex and Claude Code skill directories.
Override destinations with CODEX_SKILLS_DIR and CLAUDE_SKILLS_DIR.
Existing non-matching paths are left untouched.
--uninstall removes only links created by this installer that still point to this repository.
USAGE
}

for arg in "$@"; do
  case "$arg" in
    --codex-only) install_claude=0 ;;
    --claude-only) install_codex=0 ;;
    --dry-run) dry_run=1 ;;
    --uninstall) uninstall=1 ;;
    --help|-h) usage; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$arg" >&2; usage >&2; exit 2 ;;
  esac
done

if [[ "$install_codex" -eq 0 && "$install_claude" -eq 0 ]]; then
  printf 'Choose only one of --codex-only and --claude-only.\n' >&2
  exit 2
fi

install_into() {
  local dest_dir="$1"
  local label="$2"
  local source dest skill_name

  if [[ "$dry_run" -eq 0 && "$uninstall" -eq 0 ]]; then
    mkdir -p -- "$dest_dir"
  fi

  for source in "$repo_dir"/skills/*; do
    [[ -d "$source" && -f "$source/SKILL.md" ]] || continue
    skill_name="${source##*/}"
    dest="$dest_dir/$skill_name"

    if [[ "$uninstall" -eq 1 ]]; then
      if [[ -L "$dest" && "$(readlink "$dest")" == "$source" ]]; then
        if [[ "$dry_run" -eq 1 ]]; then
          printf '%s: would remove %s\n' "$label" "$dest"
        else
          rm -- "$dest"
          printf '%s: removed %s\n' "$label" "$dest"
        fi
      elif [[ -e "$dest" || -L "$dest" ]]; then
        printf '%s: kept unrelated path %s\n' "$label" "$dest"
      fi
    elif [[ -L "$dest" && "$(readlink "$dest")" == "$source" ]]; then
      printf '%s: already linked %s\n' "$label" "$dest"
    elif [[ -e "$dest" || -L "$dest" ]]; then
      printf '%s: skipped existing path %s\n' "$label" "$dest" >&2
    elif [[ "$dry_run" -eq 1 ]]; then
      printf '%s: would link %s -> %s\n' "$label" "$dest" "$source"
    else
      ln -s -- "$source" "$dest"
      printf '%s: linked %s -> %s\n' "$label" "$dest" "$source"
    fi
  done
}

if [[ "$install_codex" -eq 1 ]]; then install_into "$codex_dir" 'Codex'; fi
if [[ "$install_claude" -eq 1 ]]; then install_into "$claude_dir" 'Claude Code'; fi
