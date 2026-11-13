# AI Audit Toolkit

A reusable foundation for auditing software projects with Codex and Claude Code. The methodology is framework independent: each audit starts with the project's actual code and configuration, then applies only the relevant profiles.

## Contents

```text
skills/
  audit-security/SKILL.md
  audit-correctness/SKILL.md
  audit-production/SKILL.md
  audit-performance/SKILL.md
  audit-architecture/SKILL.md
  audit-web-quality/SKILL.md
  audit-scalability-cost/SKILL.md
  audit-legal-readiness/SKILL.md
  audit-test-ci/SKILL.md
references/
  audit-rules.md
  finding-format.md
  severity.md
  performance-measurement.md
  architecture-review.md
  web-quality-review.md
  scalability-cost-review.md
  resource-efficiency.md
  legal-review.md
  legal/cz-eu.md
  test-ci-review.md
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

In the project you want to audit, invoke `audit-security`, `audit-correctness`, `audit-production`, `audit-performance`, `audit-architecture`, `audit-web-quality`, `audit-scalability-cost`, `audit-legal-readiness`, or `audit-test-ci`. In Claude Code, use `/audit-security`; in Codex, select the Skill or mention `$audit-security`.

The audit first identifies the actual stack and scope. Optionally copy [`templates/project-context.md`](templates/project-context.md) to `docs/audits/context.md` in the audited project and fill in only facts that cannot be reliably derived from its repository. Check that context against the current code.

Store reports in the audited project under `docs/audits/YYYY-MM-DD/` as `security.md`, `correctness.md`, `production.md`, `performance.md`, `architecture.md`, `web-quality.md`, `scalability-cost.md`, `legal-readiness.md`, or `test-ci.md`. If the target report exists, use the first free `YYYY-MM-DD-2`, `YYYY-MM-DD-3`, etc. directory; never overwrite a previous audit. Check earlier reports in `docs/audits/` and reconcile their findings. The audit may write its report there but must not change application code or project data. Run artifact-producing checks in a disposable copy outside the audited repository. Follow [`templates/report.md`](templates/report.md), including its coverage log, prior finding reconciliation, and `Not verified` table. Record the audited project's Git commit and this toolkit's commit in the report header, and note relevant uncommitted changes. Run `./scripts/validate.sh` to print the toolkit commit and working tree state; if it has no commit yet, write `uncommitted`. Findings must cite concrete evidence and use audit-specific IDs (`SEC-`, `COR-`, `PRD-`, `PERF-`, `ARC-`, `WEB-`, `SCE-`, `LEG-`, `TCI-`). Keep secrets, personal information, and sensitive production data out of reports.

Security reports can reveal exploitable issues. For a public audited repository, keep `docs/audits/` private or ignored, or publish the report only after the relevant fixes are in place. Do not commit an unresolved vulnerability report to a public repository.

## Performance audits

`audit-performance` reviews critical flows for latency, throughput, resource use and operating cost. It uses applicable frontend, backend, database, infrastructure and AI/LLM profiles. It can work from code and existing evidence when measurements are unavailable, with runtime impact explicitly marked unverified.

Follow [`references/performance-measurement.md`](references/performance-measurement.md) for representative workloads, comparable baselines, safe execution and measurement records. The optional section in the report template records benchmark conditions and results. Production load tests and billable external experiments require separate explicit authorization.

## Resource efficiency before launch and in operation

Four existing audits share [`references/resource-efficiency.md`](references/resource-efficiency.md): `audit-scalability-cost` owns resource/quota modeling and action triggers; `audit-performance` traces repeated work and transfer; `audit-production` applies relevant pre-launch checks and monitoring readiness; `audit-correctness` checks cache/change-detection behavior. No new Skill or report filename is required, and running one audit does not require all the others. Shared root causes are cross-referenced using the existing finding IDs.

For metered services, scheduled work or material cache reuse, inventory non-user producers as well as user journeys. Assess no-visitor operation, expected use and cold-cache/invalidation/failure behavior, including shared preview/standby consumers. Model joint activation/idle periods, actual cache scope, query/call and transfer amplification, and the added cost of fingerprints or other optimizations. Preserve freshness, deletions/withdrawals and user isolation. Provider settings, limits and billing semantics are verified per audit rather than embedded as universal constants.

Planning uses explicit proposed workloads. Built pre-launch code can expose a waste mechanism before traffic exists, but live deployment, account headroom and savings remain unverified without evidence. The optional report/context sections capture producers, scenario assumptions, cache/change contracts and monitoring/action triggers. A missing measurement is not a passing check or an automatic release blocker. Reviews use existing evidence or bounded isolated checks; they do not authorize production SQL, extension installation, statistics resets or monitoring changes.

## Architecture audits

`audit-architecture` assesses boundaries, responsibilities, dependencies, data ownership, contracts, change impact and testability against actual project requirements. It starts with the observed architecture and relevant decisions, then traces critical flows. It records accepted tradeoffs and unknown rationale separately from findings.

Follow [`references/architecture-review.md`](references/architecture-review.md) for evidence standards, counter-evidence and proportionate remediation. The optional architecture overview in the report template captures components, relationships and their sources. A monolith, large file or missing architectural pattern is not a defect on its own; release blockers require a concrete impact on the current release.

## Web quality audits

`audit-web-quality` reviews representative pages and states of a running web application using available Lighthouse and browser tools. It covers applicable performance, accessibility, best-practices and technical SEO checks, plus targeted manual checks for keyboard operation, focus, forms and responsive layout. It records authentication, device and run conditions and treats intentional indexing exclusions in context.

Follow [`references/web-quality-review.md`](references/web-quality-review.md) for the Lighthouse workflow, a CLI example, manual checks and interpretation limits. The optional web quality section in the report template records per-page coverage and results. Automated scores do not establish complete accessibility conformance, security, search visibility or real-user performance. Shared performance findings are cross-referenced rather than counted twice.

Run against a local or isolated preview environment. Keep raw browser artifacts outside the audited repository and include redacted evidence in `web-quality.md`. No Lighthouse dependency is installed by the toolkit; missing tooling or inaccessible pages are recorded as `Not verified`.

## Scalability and cost efficiency audits

The skill supports **Planning** from a specification and **Audit** of actual operation. Planning is a lightweight, proportional review for initial workload assumptions, conditional costs, first constraints, a minimal setup and measurable monitoring/action triggers. A bounded static site may need only a short assessment. Expected initial operation and a relevant peak replace mandatory 10x/100x modeling in Planning; sources still need current verification. Include material CI/build/preview costs when relevant. Reports use `scalability-planning.md` or `scalability-cost.md` in the usual dated audit directory and share the `SCE-` ID sequence. Later audits compare forecasts with real usage rather than treating projections as benchmarks.

`audit-scalability-cost` assesses capacity, operating cost, quotas, reliability, permitted use and migration readiness across cloud services and self-hosted resources. In Audit mode it models the current workload and 10x/100x scenarios with explicit assumptions, first limits, cost ranges and confidence. It starts with keeping the current setup and recommends changes only when evidence and project requirements justify them.

Follow [`references/scalability-cost-review.md`](references/scalability-cost-review.md) for dated pricing and terms verification, nonlinear cost modeling, total cost comparisons and measurable action triggers. The optional report section records the resource register, scenarios and prioritized keep/optimize/upgrade/migrate decisions. Actual plans and account limits must be verified where accessible; missing evidence is `Not verified`, not zero cost or a passing check. Provider prices and quotas are not embedded in the reusable toolkit.

The audit reuses performance, architecture, production and security evidence without requiring every other audit to run first. It does not change plans, purchase services, run production load tests or perform migrations. Those actions require separate explicit authorization.

## Legal readiness audits

The skill supports **Planning** from a specification and **Pre-launch** verification of the built product. Ask explicitly for Planning after the first specification, before implementation, to obtain source-backed requirements, product decisions and acceptance checks. Use `legal-planning.md` as the report filename in the usual dated audit directory; Pre-launch retains `legal-readiness.md`. Both modes share the `LEG-` ID sequence so later audits can reconcile planned requirements against actual evidence. Missing future implementation is not a current legal violation.

Use a top-tier reasoning model with high reasoning effort or the closest supported equivalent in both modes. Prioritize source verification and completeness over token cost or speed. The skill announces the known setup and warns when a weaker setup is used; it does not claim to change models automatically. Record unknown settings and review limitations. Revisit the planning review when markets, business model, features, suppliers or data uses materially change.

`audit-legal-readiness` helps small projects identify applicable launch obligations and practical gaps using verified primary sources and actual project evidence. It selects relevant privacy, tracking, marketing, consumer, licensing and supplier checks after establishing operator, audience, markets, business model and review/launch dates. It asks for material missing facts rather than inventing them or applying every checklist item by default.

Follow [`references/legal-review.md`](references/legal-review.md) for source discipline, applicability and verification states. The initial [Czech/EU research profile](references/legal/cz-eu.md) supplies official starting points that must be checked during each audit; it is not a verified current ruleset or a substitute for other countries' applicable rules. Laws, judgments, authority guidance, contracts and licenses are labeled separately, with exact provisions, versions and dates. Unreadable or unverified sources remain explicit gaps.

The optional report section records a primary-source register, applicability/verification matrix and prioritized launch actions or precise interpretation questions. The audit provides no overall legal clearance or guarantee that professional interpretation will never be needed. It does not automatically require lawyer review for routine items, create unnecessary banners or checkboxes, or publish legal documents. Technical and supplier evidence from existing audits is cross-referenced rather than counted twice. Full document drafting and publication are separate tasks.

## Test and CI efficiency audits

`audit-test-ci` reviews test architecture, E2E setup and execution, CI triggers and critical paths, quality gates and runner infrastructure. It seeks faster feedback, lower compute/cost, fewer unreliable failures and less maintenance while preserving meaningful regression coverage and security. Its infrastructure scope is development and CI execution; related performance, production, architecture and scalability findings are cross-referenced.

Follow [`references/test-ci-review.md`](references/test-ci-review.md) for risk-to-test/gate mapping, reproducible measurements, safe execution, smoke/regression assignment and infrastructure comparisons. The optional report section records current architecture, observed run conditions, proposed gates and a prioritized backlog with benefit, risk, effort, validation and rollback. Reports use `test-ci.md` and `TCI-` IDs. Queue time, elapsed execution, runner-minutes, resource usage, billable cost and maintenance are separate dimensions; estimates and unknowns remain explicit. A slower test is not automatically optional, and a green or skipped check is not proof that required tests ran.

The skill can review code and existing evidence without running tests. It does not dispatch cloud runs, weaken gates, install dependencies in the audited repository, provision runners or change workflows. Any useful local experiments stay bounded and isolated outside the repository; cloud reruns and billable experiments need separate authorization. Keeping the current setup is a valid recommendation.

Execution improvements apply to **Standard and Budget-conscious CI** while preserving each strategy's scheduling and required coverage. The audit checks effective worker counts, actual CPU/memory limits, environment inputs, cache lifecycle and duplicated validation. Hosted versus persistent self-hosted cache tradeoffs depend on the execution environment, not the strategy name. Template databases, shared test modules and build-check exemptions are conditional experiments with explicit correctness requirements, not default optimizations. Reports distinguish cold/warm conditions, selected/skipped tests, measurement origin and attribution limits, and revisit earlier recommendations when objectives or evidence change.

The [AI starter pack](https://github.com/Phunkhouse/ai-starter-pack) is optional: its CI strategy, Playwright and self-hosted runner recipes are candidate implementations to assess against the project and the inspected recipe revision. No recipe, framework, scheduling policy or provider is imposed. Use the audit when a real suite/CI setup exists, feedback or compute becomes costly, failures recur or runner changes are being considered; a full review is not required for every project bootstrap. Starter-pack integration can be maintained separately without duplicating this audit method.

After pulling a version that adds a Skill, rerun `./scripts/install.sh` to create its links. Existing Skill links continue pointing to their updated files.

## Current scope

This version covers security, correctness, production readiness, performance, architecture, web quality, scalability and cost efficiency, legal readiness within its stated jurisdiction and topic scope, and test/CI efficiency. Triage can be added after experience with real audits. The toolkit does not fix the application or run intrusive tests.

## Development

After changing a Skill, run `./scripts/validate.sh` to check frontmatter, referenced paths, local Markdown links and installer syntax. It also prints the toolkit commit for report headers. Preview installer actions with `./scripts/install.sh --dry-run` and removal with `./scripts/install.sh --uninstall --dry-run`.
