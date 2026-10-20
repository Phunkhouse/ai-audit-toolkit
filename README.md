# AI Audit Toolkit

A reusable foundation for auditing software projects with Codex and Claude Code. The methodology is framework independent: each audit starts with the project's actual code and configuration, then applies only the relevant profiles.

## Contents

```text
skills/
  audit-security/SKILL.md
  audit-correctness/SKILL.md
  audit-production/SKILL.md
references/
  audit-rules.md
  finding-format.md
  severity.md
profiles/
  frontend.md
  backend.md
  database.md
  infrastructure.md
templates/
  project-context.md
scripts/
  install.sh
```

Each Skill contains its own essential workflow and rules. The files in `references/` standardize severity and report structure; `profiles/` add questions based on the detected stack. The template in `templates/` belongs in the audited project once completed.

## Installation

Run this from the toolkit root:

```bash
./scripts/install.sh
```

The script links all toolkit Skills into `~/.agents/skills` (Codex) and `~/.claude/skills` (Claude Code). It leaves existing unrelated paths untouched. Options: `--codex-only`, `--claude-only`, `--dry-run`, `--help`. Set `CODEX_SKILLS_DIR` or `CLAUDE_SKILLS_DIR` to override the destinations. To remove the links, delete the corresponding `audit-*` entries from the destination directories; the source files will remain intact.

The links point to this local clone. On another device, clone the repository again and run the installer there. Fetch changes with `git pull`; links do not synchronize files. If new Skills do not appear in an existing session, refresh the Skill list or start a new session.

## Usage

In the project you want to audit, invoke `audit-security`, `audit-correctness`, or `audit-production`. In Claude Code, use `/audit-security`; in Codex, select the Skill or mention `$audit-security`.

The audit first identifies the actual stack and scope. Optionally copy [`templates/project-context.md`](templates/project-context.md) to `docs/audits/context.md` in the audited project and fill in only facts that cannot be reliably derived from its repository. Check that context against the current code.

Store reports in the audited project, for example at `docs/audits/2026-10-pre-release/security.md`. Record the audited project's Git commit and this toolkit's commit in the report header (`git -C /path/to/ai-audit-toolkit rev-parse HEAD`). If the toolkit has no commit yet, write `uncommitted`. Findings must cite concrete evidence; mark inaccessible areas `Not verified`, never `Passed`. Keep secrets, personal information, and sensitive production data out of reports.

## Initial scope

This version covers security, correctness, and production readiness. Architecture, performance, and triage can be added after experience with real audits. The toolkit does not fix the application or run intrusive tests.

## Development

After changing a Skill, validate its YAML frontmatter and referenced files. If you have `skill-creator` and Python with PyYAML, you can run its `quick_validate.py` for each Skill directory. Preview installer actions with `./scripts/install.sh --dry-run`.
