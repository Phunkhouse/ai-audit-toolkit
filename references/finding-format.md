# Report format

## Header

- Project, date, and audit scope.
- Audited project commit and toolkit commit; describe uncommitted changes if they affect the scope.
- Evidence sources and access limitations.
- Previous audit report path and date, if this is a repeat audit.

## Finding

```markdown
### SEC-001: Short description of the issue

- Severity: Critical | High | Medium | Low
- Confidence: High | Medium | Low
- Status: Confirmed | Suspected
- Previous finding: ID and report path, if previously reported
- Location: `path/to/file:line` (or a line range)
- Evidence: Specific relevant behavior, test, or configuration.
- Impact: Realistic scenario and its conditions.
- Remediation: Smallest meaningful fix.
- Verification: How to confirm the fix or disprove the suspicion.
```

Use `SEC-`, `COR-` or `PRD-` for security, correctness or production findings, respectively. For a repeat audit, reuse the prior ID for the same still-open or regressed issue. Assign the next number not used in any previous report of that audit type to a new issue; start at `001` only for the first audit. Order findings by severity and impact. Do not repeat the same root cause in multiple findings. Redact sensitive values. If a check has no file and line (for example, missing operational configuration), name the precise artifact or access boundary and explain why a line reference is unavailable.

## Conclusion

Separate confirmed release blockers, other findings, and `Not verified` areas. Record coverage and skipped areas. For repeat audits, reconcile prior findings as fixed, still open, regressed or not verified, with evidence. For checks without findings, describe what was actually examined; do not claim the audit was exhaustive.
