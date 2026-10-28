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

Use `SEC-001`, `COR-001`, `PRD-001`, `PERF-001`, `ARC-001` or `WEB-001` according to the audit type for a first audit. In repeat audits, preserve a prior ID for the same issue and use the next number not previously assigned for each new issue. For every finding, use the fields in `references/finding-format.md`.

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

## Web quality results (optional)

Include this section for web quality audits; omit it for other audits unless useful. Record the environment and build, tool and browser versions, resolved viewport/emulation/throttling settings, locale, cache/storage state, commands and run budget. Confirm the actual final page and authentication role without exposing credentials or sensitive URLs. Keep raw browser profiles and JSON/HTML reports outside the repository; include essential redacted evidence here.

| Page and state | Device profile and run count | Applicable category scores or unavailable reason | Manual checks completed | Evidence and limitations |
| --- | --- | --- | --- | --- |
| <route, role and observed final page> | <profile, count> | <per-run results or summary and variability> | <checks actually completed> | <redacted evidence and gaps> |

Use the performance measurement section for relevant numeric metrics and comparable baselines. Identify intentional SEO exclusions and skipped categories explicitly. Category scores alone do not prove accessibility conformance, security, search visibility or real-user performance.

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
