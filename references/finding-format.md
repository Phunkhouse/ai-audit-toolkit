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

Use `SEC-`, `COR-`, `PRD-`, `PERF-`, `ARC-`, `WEB-`, `SCE-`, `LEG-` or `TCI-` for security, correctness, production, performance, architecture, web quality, scalability and cost, legal readiness or test/CI efficiency findings, respectively. For a repeat audit, reuse the prior ID for the same still-open or regressed issue. Assign the next number not used in any previous report of that audit type to a new issue; start at `001` only for the first audit. Order findings by severity and impact. Do not repeat the same root cause in multiple findings. Redact sensitive values. If a check has no file and line (for example, missing operational configuration), name the precise artifact or access boundary and explain why a line reference is unavailable.

For performance findings, state whether evidence is measured, code-proven or a hypothesis, and separate observed behavior from unverified runtime impact. Use the conditions and comparison guidance in `performance-measurement.md` when interpreting measurements. Reuse or cross-reference evidence from other audit types rather than presenting the same root cause as independent findings.

For architecture findings, connect structural evidence to an affected requirement or concrete change scenario. Include known decision context, counter-evidence, and the smallest useful remediation with migration steps, risks and verification. Use `architecture-review.md` to distinguish a defect from an accepted tradeoff or an unverified assumption. Explain release-blocking impact separately from improvement priority, and cross-reference overlapping findings from other audit types.

For web quality findings, identify the page, state and device profile, tool audit identifier or manual reproduction steps, and the affected element or source location. Record the final page reached and relevant run conditions. Use `web-quality-review.md` to interpret automated scores, manual coverage and intentional indexing behavior. Cross-reference existing findings for shared root causes; failed, skipped or inaccessible scans are never passing checks.

For scalability and cost findings, record the affected current or growth scenario, observation and forecast windows, equations and assumptions, dated pricing/limits/terms sources, and estimated impact with confidence. Use `scalability-cost-review.md` to compare keeping the setup with relevant alternatives and include effort, migration risks and a measurable action trigger with its window, source and lead time. Keep conditional growth risks separate from established current failures and cross-reference overlapping findings.

For legal readiness findings, include the exact source/provision and relevant legal dates, applicability reasoning and exceptions, project evidence, verification status and focused corrective action or interpretation question. Use `legal-review.md` to distinguish applicability from fulfillment and authority guidance from binding rules. Preserve the normal finding status for evidence strength; a confirmed technical fact is not by itself a confirmed legal violation. Missing sources or unsettled classification cannot become a confirmed legal gap.

For test/CI findings, label measured results, code-proven mechanisms, conditional estimates and hypotheses separately. Include the protected risk, affected suite/job/gate, relevant revision/event/run conditions and counter-evidence. State expected benefit independently for feedback, compute/cost, reliability and maintenance, plus confidence, coverage/security risk, effort, validation and rollback. Quantified savings need comparable measurements or explicit equations and assumptions; a proven mechanism alone does not establish its runtime cost. Use `test-ci-review.md` and keep optimization priority separate from severity or release-blocking impact. Link backlog rows to findings and cross-reference shared causes from other audits.

For numeric test/CI results, identify CI versus a named local environment versus an estimate, interval boundaries, effective workers/resources, cold/warm state and selected/skipped coverage. State attribution limits and the optimization objective. Preserve earlier evidence when a changed objective or later measurements revise a recommendation; implemented code and verified CI behavior are separate claims.

For resource-efficiency findings across scalability/cost, performance, production and correctness, identify the producer, environment/revision, frequency, cache/change contract and affected requirement. Use `resource-efficiency.md` to distinguish no-visitor work, overlapping active time, amplified calls, rows and actual transfer. Quantified monthly/quota impact needs explicit inputs, units, horizon, dated service/account evidence and confidence; missing inputs stay unverified. Record the smallest fix, correctness/freshness constraints, the optimization's own work, monitoring trigger and isolated verification. Keep the current audit's ID sequence and cross-reference shared causes. Correctness-only findings need behavioral evidence, not a compulsory cost forecast.

## Conclusion

Separate confirmed release blockers, other findings, and `Not verified` areas. Record coverage and skipped areas. For repeat audits, reconcile prior findings as fixed, still open, regressed or not verified, with evidence. For checks without findings, describe what was actually examined; do not claim the audit was exhaustive.
