---
name: audit-correctness
description: Audit a software project's behavior, data integrity and edge cases against its intended workflows without changing application code. Use for a requested logic or correctness review.
---

# Correctness audit

Find material bugs that can cause wrong results, lost data or broken user workflows. Keep the audit read-only; do not modify application code or data.

## Method

1. Learn the intended behavior from code, tests, product documentation and, if present, `docs/audits/context.md`. Confirm that documented assumptions still match the current implementation.
2. Identify critical flows and their invariants: inputs, state transitions, validation, persistence, concurrency, retries, failure recovery and boundaries with external services.
3. Inspect representative paths end to end, including error and edge cases. Use existing tests or safe local reproduction where it clarifies behavior. Do not infer a bug solely from missing tests.
4. Read applicable files in `../../profiles/` for stack-specific questions. Investigate only applicable areas.
5. Distinguish an observed defect from a hypothetical risk; state assumptions when intended behavior is ambiguous.

## Output

Use `../../references/finding-format.md`, `../../references/severity.md` and `../../references/audit-rules.md` when available. If unavailable, each finding still needs severity, confidence, status, file and line, evidence, user or data impact, smallest viable fix and verification. Mark unknown requirements or inaccessible paths `Not verified`. End with a concise summary of release blockers and include the audited project commit and toolkit commit (or `uncommitted`). Redact sensitive data.
