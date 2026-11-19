# Resource efficiency report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Shared by scalability/cost, performance, production and correctness audits when relevant. Insert after `Findings` and the audit's own sections.

**Additional finding fields.** For resource-efficiency findings across scalability/cost, performance, production and correctness, identify the producer, environment/revision, frequency, cache/change contract and affected requirement. Use `references/resource-efficiency.md` to distinguish no-visitor work, overlapping active time, amplified calls, rows and actual transfer. Quantified monthly/quota impact needs explicit inputs, units, horizon, dated service/account evidence and confidence; missing inputs stay unverified. Record the smallest fix, correctness/freshness constraints, the optimization's own work, monitoring trigger and isolated verification. Keep the current audit's ID sequence and cross-reference shared causes. Correctness-only findings need behavioral evidence, not a compulsory cost forecast.

## Resource efficiency assessment

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
