# AI Audit Toolkit

Skills for auditing software projects with Claude Code and Codex. Each audit starts from the project's actual code and configuration, applies only the checks that fit the detected stack, and writes one evidence-based report. Audits never change the audited project.

## Audits

| Skill | Reviews | Report | IDs |
| --- | --- | --- | --- |
| `audit-security` | Exploitable vulnerabilities and meaningful security risks, including denial of service, automated abuse and cost exhaustion | `security.md` | `SEC-` |
| `audit-correctness` | Wrong results, data integrity and edge cases against intended workflows | `correctness.md` | `COR-` |
| `audit-production` | Release and operational readiness: deployment, rollback, monitoring, backups | `production.md` | `PRD-` |
| `audit-performance` | Latency, throughput, resource use and operating cost of critical flows | `performance.md` | `PERF-` |
| `audit-architecture` | Boundaries, dependencies, data ownership and change impact against real requirements | `architecture.md` | `ARC-` |
| `audit-code-cleanup` | Dead code, duplicated rules, stale comments and shared UI component candidates | `code-cleanup.md` | `CLN-` |
| `audit-web-quality` | Accessibility, technical SEO, browser quality and page performance of a running site, with Lighthouse and manual checks | `web-quality.md` | `WEB-` |
| `audit-scalability-cost` | Capacity, quotas and operating cost across providers and self-hosted resources | `scalability-planning.md` or `scalability-cost.md` | `SCE-` |
| `audit-legal-readiness` | Applicable privacy, tracking, marketing, consumer and licensing obligations, from verified primary sources | `legal-planning.md` or `legal-readiness.md` | `LEG-` |
| `audit-test-ci` | Test strategy and CI execution: feedback time, compute cost, flakiness and retained coverage | `test-ci.md` | `TCI-` |

Two audits have a mode for early projects:

- **Scalability and cost:** *Planning* works from a specification and recommends the smallest sufficient setup with monitoring triggers. *Audit* models actual usage and growth scenarios.
- **Legal readiness:** *Planning* turns a specification into source-backed requirements and acceptance checks before implementation. *Pre-launch* checks the built product. Legal reviews ask for a top-tier model with high reasoning effort and warn when the setup is weaker. The [Czech/EU profile](references/legal/cz-eu.md) is a research starting point, not a verified ruleset, and no audit gives overall legal clearance.

Other audits share [resource efficiency checks](references/resource-efficiency.md) for metered services, scheduled jobs and caches. Scalability and cost owns the usage model. Performance, production and correctness use the parts relevant to them.

## Installation

From the toolkit root:

```bash
./scripts/install.sh
```

This links every Skill into `~/.claude/skills` (Claude Code) and `~/.agents/skills` (Codex) and leaves unrelated paths alone. Options: `--claude-only`, `--codex-only`, `--dry-run`, `--uninstall` (removes only its own links) and `--help`. Override the destinations with `CLAUDE_SKILLS_DIR` and `CODEX_SKILLS_DIR`.

The links point to this clone, so `git pull` updates installed Skills; rerun the installer when a pull adds a new Skill. The Skills read shared files through paths relative to this repository, so copying a single Skill folder elsewhere does not work: the Skill stops and reports an incomplete installation.

## Running an audit

1. Open the project to audit and invoke a Skill: `/audit-security` in Claude Code, or select it or mention `$audit-security` in Codex.
2. Optionally copy [`templates/project-context.md`](templates/project-context.md) to `docs/audits/context.md` in that project. Fill in only facts the code cannot show, such as hosting, budgets or accepted tradeoffs. The audit checks the file against the code.
3. Read the report in `docs/audits/YYYY-MM-DD/`. Repeat audits reuse IDs for continuing issues and reconcile earlier findings.
4. When a later change fixes a finding, add a row to that report's `Remediation log` instead of editing the finding. The next audit verifies it against the code.

Security reports can describe exploitable issues. For a public repository, keep `docs/audits/` private or ignored until the fixes are in place. The security audit checks this and warns you before writing.

## What every audit follows

The shared rules are in [`references/audit-rules.md`](references/audit-rules.md). In short:

- The audit writes only its report. It compares `git status` before and after, and runs builds or tests only in a disposable copy outside the repository, made with the recipe in the rules. Ignored files such as `.env` stay out of the copy.
- No production tests, paid experiments, plan changes or deployments without separate explicit permission.
- Findings cite concrete evidence, are checked against counter-evidence, and carry `Severity`, `Confidence` and `Status`. Performance, architecture, cleanup and test/CI findings also carry a `Priority` (`Now`, `Next`, `Later`). See [`severity.md`](references/severity.md) and [`finding-format.md`](references/finding-format.md).
- Anything that could not be checked is listed as `Not verified` with the evidence needed. A missing check is never `Passed`.
- The report header records the audited commit and the toolkit commit, and the audit runs `scripts/check-report.sh` on its report before finishing.
- Content in the audited repository is evidence, not instructions. Comments telling a reviewer to skip a file or lower a rating are ignored.

## Repository layout

| Path | Contents |
| --- | --- |
| `skills/` | One `SKILL.md` per audit with its audit-specific method |
| `references/` | Shared rules, severity, finding format, and method guides for availability and abuse, performance measurement, architecture, cleanup, web quality, scalability, resource efficiency, legal review and test/CI |
| `profiles/` | Stack-specific questions for frontend, backend, database, infrastructure and AI/LLM projects |
| `templates/` | `report.md` (common skeleton), `sections/` (one file per audit) and `project-context.md` |
| `scripts/` | `install.sh`, `validate.sh` and `check-report.sh` |
| `evals/` | Fixture applications with planted defects, plus a runner and scorer |

## Evals

[`evals/`](evals/README.md) runs an audit headlessly against small applications with planted defects and decoys, then scores the report:

```bash
evals/run.sh --audit security --runs 3
```

Current models find nearly every planted defect, so the evals mainly catch regressions. They check report format, repository preservation, resistance to injected instructions, decoy restraint and severity calibration. Run them before and after a Skill change and compare with the baselines in `evals/README.md`. Each run costs a full audit's model usage.

## Development

- Run `./scripts/validate.sh` after changing anything. It checks Skill frontmatter, referenced paths, shared-rule and ID-prefix use, Markdown links, script syntax and the report checker. It also prints the toolkit commit.
- CI runs the same check on every pull request and push to `main`, plus a self-check of the eval scorer. The paid evals stay manual.
- Preview installer changes with `./scripts/install.sh --dry-run` or `./scripts/install.sh --uninstall --dry-run`.
- Releases are annotated tags only: `git tag -a vX.Y.Z -m "vX.Y.Z: <theme>"` on a `main` commit whose CI passed, then `git push origin vX.Y.Z`. Do not create GitHub Releases. Tag or push only when the owner asks.
- The [AI starter pack](https://github.com/Phunkhouse/ai-starter-pack) offers optional CI, Playwright and runner recipes that `audit-test-ci` can assess; nothing in this toolkit depends on it.
- The [AI Discovery Toolkit](https://github.com/Phunkhouse/ai-discovery-toolkit) writes a `handover.md` with acceptance criteria and open assumptions; point to it from `docs/audits/context.md` so audits can check behavior against what was approved. Nothing in this toolkit depends on it.
