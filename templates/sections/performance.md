# Performance report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Insert after `Findings`. Add the [resource efficiency sections](resource-efficiency.md) when scheduled, cached or metered work matters.

**Additional finding fields.** Include `Priority` as defined in `references/severity.md`. For performance findings, state whether evidence is measured, code-proven or a hypothesis, and separate observed behavior from unverified runtime impact. Use the conditions and comparison guidance in `references/performance-measurement.md` when interpreting measurements. Reuse or cross-reference evidence from other audit types rather than presenting the same root cause as independent findings.

## Performance measurements

If no measurements were possible, state that explicitly and record missing evidence under `Not verified`.

For each measurement set, record the scenario, command or evidence source, tool version, timestamp, relevant commits, environment and build mode, dataset size and shape, network conditions, request mix, concurrency, cache state, warm-up and sample count or duration. Describe variability and any errors or timeouts. Keep comparable baseline conditions explicit; use `not available` when a baseline or target is missing.

| Scenario and measurement set | Metric and unit | Observed result | Baseline or target and source | Evidence or artifact |
| --- | --- | --- | --- | --- |
| <scenario and conditions above> | <metric, unit> | <value and variability> | <comparable value and source, or not available> | <redacted evidence reference> |
