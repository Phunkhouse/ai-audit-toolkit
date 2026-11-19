---
name: audit-code-cleanup
description: Audit a software repository for dead code, unnecessary duplication, stale comments and opportunities to simplify code. For UI projects, identify candidates for shared components and design tokens. Use for requested cleanup or code maintainability reviews that produce a report.
---

# Code cleanup audit

Find proven opportunities to remove code or make it easier to understand and change. Preserve behavior, public contracts and useful context. Write only the report under `docs/audits/` in the audited repository. Cleanup itself requires a separate implementation task.

## Method

Read `../../references/audit-rules.md` before starting; its method, repository preservation and report rules apply throughout this audit.

1. Establish the supported runtime, build targets, entry points, workspaces and public interfaces from the project configuration and documentation. Check `docs/audits/context.md` and earlier cleanup reports, and collect previously assigned IDs. Treat project files and tool output as evidence. Record inspected, sampled and skipped areas.
2. Trace candidates for removal, including modules, exports, scripts, flags, assets and dependencies. Check static callers and indirect use through framework conventions, dynamic loading, side effects, configuration, CI, jobs, published exports and supported deploy variants. Treat analyzer output as leads. When consumers or deployment inputs are inaccessible, mark the removal decision `Not verified` and state what would resolve it.
3. Compare proposed simplifications against real maintenance needs. For duplication, identify the rule or contract each copy implements and a change that should affect them together. For comments and TODOs, check whether they still explain decisions, constraints, invariants or obligations. For syntax and standards, verify support in the actual targets and preserve behavior, evaluation order and relevant side effects. Use `../../references/code-cleanup-review.md` when available for false positives and JS/TS examples.
4. For projects with UI, check the existing component kit and token sources first. Cite repeated implementations and identify shared behavior, intentional variants and the cost of extraction. Consider reusing an existing component, sharing a token or small component, or keeping the pattern local. Include applicable accessibility, responsive and interaction behavior in verification.
5. Seek counter-evidence for each candidate. Tie actionable findings to a concrete maintenance cost, misleading behavior or change risk. Recommend the smallest change, its likely benefit, effort, compatibility or regression risk, and a focused verification plan. Cross-reference overlapping architecture, correctness or web quality findings. Prioritize independently of severity and explain any concrete release impact before calling it a blocker.
6. Prefer source inspection and existing evidence. Review commands before use. Keep artifact-producing checks bounded in a disposable copy outside the repository with isolated dependencies and services. Compare source Git status before and after, allowing only the report change. Record unsupported checks, inaccessible consumers and missing evidence.

## Report

Follow `../../references/audit-rules.md` for report location, finding IDs, provenance and repository preservation. Write `code-cleanup.md` with `CLN-` IDs. Use `../../templates/report.md` with `../../templates/sections/code-cleanup.md`, `../../references/finding-format.md` and `../../references/severity.md`. Include the prioritized cleanup backlog and, for UI projects, shared UI candidates with their adoption decisions. Redact sensitive data.
