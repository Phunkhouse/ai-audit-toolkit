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

## Findings

Use `SEC-001`, `COR-001` or `PRD-001` according to the audit type for a first audit. In repeat audits, preserve a prior ID for the same issue and use the next number not previously assigned for each new issue. For every finding, use the fields in `references/finding-format.md`.

### <PREFIX>-001: <Short description>

- Severity: Critical | High | Medium | Low
- Confidence: High | Medium | Low
- Status: Confirmed | Suspected
- Previous finding: <ID and report path, or none>
- Location: `<path:line or exact artifact>`
- Evidence: <specific behavior or result; include what was checked to disprove it>
- Impact: <realistic scenario and conditions>
- Remediation: <smallest meaningful fix>
- Verification: <how to confirm the fix>

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
