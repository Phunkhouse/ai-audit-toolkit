---
name: audit-security
description: Audit a software project for evidence-based security vulnerabilities and meaningful risks without changing application code. Use for a requested security review or pre-release security audit.
---

# Security audit

Identify exploitable vulnerabilities and meaningful security risks in the current project. This is a read-only audit: do not modify application code, infrastructure or data, and do not run intrusive tests.

## Method

1. Map the repository, dependencies, deployment artifacts and project documentation. Identify sensitive data, trust boundaries and exposed entry points.
2. Select only applicable checks: authentication, authorization, tenant isolation, input handling and injection, data exposure, business logic abuse, dependencies and deployment configuration.
3. Trace each potential issue from entry point through the protection boundary to the impact. Verify the actual reachable path and relevant mitigations before reporting it.
4. Read `../../profiles/` files matching the detected stack. Use them as prompts for inspection, not as evidence. If available, use project-specific `docs/audits/context.md`, but check it against the current code.
5. Run only safe local checks that materially clarify a finding. Record commands and outcomes. Do not claim a dependency vulnerability from a version alone without verifying applicability and a trustworthy advisory.

## Output

Use `../../references/finding-format.md`, `../../references/severity.md` and `../../references/audit-rules.md` when available. If they are unavailable, still report each finding with severity, confidence, status, file and line, evidence, realistic exploitation conditions, remediation and a verification step. Separate confirmed issues from suspected risks. Mark inaccessible areas `Not verified`, never `Passed`. Summarize release-blocking risks and include the audited project commit and toolkit commit (or `uncommitted`). Do not expose secrets or sensitive data in the report.
