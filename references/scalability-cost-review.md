# Scalability and cost efficiency review

Assess the smallest setup that satisfies the project's actual capacity, budget, reliability, security and permitted-use requirements. Select checks for the detected stack; no hosting model, provider, paid service or architectural style is required.

## Baseline and requirements

Inventory hosting, databases, storage, delivery networks, email, external APIs, model calls and background processing, including local hardware. Trace critical operations to their resource consumption. Use available telemetry, billing records and configuration; record the observation period, environment and source. Code alone cannot establish traffic, an account's selected plan or its remaining quota.

Distinguish monthly totals from daily limits, peak rates, concurrency and accumulated storage. Record request or job mix, data size and shape, cache behavior, retries and retention. Include shared-account usage where it consumes the same allowances. If evidence is unavailable, use explicitly labeled assumptions or `Not verified`; do not create a fictional baseline.

Use stated monthly budgets, delivery deadlines and recovery objectives. If these are unknown, record them as missing rather than inventing thresholds. Self-hosted resources have capacity and operational constraints: power, network, hardware/storage replacement, maintenance and recovery effort. Separate cash costs, existing sunk costs and unpriced operator time; do not assign an hourly labor rate without a source.

## Current pricing, quotas and terms

Retrieve official pricing, limits and applicable terms during each audit. For each material resource or billed dimension, record:

- Actual provider/product, plan, region and relevant account or project scope, with redacted account evidence where available.
- Usage metric and unit, observed consumption and its window, included quota and reset period, and whether the allowance is shared or promotional.
- Price currency, billing unit, minimum charge, rounding, volume tiers, fixed fees and conditions affecting the estimate. State tax or currency-conversion assumptions if relevant.
- Whether exceeding the limit causes rejection, throttling, suspension, automatic charges or a required plan change; verify spend controls rather than assuming they are hard caps.
- Commercial-use eligibility, license restrictions, acceptable-use limits and operational restrictions relevant to the actual use. Cite the applicable clause and state when interpretation or provider confirmation is needed.
- Official source URL and verification date, plus any conflict or account-specific uncertainty. A public price page does not establish that billing is enabled or that a plan is eligible for this account.

If official sources or account details cannot be verified, keep estimates conditional and label the missing evidence. Do not embed provider quotas or prices in the reusable Skill. Promotional credits, a free subscription fee and free transfer in one part of a request path do not prove the whole operation is free.

## Capacity and reliability

- Identify the first constraint on critical paths: request or execution limits, CPU/memory, database size, query work, connections, network/transfer, external API limits or job processing rate. Use measured evidence where available and `performance-measurement.md` for safe interpretation.
- Examine bounded work, cache reuse and invalidation, batching, deduplication, polling and retries. Evaluate optimization against actual repeated work; preserve correctness, permissions and freshness.
- For jobs, compare arrivals, processing capacity, peak backlog and maximum acceptable age. Inspect durable storage, restart/replay behavior, idempotency and dependency failures before recommending a queue service.
- Review monitoring of cost drivers and limits, backup coverage, recovery evidence and single points of failure. A home worker's power, network or disk failure matters according to the job's deadline and recovery requirements, not its hosting label.
- Distinguish evidence of a current failure from a conditional risk under larger workloads. Reuse existing performance, production, architecture or security findings rather than independently counting the same cause.

## Growth and cost model

Always include the observed current state and 10x/100x workload scenarios over a defined period. State which drivers grow: requests, concurrency, uploads, stored items, jobs or messages. A user-count multiplier alone is not a workload model. Separate sustained growth from bursts and include retention horizons for accumulating data.

Show the equations and input sources. For a simple eligible overage dimension, consumption may be estimated as operation count multiplied by units per operation; billable usage may then be the positive excess above its allowance. Apply the actual provider's billing units, rounding and rate schedule. This simplification does not apply unchanged to tiered rates, shared quotas, minimum commitments, storage-time billing or plans that stop service at a hard limit.

Do not multiply a zero current bill by ten or one hundred. Model fixed fees, free allowances, step changes, storage accumulation, cache misses, retry amplification and interactions between providers. Avoid double-counting a shared allowance. Track cost per successfully completed business operation where it helps explain growth, including failed attempts that still consume resources.

For each scenario, identify the first limit and resulting behavior, forecast cost as a range where inputs are uncertain, and record confidence and assumptions. If the current plan cannot serve the workload, label it blocked or infeasible. Price an eligible alternative separately rather than implying the current plan automatically supports paid overage. A spreadsheet or formula projection is not proof of measured capacity or a completed load test.

## Options and action triggers

Include **keep the current setup** as the baseline. Compare only relevant alternatives: remove unnecessary work, adjust retention or resource settings, use an eligible plan adjustment, then consider a provider or architecture change where justified. Do not assume an upgrade is more economical than migration or the reverse.

Compare ongoing cash costs, operator effort, migration expense, transition overlap and operational risks over the same horizon. Consider export/import, egress, proprietary APIs, data compatibility, downtime, rollback and ownership for exit planning. Lock-in alone does not justify abstraction layers or a migration. Record unpriced effort and uncertainty rather than inventing precise savings or payback.

For every recommended change, specify expected impact, assumptions, effort or complexity, risks, measurable trigger, measurement window, threshold source, preparation lead time and the next action with verification. Distinguish urgent requirements from optional future improvements. Example trigger forms, whose values must come from the project:

- Remaining quota is less than forecast usage until reset plus a justified reserve: reduce waste or evaluate an eligible alternative before service stops.
- Time to a capacity limit is shorter than the lead time needed to address it: begin the chosen preparation step.
- Oldest-job age exceeds the required delivery window while backlog grows: investigate processing/recovery or the next measured capacity step.
- A documented use change conflicts with verified plan terms: confirm eligibility or evaluate permitted options before that use begins.
- A comparable alternative meets requirements and has a demonstrated total benefit after transition and maintenance costs: evaluate a migration with rollback criteria.

Use the shared severity definitions for impact and confidence for evidence strength. Explain the scenario and action horizon separately from severity; a hypothetical 100x constraint is not automatically a blocker for today's release. Cost-first decisions must still meet security, data integrity, reliability and permitted-use requirements.
