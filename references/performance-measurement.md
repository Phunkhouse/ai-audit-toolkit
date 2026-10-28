# Performance measurement

Use this guidance when a performance audit measures behavior or interprets existing measurements. Select metrics and tools for the actual project; do not require a particular framework or benchmark suite.

## Workload and comparison

- Start with a critical scenario and its documented target, if one exists. Record expected data sizes, request mix, concurrency and frequency. If these are unknown, state the assumptions and limit conclusions to the tested workload.
- Establish a baseline from comparable prior measurements or an existing version. If none is available, report the current observation without claiming a regression or improvement.
- Keep build mode, hardware or service limits, runtime, configuration, dataset, network conditions and cache state comparable. Separate cold-start and warm-cache measurements. Preserve the same output and correctness requirements when comparing alternatives.
- A local synthetic benchmark describes its environment. Field measurements describe actual users or production traffic. Label the source and do not use one as proof of the other's performance.

## Safe execution

Builds, dependency installs and benchmarks that write files belong in a disposable copy outside the audited repository. Ensure it includes any relevant uncommitted source changes; record differences or missing inputs. Compare the source repository's Git status before and after and preserve pre-existing changes.

Use isolated test databases, fixtures or stubs. Review connections and side effects before executing project commands: copying the repository does not prevent requests to live services. Do not run production load tests or billable external experiments without separate explicit authorization. Query analysis that executes a query, such as `EXPLAIN ANALYZE`, requires the same isolation as other executing tests.

Choose a bounded duration, maximum concurrency and resource or cost budget before a run. Stop when a limit is reached or errors make the comparison invalid. If execution cannot be made safe or the tools are unavailable, record `Not verified` and the evidence needed instead of installing or configuring a benchmark system as part of the audit.

## Measurement record

For each measurement, record:

- Scenario, command or evidence source, tool and version, timestamp and relevant commits.
- Environment, build mode, configuration, data size and shape, and relevant network conditions.
- Request mix, concurrency or arrival rate, cache state, warm-up and sample count or duration.
- Metric, units, observed value, errors or timeouts, and the baseline or target with its source.
- Variability across repeated runs and limitations of the sample.

Choose a representative statistic and show variation; do not select only the fastest run. Report latency percentiles only with their sample size and collection window, and avoid treating tail percentiles from tiny samples as reliable. Track successful throughput alongside failures so fast failures do not appear to be an improvement.

## Evidence and findings

State whether evidence is **measured**, **code-proven** or a **hypothesis**. These describe evidence, not severity or the existing `Confirmed`/`Suspected` status.

For example, code may prove one database request per item in a loop. That supports a request-count mechanism; it does not establish a particular latency, capacity limit or benefit from a proposed fix. Include guards, actual batching and expected item counts when assessing impact. Treat an unverified runtime consequence as `Not verified` even if the mechanism is confirmed.

Prioritize findings using the frequency and importance of the affected flow, realistic scale, and latency, resource or cost impact. A benchmark threshold becomes a release blocker only when its source and relevance are established. Do not turn speculative optimizations into findings or recommend caching without considering invalidation, authorization and data freshness.

## Metric selection

- Frontend: loading, interactivity, rendering work, transferred bytes and request waterfalls. Distinguish lab observations from field Web Vitals.
- Services: latency distributions, successful throughput, errors, CPU, memory, I/O and saturation of limited resources.
- Databases: query count, execution plans, rows processed, lock waits and pool utilization at representative data volumes.
- Queues: wait time, processing time, backlog growth and completion rate at the stated load.
- Model applications: time to first token, total latency, call and token counts, retries and cost per successfully completed operation, with output quality requirements held constant.

Background: [Google SRE monitoring guidance](https://sre.google/sre-book/monitoring-distributed-systems/) and [Web Vitals](https://web.dev/articles/vitals).
