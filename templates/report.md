# <Audit type> audit: <project>

- Date: YYYY-MM-DD
- Scope: <repository, components, environment and release>
- Audited project commit: <SHA or uncommitted>
- Toolkit commit: <SHA, uncommitted or unknown provenance>
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

Number IDs as described in `references/audit-rules.md`. Use the fields in `references/finding-format.md` plus any additional fields from this audit's section file.

### <PREFIX>-001: <Short description>

- Severity: Critical | High | Medium | Low
- Confidence: High | Medium | Low
- Status: Confirmed | Suspected
- Priority: Now | Next | Later (performance, architecture, code cleanup and test/CI only)
- Previous finding: <ID and report path, or none>
- Location: `<path:line or exact artifact>`
- Evidence: <specific behavior or result; include what was checked to disprove it; for performance, label it measured, code-proven or a hypothesis>
- Impact: <realistic scenario and conditions>
- Remediation: <smallest meaningful fix>
- Verification: <how to confirm the fix>

## Audit-specific sections

Insert the sections from this audit's file in `templates/sections/`, if it has one, at the position that file names. Omit sections that do not apply.

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

## Remediation log

Leave the findings above as audited. When a later change fixes, mitigates or accepts a finding, add a row here in that change rather than editing the finding's fields. A repeat audit verifies each row against the current code before reporting the finding as fixed.

| Finding | Status (fixed in code, mitigated, accepted, deferred) | Change and date | Notes |
| --- | --- | --- | --- |
| <ID> | <status> | <PR or commit, date> | <what changed and how it was verified> |
