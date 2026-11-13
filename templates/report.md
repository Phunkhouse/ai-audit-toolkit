# <Audit type> audit: <project>

- Date: YYYY-MM-DD
- Scope: <repository, components, environment and release>
- Audited project commit: <SHA or uncommitted>
- Toolkit commit: <SHA or uncommitted>
- Toolkit working tree: <clean or modified; describe relevant changes>
- Previous audit: <report path and date, or none>
- Evidence sources and access limitations: <brief list>

## Executive summary

<Concise outcome and the most important caveat.>

| Severity | Confirmed | Suspected |
| --- | ---: | ---: |
| Critical | 0 | 0 |
| High | 0 | 0 |
| Medium | 0 | 0 |
| Low | 0 | 0 |

## Release blockers

- <Finding ID and reason, or none confirmed.>

## Coverage log

| Area or component | Coverage (reviewed, sampled, skipped) | Evidence or sampling method | Limitation or reason skipped |
| --- | --- | --- | --- |
| <area> | <coverage> | <files, tests, commands> | <limitation> |

## Architecture overview (optional)

Include this section for architecture audits; omit it for other audits unless useful. Map the observed system using evidence and a compact diagram if it adds clarity. Mark inferred or inaccessible relationships as unverified.

| Component or boundary | Responsibility and data ownership | Dependencies or contracts | Evidence and limits |
| --- | --- | --- | --- |
| <component> | <responsibility and owner> | <relationship> | <source or unknown> |

Record relevant decision rationale, constraints and accepted tradeoffs with sources. Keep acceptable tradeoffs outside active findings. When rationale is unknown, state what evidence is missing.

## Findings

Use `SEC-001`, `COR-001`, `PRD-001`, `PERF-001`, `ARC-001`, `WEB-001`, `SCE-001`, `LEG-001` or `TCI-001` according to the audit type for a first audit. In repeat audits, preserve a prior ID for the same issue and use the next number not previously assigned for each new issue. For every finding, use the fields in `references/finding-format.md`.

### <PREFIX>-001: <Short description>

- Severity: Critical | High | Medium | Low
- Confidence: High | Medium | Low
- Status: Confirmed | Suspected
- Previous finding: <ID and report path, or none>
- Location: `<path:line or exact artifact>`
- Evidence: <specific behavior or result; include what was checked to disprove it; for performance, label it measured, code-proven or a hypothesis>
- Impact: <realistic scenario and conditions>
- Remediation: <smallest meaningful fix>
- Verification: <how to confirm the fix>

For architecture findings, include the affected requirement or change scenario, decision context and counter-evidence, and a proportionate remediation with migration steps and risks. Distinguish improvement priority from release-blocking impact.

## Performance measurements (optional)

Include this section for performance audits; omit it for other audits unless relevant. If no measurements were possible, state that explicitly and record missing evidence under `Not verified`.

For each measurement set, record the scenario, command or evidence source, tool version, timestamp, relevant commits, environment and build mode, dataset size and shape, network conditions, request mix, concurrency, cache state, warm-up and sample count or duration. Describe variability and any errors or timeouts. Keep comparable baseline conditions explicit; use `not available` when a baseline or target is missing.

| Scenario and measurement set | Metric and unit | Observed result | Baseline or target and source | Evidence or artifact |
| --- | --- | --- | --- | --- |
| <scenario and conditions above> | <metric, unit> | <value and variability> | <comparable value and source, or not available> | <redacted evidence reference> |

## Resource efficiency assessment (when relevant)

Use for relevant scalability/cost, performance and production reviews, following `references/resource-efficiency.md`. Correctness reviews may use only the cache/change contract and omit resource/billing tables. Keep Planning proportional: proposed schedules and workloads are assumptions, not live findings. Reuse the resource/quota register and action tables elsewhere in this report rather than duplicating them. Retain the current audit's report filename and finding IDs, cross-referencing shared root causes.

### Material producers and work amplification

Distinguish code configuration, verified deployment and observed operation. Include non-user activity and shared production/preview/standby/build/monitoring consumers where material. Record source and deployed revisions separately; merged changes and expected savings do not establish deployment or measured benefit.

| Producer and source location | Environment and evidence state | Cadence/trigger and required deadline | Query/API work and cache boundary | Metered dimension, shared scope and evidence limits |
| --- | --- | --- | --- | --- |
| <timer, route, client poll, job or other producer> | <configured, deployed, observed or unknown; revision> | <schedule/time zone, traffic driver and requirement> | <calls, returned/scanned data, invalidation/fallback fan-out> | <active time, calls, transfer or other unit; source/window> |

### Scenarios and impact

Assess no-visitor operation, expected use and cold-cache/invalidation/failure behavior where relevant. State horizon, fixed/data/traffic drivers, equations, units, source dates and uncertainty. Merge overlapping active intervals per endpoint; separate capacity-time, query work, rows/payloads, provider transfer and billed cost. Do not use missing inputs as zero or extrapolate exact savings from code alone. Reuse existing growth scenarios where applicable.

| Scenario | Inputs, assumptions and evidence | Conditional resource/quota impact and model | Correctness/delivery constraints | Missing evidence and verification |
| --- | --- | --- | --- | --- |
| <no visitors, expected operation or cold/failure case> | <measured, code-proven, projected or unknown; window> | <active intervals/work counts/bytes; horizon and range, or not verified> | <response/freshness, removals, recovery and isolation> | <bounded isolated check or existing telemetry source> |

### Cache and change-detection contract

| Consumer and dependencies | Required visible changes and permitted delay | No-op/time/concurrency/error cases | Evidence, finding or next check |
| --- | --- | --- | --- |
| <cache/fingerprint/token and actual fields/derived inputs> | <update, delete/withdraw, role/tenant boundary and freshness> | <bookkeeping stability, expiry without writes, snapshot races and fallback> | <verified behavior, counter-evidence or limitation; include the mechanism's own cost when relevant> |

Record monitoring metrics, sources, collection/reset windows, review cadence, justified thresholds, owner if known and action before limits. Compare forecast usage until reset plus a justified reserve with remaining shared quota. Inspect the monitoring's own service activity. Prefer existing evidence; this review does not authorize production SQL, installing extensions, resetting counters or changing monitors. Separate code fixes, conditional impact and post-release verification. A release blocker needs a supported conflict with an actual budget, availability or correctness requirement.

## Web quality results (optional)

Include this section for web quality audits; omit it for other audits unless useful. Record the environment and build, tool and browser versions, resolved viewport/emulation/throttling settings, locale, cache/storage state, commands and run budget. Confirm the actual final page and authentication role without exposing credentials or sensitive URLs. Keep raw browser profiles and JSON/HTML reports outside the repository; include essential redacted evidence here.

| Page and state | Device profile and run count | Applicable category scores or unavailable reason | Manual checks completed | Evidence and limitations |
| --- | --- | --- | --- | --- |
| <route, role and observed final page> | <profile, count> | <per-run results or summary and variability> | <checks actually completed> | <redacted evidence and gaps> |

Use the performance measurement section for relevant numeric metrics and comparable baselines. Identify intentional SEO exclusions and skipped categories explicitly. Category scores alone do not prove accessibility conformance, security, search visibility or real-user performance.

## Scalability and cost assessment (optional)

State the mode (`Planning` or `Audit`) and specification/revision reviewed. In Planning, keep this section short and adapt the scenario table to expected initial operation and a relevant peak; add 10x/100x only when decision-relevant. Replace observed-usage cells with explicit assumptions or `Not verified`, never invented measurements. Include the proposed minimal setup, monitoring, justified action triggers and missing inputs; omit empty severity/release-blocker sections. Planning decisions are not verified capacity. Audit reconciles earlier planning requirements and triggers using continuing `SCE-` IDs and real evidence.

Include this section for scalability and cost audits; omit it for other audits unless relevant. Separate observed usage from estimates and unverified inputs. Record budget, currency, observation period, forecast horizon and any tax or currency-conversion assumptions. Never use zero as a substitute for missing usage or billing evidence.

### Resource, quota and terms register

Use a row per material billed dimension or restriction. Record actual product/plan, region, account/project scope, shared allowances, units and reset windows. Include prices, billing-unit rounding, fixed fees, promotional expiry and applicable commercial or operational restrictions. Distinguish public documentation from verified account settings.

| Resource and dimension | Observed usage and window | Quota, price or applicable restriction | Behavior at limit and controls | Source URL, verification date and uncertainty |
| --- | --- | --- | --- | --- |
| <resource, plan, region, scope> | <usage and source, or not verified> | <units, currency, period and terms> | <stop, throttle, charge or plan change> | <official source and account evidence limits> |

### Current, 10x and 100x scenarios

Define workload drivers, fixed inputs, bursts, retention and horizon for each scenario. Show equations and input sources, using actual rate schedules and allowance scopes. If a plan cannot support a scenario, label it infeasible and price any eligible alternative separately. Estimates are not measured capacity or load-test results.

| Scenario | Workload assumptions and model | First constraint and resulting behavior | Cost range and currency | Confidence and missing evidence |
| --- | --- | --- | --- | --- |
| Current | <observed inputs and window> | <limit/headroom or unknown> | <observed or estimated, with basis> | <evidence strength> |
| 10x | <drivers, horizon and equations> | <first limit and behavior> | <range, or not verified> | <assumptions and gaps> |
| 100x | <drivers, horizon and equations> | <first limit and behavior> | <range, or not verified> | <assumptions and gaps> |

### Prioritized decisions and triggers

Always assess keeping the current setup. Compare only relevant optimizations, eligible plan changes or migrations. Include current risks and future action horizons separately from finding severity. Account for cash cost, operator effort, one-time transition costs and reliability/security tradeoffs; mark unpriced effort explicitly.

| Option or finding ID | Priority and decision now | Expected impact, effort and risks | Measurable trigger, window, source and preparation lead time | Next action and verification |
| --- | --- | --- | --- | --- |
| Keep current setup | <adequate, conditional or insufficient with evidence> | <cost and requirement assessment> | <revisit condition> | <measurement or review step> |
| <optimization, plan change or migration> | <act now, prepare or defer and why> | <estimated impact with assumptions and uncertainty> | <signal, justified threshold and window> | <concrete action, owner if known, and validation> |

## Test and CI assessment (optional)

Include for test/CI efficiency audits. Keep the scope proportional and omit inapplicable categories. Describe the current test architecture and CI execution architecture, including trigger/job dependencies, invoked scripts, services and observed merge/deployment gates. Include separate current/proposed Mermaid flows when supported by evidence; label inferred links and proposed changes. Assess infrastructure options against the current setup, including security, shared-host contention, total cost, maintenance and actual fallback behavior. Record inspected optional starter-pack recipe revisions and applicability if used.

State the optimization objective and relative priorities, including any change since the previous audit. Record CI scheduling strategy separately from runner placement and execution improvements. Standard and Budget-conscious can both benefit without changing their required checks or scheduling policy.

### Execution conditions

Record applicable constraints and evidence; unknown inputs stay explicit. A provider's advertised resources, nominal worker setting or cache directory does not establish effective runtime behavior.

| Phase/project | Effective CPU/memory limits and competing jobs | Tool version and configured/observed workers | Cache type, location, state and invalidation | Selected/passed/failed/skipped tests and evidence |
| --- | --- | --- | --- | --- |
| <phase or suite> | <process/container limits and telemetry, or unknown> | <installed version, overrides and actual count> | <cold/warm; persistence/cleanup and trust scope> | <counts, important assertions and comparison limits> |

### Risk coverage and proposed suite boundaries

Use this as both an inventory and a risk-to-gate map. Distinguish observed from proposed coverage, and list sampled/skipped suites in the coverage log. Do not infer equivalent protection from coverage percentages or similar test names.

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

### Prioritized optimization backlog

Group rows as quick wins, test/CI architecture or infrastructure improvements. Each finding holds the observation, precise location, evidence/counter-evidence and realistic impact; reference its ID here. Priority reflects expected value and effort, independently of severity and concrete release-blocking impact.

| Finding ID, category and priority | Proposed change | Expected benefit by dimension and confidence | Coverage/security/reliability risk and effort | Validation and rollback |
| --- | --- | --- | --- | --- |
| <TCI-ID; category; act now/prepare/defer and why> | <smallest meaningful change> | <feedback; compute/cost; reliability; maintenance; measured/estimated basis and High/Medium/Low confidence> | <risk and safeguards; Low/Medium/High effort> | <prove efficiency and retained gates/coverage; restore configuration and required outcomes safely> |

Record keeping the setup and considered options not recommended or deferred, with evidence and reasons. Present the backlog for review before a separate implementation plan; do not modify tests, gates, workflows or runner infrastructure during the audit. Put unavailable settings, measurements and unresolved requirements in `Not verified` with practical next steps.

On repeat audits, compare expected benefit with observed results under the stated objective. Preserve earlier findings/evidence and explain revised priorities, changed objectives, implementation status, measurement limits and retained coverage. Do not present an implemented optimization as independently measured when only a bundled CI result exists.

## Legal readiness assessment (optional)

For legal reviews, state the mode (`Planning` or `Pre-launch`), specification/revision reviewed, and model/reasoning setting when reliably known (otherwise `Not verified`). Record any model limitation. In Planning, replace launch-verdict framing with planning decisions, omit empty severity counts and release-blocker sections, and use the planning table below. The shared fulfillment statuses below apply to inspected implementation; use `Not yet assessed` for future fulfillment in Planning. Retain the same source and applicability evidence in both modes.

### Planning requirements and decisions (Planning only)

| LEG-ID | Planned facts and applicability reasoning | Source IDs and exact provisions; duty or recommendation | Implementation requirement or decision | Observable acceptance check | Unresolved facts and re-review trigger |
| --- | --- | --- | --- | --- | --- |
| <ID> | <settled choice, conditional option or unknown; applicable scope and exceptions> | <verified rule or explicit uncertainty; statutory, contractual or optional> | <focused action or decision> | <future test, walkthrough or evidence; fulfillment not yet assessed> | <missing input and material change requiring reassessment> |

Do not equate this table with completed implementation, publishable legal documents or legal clearance. In Pre-launch, reconcile each earlier requirement using its existing ID and actual evidence; reverify the sources and assumptions.

Include this section for legal readiness audits; omit it for other audits unless relevant. Establish operator, jurisdictions/markets, audience/contract model and the review and target launch dates. Separate observed facts, operator statements, assumptions and missing inputs. List excluded markets/topics and which conclusions they limit. Do not issue an overall compliance score or unrestricted legal clearance.

### Primary-source register

Retrieve and read the actual source; an entry-point URL alone is not verification. Distinguish legislation, judgments/decisions, authority guidance/recommendations, agreed contracts and exact licenses. Record the version and operative provision, effective and applicability dates, retrieval date and access/currency limitations.

| Source ID | Issuer and source type | Document, version and exact provision/clause | Effective/applicable dates | Official URL, retrieval date and verification limits |
| --- | --- | --- | --- | --- |
| <ID> | <issuer; binding rule, guidance, contract or license> | <text actually checked, or unavailable> | <dates and transition notes> | <source and access status> |

### Applicability and verification

Use `Applies`, `Does not apply` or `Undetermined` for applicability, with facts, exceptions and source references. Use `Supported`, `Gap`, `Not verified` or `Needs interpretation` for verification; a justified `Does not apply` uses a dash instead. `Supported` covers only the specific inspected obligation. A `Gap` requires a verified applicable rule and project evidence; an interpretation question is not a confirmed violation.

| Candidate obligation and source IDs | Applicability and reasoning | Verification | Project evidence and limits | Finding ID or focused next step |
| --- | --- | --- | --- | --- |
| <requirement and exact provision> | <status, relevant facts and exception reasoning> | <status or dash> | <code, UI, document, process or missing evidence> | <LEG-ID, evidence request or interpretation question> |

### Prioritized launch actions and unresolved questions

For each active finding, connect source -> applicability -> evidence -> action -> verification. Keep statutory duties, contractual duties and recommendations distinct. The generic `Confirmed`/`Suspected` status describes supported facts, not certification of legal compliance. Identify the exact question and missing facts for any material interpretation issue, and obtain focused clarification where needed rather than a blanket referral for every routine item.

| Finding or question | Launch impact and priority | Smallest justified action or clarification | Required evidence and verification |
| --- | --- | --- | --- |
| <LEG-ID or unresolved question> | <impact, confidence and dependent conclusions> | <action, precise question and owner if known> | <source/fact needed and follow-up check> |

## Previous findings

Include this section when a previous report exists. A fixed finding belongs here, not among active findings.

| Previous ID | Current ID, if active | State (fixed, still open, regressed, not verified) | Evidence |
| --- | --- | --- | --- |
| <ID> | <ID or —> | <state> | <evidence> |

## Not verified

| Area | Why not verified | Evidence needed | How to get it |
| --- | --- | --- | --- |
| <area> | <access or scope limit> | <specific artifact or test> | <practical next step> |

## Checks without findings

<Briefly describe checks actually performed. Do not imply exhaustive coverage.>
