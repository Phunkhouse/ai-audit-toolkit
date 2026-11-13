# Resource efficiency across request and background work

Use when metered services, scheduled work, polling, cache reuse or growing data can materially affect a project's budget, quotas or release requirements. Adapt to the actual stack: databases, API calls, functions, queues and object storage can all exhibit the same amplification. A small, fast operation can still keep a resource active or repeat often enough to exhaust an allowance. Do not require paid services, migration or another complete audit to apply this review.

## Route the review

- **Scalability/cost:** own the resource model, no-visitor baseline, overlapping active time, quota forecast and action triggers. In Planning, use proposed schedules and explicit assumptions. In Audit, use built/deployed evidence where available and reconcile prior forecasts. A pre-launch review of built code does not need fabricated production telemetry.
- **Performance:** trace query/call counts, transferred data, cache scope, invalidation, repeated work and the cost of proposed optimizations. A mechanism can be proven statically while its runtime magnitude remains unverified.
- **Production readiness:** apply the relevant pre-launch checks and establish monitoring, remaining headroom and limit behavior. Record assumptions and unverified deployment/account state. A blocker requires supported impact on an actual release requirement; missing telemetry alone is not an automatic blocker.
- **Correctness:** inspect cache/change-detection contracts, freshness, removals, withdrawals, time transitions, failures and user/tenant boundaries. Use only these relevant sections; do not force billing tables into a logic review. Pure excess work without a behavioral violation belongs in performance/scalability evidence, not a correctness bug.

Use the current audit's report and finding IDs. Cross-reference overlapping evidence/root causes rather than issuing independent findings for the same problem in several audits. Read-only inspection and a report do not authorize production queries, extension installation, statistics resets, deployment or account changes.

## Inventory every material producer

Trace producers from the actual command or entry point to resource work, not just critical user journeys. Include timers/crons and their time zones, workers, cleanup/retention, backups, health checks, retries, client polls, session/menu/count lookups, search, prefetch, crawlers, first-render pages, build-time reads and monitoring. Include production, staging/preview, standby and local/CI consumers when they share a metered resource or quota. Disabled features may still run maintenance/discovery queries; inspect what exits before reaching the service.

For each material producer record source location, intended behavior/deadline, environment, cadence or workload driver, query/API operations, cache boundary and quota/billing dimension. Distinguish source configuration from proof that a timer is enabled, a branch deployed or a provider setting active. Map shared account/project/endpoint scope. A configured cron is evidence of a potential mechanism, not measurement of live invocations.

Explicitly assess **no visitor traffic**, representative expected use and **cold-cache/invalidation/failure** behavior when relevant. In Planning these are bounded assumptions, not observed operation; do not invent a baseline or run a load test. A permanently active resource driven by background work can be a pre-launch risk independent of audience size.

## Model active time and quota consumption

Verify current official service semantics and applicable account settings: what activates it, what counts as activity, the idle tail, minimum capacity, autoscaling, rounding, reset window and hard-stop versus paid-overage behavior. Do not embed a universal suspend interval or infer a free plan from a driver. Check idle transactions, health/pool checks, connection attempts and provider maintenance where relevant; ordinary idle connections are not universally proof that compute stays active.

For a fixed-capacity service with an applicable idle tail, a conditional approximation is:

```text
active intervals = union of [activation time, end of work + verified idle tail]
compute units over horizon = capacity × duration(active intervals in hours)
```

Merge intervals from all producers for the same endpoint before charging active time. Do not add overlapping timer tails independently, or assume changing one timer creates sleep while another still wakes the service. Evaluate actual schedules, duration, time-zone/DST behavior and existing active periods. Include long-lived activity and provider-originated work where supported; if capacity varies, integrate capacity over active time rather than applying one constant. Apply provider billing rules separately and label the model's limits. Query milliseconds and active compute hours are different dimensions.

Show inputs, equations, units, horizon, ranges, source dates and confidence. Where meaningful, estimate monthly impact or usage until the next reset, with remaining shared quota and justified reserve. Mark unknown traffic, enabled schedules, account settings or prices `Not verified`; do not substitute zero or turn a projection into measured savings. Keep no-visitor fixed work separate from traffic- and dataset-driven growth and avoid double counting them.

## Trace amplification and transferred data

Follow the full chain from a trigger through invalidation, cache misses, loader calls and service work. Inspect broad refreshes after no-op jobs, repeated reads for multiple windows/locales, unbounded history scans, N+1 work, oversized `SELECT` projections, redundant account/session queries and repeated external calls. Flag a broad query only with evidence that its work is unnecessary or unbounded for the stated requirement.

Establish actual cache scope: request, process/instance, deployment, region, browser or shared store. Verify framework, installed hosting adapter and configured handler behavior; an annotation or nominal TTL does not establish cross-instance reuse. Inspect cold instances, deployments, cache-key cardinality, expiry, tag fan-out and concurrent refreshes. Distinguish request-triggered revalidation from an actual periodic job. Do not multiply every TTL by every instance when no requests cause refreshes.

Evaluate retries, timeout fallbacks and speculative/parallel requests that may duplicate still-running work. Client cancellation need not stop a remote query. Prefer bounded reuse, narrower invalidation, correct projections and deduplication where they meet requirements; shared cache infrastructure or stored responses are options to compare, not mandatory fixes. Include their own function/storage/request costs and failure/freshness behavior.

Separate query calls, rows returned/affected, rows scanned, logical payload size, on-wire bytes and provider-metered transfer. `pg_stat_statements.rows` is not a byte meter; statistics can include non-read statements. Large row counts help locate candidates but do not establish a share of billed network usage. Serialized fixtures or row-width estimates need explicit assumptions and protocol/encoding limits; correlate with provider counters over the same window where available. Include backups, exports, builds and other clients rather than assuming website traffic explains all transfer.

## Verify the correctness and cost of avoiding work

For cache keys, fingerprints or change tokens, map the dependencies of actual consumers: fields, joins, derived decisions, deletions, availability/freshness bands, time windows, owner withdrawals and relevant languages/roles/tenants. A narrower refresh is correct only within its documented contract and acceptable delay. Do not require immediate refresh for every invisible change, or silently replace a real freshness requirement with a longer TTL.

Check both directions: a required visible change must trigger refresh or be covered by a justified fallback; bookkeeping-only changes should not defeat intended reuse. Include passage of time without writes, failed/partial jobs, unknown fingerprints, concurrent writes and data snapshots. Review deterministic ordering, `NULL`, field/row boundaries and canonical serialization; ambiguous serialization can hide changes even when a hash function itself works correctly. A hash is not proof of complete dependency coverage. Preserve authorization and never share personalized data just to improve hit rate.

Assess the optimization's own work: before/after fingerprint scans, change-log writes, sorting/aggregation, locks, stored-response fetches, retries and fallback refreshes. Compare avoided work with added work at realistic data size and frequency, including growth. Returning a small hash limits that query's result payload but does not prove that computing it or the overall workflow is cheaper. Distinguish confirmed incorrect output, a supported waste mechanism, accepted tradeoffs and unverified runtime magnitude.

## Pre-launch evidence and safe verification

Use code/configuration, existing tests, prior reports and available read-only telemetry exports first. Record audited and deployed revisions separately: merged code, worker deployment and web release may differ. An implemented fix is not proof of production savings. Do not open production connections or run SQL (including statistics inspection), enable extensions or reset counters as part of this workflow without separate explicit authorization. Read-only polling can itself activate metered resources.

Use a disposable copy with isolated services, fixtures/fake clocks and bounded run/time/concurrency/resource budgets for useful local checks. Verify side effects and credentials before commands; a copy does not isolate external dependencies. Do not perform paid or production experiments under a generic audit request. If isolation or evidence is unavailable, record the limitation and a concrete evidence request instead.

Relevant acceptance cases include:

- No-visitor schedules and no-op jobs perform only justified work, with the required reaction/cleanup deadlines preserved.
- Repeated unchanged input does not force unnecessary expensive reloads; a visible update, deletion or withdrawal still reaches every required consumer within its promised delay.
- Time-only expiry and boundary transitions behave correctly without a database write.
- Cold or separate instances, concurrent misses, retries and timeouts do not silently invalidate the work-count model or leak cross-user data.
- A larger representative dataset exposes fingerprint/loader growth without assuming hypothetical production latency.

Record actual commands, versions, data shape, cache state, event/call counts, result equivalence and interval boundaries. Label measurements, code-proven mechanisms and conditional estimates separately. Request/call counts from an isolated run can verify amplification, but do not establish real traffic, provider billing or production cache hit rate.

## Monitoring and action triggers

Specify metric, source, observation window/reset boundary, review cadence, owner if known and a practical action. Use provider usage and active-time trends plus application aggregates such as job/refresh counts, changed versus unchanged work, query/loader calls, payload samples, cache hit/miss/fallback counts and fingerprint duration. Preserve privacy: no raw credentials, account identifiers, personal query parameters or customer payloads in reports.

Record statistics reset/restart behavior and collection gaps; do not assume counters are lifetime totals or that every platform persists them through suspend. Avoid creating a frequent SQL health/statistics poll that defeats the desired idle periods. Prefer existing provider telemetry or collection during already-active windows where suitable. Propose instrumentation rather than installing it during the audit.

Useful trigger forms need project-specific thresholds and sources:

- Forecast consumption until reset plus a justified reserve exceeds remaining allowance; investigate the dominant producers before considering an upgrade.
- No-visitor active time, invalidations without visible change, transfer per successful operation or fallback frequency exceeds the modeled range over a defined window.
- A newly added timer, loader field, deployment/adapter, preview consumer or data-growth pattern invalidates the resource/cache contract; rerun the relevant checks before release.

Keep current fixes, projected impact and post-release verification separate. Prefer removing demonstrated waste while meeting correctness, security and delivery requirements. A budget conflict becomes release-blocking only when the requirement, conditions and impact are supported; do not prescribe a paid plan, migration or slower user-facing behavior merely to make a free allowance fit.

## Source starting points

Primary sources checked on 2026-11-13 illustrate semantics to verify, not a fixed provider ruleset. Retrieve the relevant versions, official limits and account evidence during each audit:

- [Neon compute lifecycle](https://neon.com/docs/introduction/compute-lifecycle): activation, inactivity/suspend behavior, idle transactions and session-state considerations. Apply verified account semantics rather than copying a timeout into every project.
- [Next.js cache handlers](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheHandlers): default process-local caching and configurable shared storage; verify the actual installed adapter and deployment behavior.
- [PostgreSQL 17 pg_stat_statements](https://www.postgresql.org/docs/17/pgstatstatements.html): call/row/execution counters and reset/persistence settings, not a provider network-byte bill. Use the actual database version.
