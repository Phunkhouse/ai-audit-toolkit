# Report format

## Header

- Project, date, and audit scope.
- Audited project commit and toolkit commit; describe uncommitted changes if they affect the scope.
- Evidence sources and access limitations.

## Finding

```markdown
### F-001: Short description of the issue

- Severity: High | Medium | Low | Critical
- Confidence: High | Medium | Low
- Status: Confirmed | Suspected
- Location: `path/to/file:line` (or a line range)
- Evidence: Specific relevant behavior, test, or configuration.
- Impact: Realistic scenario and its conditions.
- Remediation: Smallest meaningful fix.
- Verification: How to confirm the fix or disprove the suspicion.
```

Order findings by severity and impact. Do not repeat the same root cause in multiple findings. Redact sensitive values. If a check has no file and line (for example, missing operational configuration), name the precise artifact or access boundary and explain why a line reference is unavailable.

## Conclusion

Separate confirmed release blockers, other findings, and `Not verified` areas. For checks without findings, describe what was actually examined; do not claim the audit was exhaustive.
