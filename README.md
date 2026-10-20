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
  ai-llm.md
templates/
  project-context.md
  report.md
scripts/
  install.sh
  validate.sh
```

Each Skill contains its own essential workflow and rules. The files in `references/` standardize severity and report structure; `profiles/` add questions based on the detected stack. The AI/LLM profile applies only to projects that use models. Templates guide project context and the finished audit report.

## Installation

Run this from the toolkit root:

```bash
./scripts/install.sh
```

The script links all toolkit Skills into `~/.agents/skills` (Codex) and `~/.claude/skills` (Claude Code). It leaves existing unrelated paths untouched. Options: `--codex-only`, `--claude-only`, `--dry-run`, `--uninstall`, `--help`. Set `CODEX_SKILLS_DIR` or `CLAUDE_SKILLS_DIR` to override the destinations. `./scripts/install.sh --uninstall` removes only links created by this installer that still point to this repository.

The links point to this local clone. On another device, clone the repository again and run the installer there. Fetch changes with `git pull`; links do not synchronize files. If new Skills do not appear in an existing session, refresh the Skill list or start a new session. Shared references use paths relative to the toolkit layout; symlink installation preserves them, but copying an individual Skill folder does not. The Skills retain essential instructions if shared files are unavailable.

## Usage

In the project you want to audit, invoke `audit-security`, `audit-correctness`, or `audit-production`. In Claude Code, use `/audit-security`; in Codex, select the Skill or mention `$audit-security`.

The audit first identifies the actual stack and scope. Optionally copy [`templates/project-context.md`](templates/project-context.md) to `docs/audits/context.md` in the audited project and fill in only facts that cannot be reliably derived from its repository. Check that context against the current code.

Store reports in the audited project under `docs/audits/YYYY-MM-DD/` as `security.md`, `correctness.md`, or `production.md`. Use a distinct run directory if a report already exists; never overwrite a previous audit. The audit may write its report there but must not change application code or project data. Follow [`templates/report.md`](templates/report.md), including its coverage log, prior finding reconciliation, and `Not verified` table. Record the audited project's Git commit and this toolkit's commit in the report header, and note relevant uncommitted changes. Run `./scripts/validate.sh` to print the toolkit commit and working tree state; if it has no commit yet, write `uncommitted`. Findings must cite concrete evidence and use audit-specific IDs (`SEC-`, `COR-`, `PRD-`). Keep secrets, personal information, and sensitive production data out of reports.

## Initial scope

This version covers security, correctness, and production readiness. Architecture, performance, and triage can be added after experience with real audits. The toolkit does not fix the application or run intrusive tests.

## Development

After changing a Skill, run `./scripts/validate.sh` to check frontmatter, referenced paths and installer syntax. It also prints the toolkit commit for report headers. Preview installer actions with `./scripts/install.sh --dry-run` and removal with `./scripts/install.sh --uninstall --dry-run`.
