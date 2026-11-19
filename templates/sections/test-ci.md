# Test and CI report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Insert after `Findings`.

**Additional finding fields.** Include `Priority` as defined in `references/severity.md`. For test/CI findings, label measured results, code-proven mechanisms, conditional estimates and hypotheses separately. Include the protected risk, affected suite/job/gate, relevant revision/event/run conditions and counter-evidence. State expected benefit independently for feedback, compute/cost, reliability and maintenance, plus confidence, coverage/security risk, effort, validation and rollback. Quantified savings need comparable measurements or explicit equations and assumptions; a proven mechanism alone does not establish its runtime cost. Use `references/test-ci-review.md` and keep optimization priority separate from severity or release-blocking impact. Link backlog rows to findings and cross-reference shared causes from other audits. For numeric test/CI results, identify CI versus a named local environment versus an estimate, interval boundaries, effective workers/resources, cold/warm state and selected/skipped coverage. State attribution limits and the optimization objective. Preserve earlier evidence when a changed objective or later measurements revise a recommendation; implemented code and verified CI behavior are separate claims.

## Test and CI assessment

Keep the scope proportional and omit inapplicable categories. Describe the current test architecture and CI execution architecture, including trigger/job dependencies, invoked scripts, services and observed merge/deployment gates. Include separate current/proposed Mermaid flows when supported by evidence; label inferred links and proposed changes. Assess infrastructure options against the current setup, including security, shared-host contention, total cost, maintenance and actual fallback behavior. Record inspected optional starter-pack recipe revisions and applicability if used.

State the optimization objective and relative priorities, including any change since the previous audit. Record CI scheduling strategy separately from runner placement and execution improvements. Standard and Budget-conscious can both benefit without changing their required checks or scheduling policy.

### Execution conditions

Record applicable constraints and evidence; unknown inputs stay explicit. A provider's advertised resources, nominal worker setting or cache directory does not establish effective runtime behavior.

For scheduling bottlenecks, record schedulable units, project dependencies/limits and worker occupancy/idle tails with timestamp evidence and missing overhead. Separate scheduling bounds from resource saturation. Describe retry/restart scope, repeated passing work and setup costs; distinguish successful-run duration from failure-path amplification and its observed frequency.

| Phase/project | Effective CPU/memory limits and competing jobs | Tool version and configured/observed workers | Cache type, location, state and invalidation | Selected/passed/failed/skipped tests and evidence |
| --- | --- | --- | --- | --- |
| <phase or suite> | <process/container limits and telemetry, or unknown> | <installed version, overrides and actual count> | <cold/warm; persistence/cleanup and trust scope> | <counts, important assertions and comparison limits> |

### Risk coverage and proposed suite boundaries

Use this as both an inventory and a risk-to-gate map. Distinguish observed from proposed coverage, and list sampled/skipped suites in the coverage log. Do not infer equivalent protection from coverage percentages or similar test names.

Compare relevant assertions, scenarios, roles, states, browsers/devices and viewports before and after. Record removed matrix cases and any owner-approved tradeoffs even if other checks remain; test counts alone do not establish unchanged coverage.

| Protected behavior or failure risk | Existing tests/layer and actual boundary exercised | Current merge/deployment gate and evidence | Proposed smoke/regression membership and change triggers | Required boundary, detection delay and coverage retained |
| --- | --- | --- | --- | --- |
| <risk and requirement source> | <suite/assertions, real integration or mock> | <gate, revision/run/rule or not verified> | <keep or proposed assignment with reason> | <what blocks release, timing and equivalent protection> |

### Baseline, bottlenecks and measurement plan

Record observation window, timestamps, commands/data sources, event/tested revision, tool/runtime versions, runner OS/architecture/resources, data, worker count, cache state, sample count, variability, failures and sampling limits. Separate queue/setup/execution/reporting, critical path, runner-minutes, CPU/memory, billing and maintenance; overlapping job times do not sum to wall-clock time. Include retries/cancellations and run frequency without double counting. Cost estimates need dated official rates, billing units and account/allowance evidence; missing inputs stay unknown.

| Stage, suite or metric | Evidence basis and source | Observed result, unit and variability | Comparable baseline/target and source | Missing measurement and bounded validation plan |
| --- | --- | --- | --- | --- |
| <queue, setup, job, test, retry rate, cost or maintenance> | <measured, code-proven, estimated or hypothesis; artifact> | <value with sample/window, or not verified> | <requirement or comparable run, or unavailable> | <scenario/command, metrics, run/resource budget, stop condition and acceptance basis> |

Explain test inefficiencies, coverage risks and the actual critical path using this evidence. Separate first-attempt failures and retry recoveries from confirmed flaky-test causes. Do not present proposed experiments as completed checks or estimated savings as measured results.

Label each numeric result `measured (CI)`, `measured (local <environment>)` or `estimate`, with its source and interval boundary (workflow, job, full step or tool-only). Compare like cold/warm cohorts and retain cold-start costs. Separate the observed combined change from attributable effects; unrelated phase variation and bundled optimizations do not establish individual contributions. A PR-branch result does not verify a later merged revision, and lower wall time does not establish lower CPU use or billed cost.

### Predicted versus observed

Use for follow-up evidence; omit if no change has been evaluated. Keep dated earlier evidence and canonical finding/reconciliation status. Distinguish implementation, one observed run and repeated validation. A baseline median compared with one after-change run does not establish a new stable median; a confirmed scheduling bottleneck does not confirm the projected gain from its remedy.

| Finding/change and metric | Original prediction and baseline | Observed result and evidence | Coverage/condition changes and attribution limits | Validation evidence and next check |
| --- | --- | --- | --- | --- |
| <TCI-ID; job, phase, failure-path cost or other metric> | <estimate, assumptions, baseline cohort/window, samples and revision> | <CI/local origin, result/unit, variability, sample count, revision and source> | <assertions/matrix delta, cache/runner conditions, bundled effects and missing telemetry> | <implemented/observed/repeatedly validated evidence; remaining bounded check> |

Recompute the current critical path and remaining estimates after material changes. Explain whether new runner, suite or objective evidence warrants revisiting a rejected option; preserve and label superseded local trials. One green run without retries does not establish unchanged flakiness.

### Prioritized optimization backlog

Group rows as quick wins, test/CI architecture or infrastructure improvements. Each finding holds the observation, precise location, evidence/counter-evidence and realistic impact; reference its ID here. Priority reflects expected value and effort, independently of severity and concrete release-blocking impact.

| Finding ID, category and priority | Proposed change | Expected benefit by dimension and confidence | Coverage/security/reliability risk and effort | Validation and rollback |
| --- | --- | --- | --- | --- |
| <TCI-ID; category; Now/Next/Later and why> | <smallest meaningful change> | <feedback; compute/cost; reliability; maintenance; measured/estimated basis and High/Medium/Low confidence> | <risk and safeguards; Low/Medium/High effort> | <prove efficiency and retained gates/coverage; restore configuration and required outcomes safely> |

Record keeping the setup and considered options not recommended or deferred, with evidence and reasons. Present the backlog for review before a separate implementation plan; do not modify tests, gates, workflows or runner infrastructure during the audit. Put unavailable settings, measurements and unresolved requirements in `Not verified` with practical next steps.

On repeat audits, compare expected benefit with observed results under the stated objective. Preserve earlier findings/evidence and explain revised priorities, changed objectives, implementation status, measurement limits and retained coverage. Do not present an implemented optimization as independently measured when only a bundled CI result exists.
