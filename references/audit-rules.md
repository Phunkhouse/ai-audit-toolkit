# Shared audit rules

1. Before drawing conclusions, map the project's scope, relevant documentation, dependencies, data flows, and actual stack. Check project context against the code and flag outdated context.
2. Review only areas that apply to the project. Profiles are inspection aids, not evidence of a problem.
3. Ground findings in specific code, configuration, reproduction, or tests. Distinguish confirmed issues, suspected risks, and unverified areas.
4. Set severity from impact and conditions in this project; confidence reflects the strength of the evidence. Use `severity.md` and `finding-format.md`.
5. Audits are read-only. Do not change source code, infrastructure, or data, and do not run destructive, intrusive, or production tests. Run safe local tests only when they materially help verify a conclusion.
6. Do not disclose secrets, personal information, or sensitive production output. Include only essential redacted excerpts in reports.
7. If you cannot access a required system or its state, write `Not verified` and a concrete next step. The absence of a finding does not mean `Passed`.
