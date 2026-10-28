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

Use `SEC-`, `COR-`, `PRD-`, `PERF-`, `ARC-` or `WEB-` for security, correctness, production, performance, architecture or web quality findings, respectively. For a repeat audit, reuse the prior ID for the same still-open or regressed issue. Assign the next number not used in any previous report of that audit type to a new issue; start at `001` only for the first audit. Order findings by severity and impact. Do not repeat the same root cause in multiple findings. Redact sensitive values. If a check has no file and line (for example, missing operational configuration), name the precise artifact or access boundary and explain why a line reference is unavailable.

For performance findings, state whether evidence is measured, code-proven or a hypothesis, and separate observed behavior from unverified runtime impact. Use the conditions and comparison guidance in `performance-measurement.md` when interpreting measurements. Reuse or cross-reference evidence from other audit types rather than presenting the same root cause as independent findings.

For architecture findings, connect structural evidence to an affected requirement or concrete change scenario. Include known decision context, counter-evidence, and the smallest useful remediation with migration steps, risks and verification. Use `architecture-review.md` to distinguish a defect from an accepted tradeoff or an unverified assumption. Explain release-blocking impact separately from improvement priority, and cross-reference overlapping findings from other audit types.

For web quality findings, identify the page, state and device profile, tool audit identifier or manual reproduction steps, and the affected element or source location. Record the final page reached and relevant run conditions. Use `web-quality-review.md` to interpret automated scores, manual coverage and intentional indexing behavior. Cross-reference existing findings for shared root causes; failed, skipped or inaccessible scans are never passing checks.

## Conclusion

Separate confirmed release blockers, other findings, and `Not verified` areas. Record coverage and skipped areas. For repeat audits, reconcile prior findings as fixed, still open, regressed or not verified, with evidence. For checks without findings, describe what was actually examined; do not claim the audit was exhaustive.
