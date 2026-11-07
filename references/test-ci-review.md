# Test and CI efficiency review

Use this method for test architecture and development/CI execution across stacks and providers. Review applicable mechanisms rather than prescribing a test pyramid, framework, runner or paid service. The target is meaningful production confidence with less waiting, compute and maintenance. Keeping the setup is a valid outcome.

## Establish coverage and release boundaries

- Read specifications and decisions, then inspect real commands and representative assertions. Inventory unit, component, integration, API, contract, E2E, smoke, static and other relevant checks, including scripts called indirectly by workflows.
- Map authentication/authorization, data integrity, business rules, external integrations and critical journeys to tests and merge/deployment gates. Include important failure paths. Identify unsupported risks from implementation evidence, not from a missing directory or low test count alone.
- Distinguish mocks from exercised boundaries. Business logic may be cheaper to test below the browser, but browser wiring, server enforcement, real database transactions and concurrency need appropriate integration evidence. Show what coverage remains before proposing removal or relocation. Similar scenarios across layers can intentionally protect different failure modes.
- Record inspected and sampled packages, suites and test cases in large repositories. A passing sample does not establish full-suite health. Check transitive dependencies, shared configuration, lockfiles, generated clients, schema changes and unknown ownership before declaring a package unaffected; uncertain change selection needs a conservative full-suite fallback.
- Preserve adopted project policy and mandatory security, migration and deployment gates. A proposed policy change needs explicit rationale and separate review, not an automatic audit fix.

## Diagnose E2E and flaky failures

Break cost into browser launch, application build/startup, database/schema setup, fixtures/seeding, authentication, navigation, external network, assertions, teardown and artifacts. Inspect repeated builds hidden in wrappers or global setup. Reusing a production build can help only when the artifact matches the tested revision, environment and configuration.

Evaluate workers, sharding and browser/device matrices against resources and required support. More parallelism can duplicate setup, increase compute, create database/port conflicts or cause memory pressure. Use isolated data per worker; reusable authentication must not share mutable accounts or leak credential-bearing state. Reuse must preserve tests for the login/session behavior itself.

Inspect fixed waits, timeout reasons, retry policy, order dependence, shared state, clock/randomness, external services and leaked processes. A failure that passes on retry is a signal to investigate, not proof of a test-only flake; it may reveal a product race or intermittent dependency failure. Separate first-attempt failures, retry recoveries, persistent failures and confirmed causes. Quarantine requires an owner, alternative risk coverage and an expiry/revisit condition; it must not silently weaken a mandatory gate.

Compare traces, screenshots, videos and retention against actual debugging needs and storage/transfer cost. Preserve enough failure evidence to diagnose issues. Browser caching, containers and preinstalled libraries are candidates to measure, not universal optimizations; installed tool/browser/image compatibility and fonts matter.

## Map execution and required outcomes

Trace workflow events, job dependencies, matrices, reusable workflows, scripts, services, setup, builds, tests and final results. Where evidence permits, diagram current execution and a separately labeled proposal in Mermaid, showing gates and important trust boundaries. Do not present inferred runner topology or proposed savings as observed.

- Separate duplicate validation from post-merge, release, security or deployment work with a distinct purpose. Cancel obsolete replaceable validation only within the intended PR/workflow scope; do not cancel unrelated PRs or partially completed deployments/migrations.
- Review dependency caches, lockfile-based installation, cache hit/miss and restore cost, artifact reuse and incremental results. Cache keys and access boundaries must prevent stale or untrusted output from becoming trusted validation. Preserve artifact provenance and compatibility with the tested revision; never cache secrets or authentication state in shared caches.
- Inspect actual branch protection/rulesets and observed run results when accessible. YAML alone cannot establish enforced protection, actual runner selection or account eligibility. Record those limits rather than assuming enforcement.
- For GitHub, check the revision actually tested, skipped mandatory workers, failure/cancellation propagation and final `needs` results. A conditional job can report success without tests; a path-filtered workflow can leave required checks pending. A summary job must attest to every mandatory suite rather than turn skipped or failed workers green. Inspect draft/readiness transitions and subsequent commits; an old or draft-event rerun does not establish ready-state testing of a new revision.
- For merge queues, inspect every required workflow's merge-group trigger and tested commit. Check required outcome names/source and transition risks before proposing renaming, filtering or combining jobs. Use the equivalent guarantees on other providers.

## Choose smoke and regression gates

Assign by risk, not duration alone. For each suite, record protected behavior, relevant change triggers, required execution boundary, expected detection delay and how a failure prevents release. A small deterministic smoke suite can protect frequent critical journeys; full regression retains broader failure cases, integrations and supported environments.

Moving checks to pre-deployment or periodic execution is justified only if the release process and accepted detection window still protect the relevant risk. With automatic deployment after merge, nightly regression cannot by itself prevent a faulty release. Preserve the adopted pre-merge suite until a separately approved replacement demonstrates equivalent protection. Do not invent a universal PR duration budget or acceptable detection window; request missing requirements.

## Compare execution infrastructure

Start with the current provider and runner. Compare a combined job against separate jobs, host versus container, and sharding only where setup/critical-path evidence suggests a benefit. Include cold image pulls, dependency restore, resource saturation, queueing and service startup. A combined job may reduce repeated installation but delay independent feedback; sharding may reduce elapsed time while increasing runner-minutes.

For self-hosted, cloud VM, ARM, home hardware or hybrid options, assess compatible dependencies/actions/images, memory, concurrency, network, cache persistence, availability, updates, disk cleanup, recovery, operator time and total cost. On shared hosts, separate repository registrations and folders do not isolate code or coordinate global capacity. Check cross-repository CPU/memory pressure, fixed database/web ports, process cleanup and host-wide maintenance. Per-PR cancellation is not a host-wide concurrency limit.

Do not recommend persistent self-hosted execution of untrusted PR code. Inspect contributor/dependency trust, credentials, network access and privileged Docker/host capabilities; private visibility is insufficient. A container on a privileged shared host is not evidence of isolation. Recommend no migration unless its overall benefit survives security and operating costs. Verify a fallback's actual routing and invocation: a configured runner label or hosted alternative does not prove automatic recovery when a runner goes offline. Do not reconfigure or trigger it during the audit.

## Establish a reproducible baseline

Prefer available read-only run/job/step logs, test reports, billing and monitoring. Record source URLs or artifacts and access limitations. Keep evidence outside the audited repository except redacted excerpts in the report. Local checks use a disposable copy with isolated services and bounded resources; do not repeatedly rerun failures, dispatch cloud work or consume paid resources without explicit authorization.

For each sample record timestamp/window, event, revision (including synthetic merge/merge-group where relevant), commands, installed versions, runner/OS/architecture/resources, data, worker count, cache state, sample count and errors. Select representative cold/warm, successful and failed/retried runs; explain exclusions and bias. Use multiple comparable runs when available, reporting variability and sample size rather than a precise percentile from too little data. Local timing is not cloud timing.

| Dimension | Measure and interpretation |
| --- | --- |
| Feedback | Queue wait, first useful failure/result and time until required validation completes; define the start/end boundary. |
| Execution | Full elapsed run and dependency critical path, including setup/services/reporting. Do not sum overlapping jobs as wall-clock time. |
| Compute | Sum actual job execution durations across jobs and attempts as runner-minutes; CPU and memory require separate telemetry. Canceled work still consumed resources. |
| Reliability | First-attempt failures, retry recoveries, persistent failures and causes over a stated denominator/window; do not equate retry recovery with a confirmed flaky test. |
| Cost | Actual provider billing units/rates/rounding, allowances/shared scope, storage/retention, transfers, external services and self-host maintenance over a common horizon. Runner-minutes are not automatically billed minutes or CPU-minutes. |
| Maintenance | Supported evidence such as repeated fixture fixes, debugging effort or manual runner recovery; label unmeasured effort and estimates. |

Where useful, estimate period compute as `sum(job execution minutes across all runs and attempts in the period)`. Forecasts need explicit run frequency, retry/cancellation assumptions and setup duplication; avoid double counting observed runs and separately modeled retries. Convert to money only using dated official rates, eligibility and billing rules plus available account evidence. Within-allowance compute reductions may save capacity without reducing the current bill. Public documentation does not verify an account's plan or spend controls.

When evidence is missing, provide a bounded measurement plan: exact existing command or read-only data source, representative scenario/sample conditions, metrics, acceptance criterion tied to a requirement, run/resource budget and stop condition. Keep proposed experiments distinct from completed checks. Do not invent baseline durations, savings, targets or guarantees.

## Prioritize and hand off

Label evidence as measured, code-proven, estimated with assumptions or a hypothesis; a proven duplicate build does not establish its time or monetary impact. Actively seek counter-evidence before accepting a finding. Cross-reference shared root causes from other audits.

Group recommendations into quick wins, test/CI architecture and infrastructure; list considered options not recommended or deferred with reasons, including keeping the setup. Separate optimization priority from severity and release-blocking impact. Speed alone is not a release blocker. Each active finding supplies observation/location, evidence and counter-evidence, proposed change, benefit dimensions (feedback, compute/cost, reliability, maintenance), confidence, risk to coverage/security, effort, validation and rollback. Backlog rows reference findings rather than duplicating their full evidence.

Validation must demonstrate both the intended efficiency gain under comparable conditions and retained meaningful coverage/gates. For a workflow proposal, name relevant acceptance scenarios: current-revision ready runs, mandatory failure/skip/cancel, cold cache, docs-only selection, merge queue, shared-host overlap or fallback as applicable. Describe safe rollback without running it; coordinate required-check changes so rollback does not silently remove protection. Present recommendations for review before a separate implementation plan.

## Optional AI starter pack coordination

The [AI starter pack](https://github.com/Phunkhouse/ai-starter-pack) can supply implementation candidates when available. Inspect the actual recipe revision and target project before recommending [CI strategy](https://github.com/Phunkhouse/ai-starter-pack/blob/main/recipes/ci-strategy/README.md), [Playwright E2E](https://github.com/Phunkhouse/ai-starter-pack/blob/main/recipes/playwright-e2e/README.md) or [self-hosted runner](https://github.com/Phunkhouse/ai-starter-pack/blob/main/recipes/self-hosted-runner/README.md). Record that revision and applicability; these references do not impose Standard/Budget-conscious scheduling, Next.js, Playwright, Oracle, ARM or a migration on other projects. Do not copy workflows or alter the starter pack during an audit. Missing starter-pack access does not block this skill.

## Official source starting points

Recheck relevant documentation for the installed versions and provider at review time; the toolkit does not embed current prices, quotas or a fixed workflow implementation. These pages were read on 2026-11-07 as methodology references, not verification of an audited account:

- [GitHub required-check troubleshooting](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks): tested revisions, skipped checks and merge queues.
- [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use): untrusted code, credentials and self-hosted runner boundaries.
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions): billing dimensions and shared allowances; verify current account applicability.
- [Playwright CI](https://playwright.dev/docs/ci): worker, environment and browser-cache tradeoffs; consult the actual installed release before prescribing options.
