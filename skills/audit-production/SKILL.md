---
name: audit-production
description: Assess a software project's release and operational readiness from available code, configuration and evidence without changing systems. Use for a pre-release or production-readiness audit.
---

# Production readiness audit

Assess whether the current project can be deployed and operated reliably. This is a read-only review: do not change application code, deployment settings or live data.

## Method

1. Establish the target environment, release scope and critical user journeys from the repository and available project context.
2. Inspect build and deployment configuration, environment variables and secrets handling, migrations, rollback, health checks, monitoring, failure behavior, backup and restore evidence, and operational documentation where relevant.
3. Read applicable `../../profiles/` files. Use actual infrastructure and runtime evidence, not a generic checklist, to support conclusions.
4. Run safe local build or test commands only when useful and feasible. State exactly what they prove and what remains untested.
5. For hosting, production database, alerting, backups or other external systems you cannot inspect, report `Not verified` with the missing evidence and how to obtain it. Never turn absent evidence into `Passed`.

## Output

Use `../../references/finding-format.md`, `../../references/severity.md` and `../../references/audit-rules.md` when available. If unavailable, report each issue with severity, confidence, status, exact artifact or file and line, evidence, operational impact, remediation and verification. Separate confirmed release blockers from unverified readiness areas. Include the audited project commit and toolkit commit (or `uncommitted`); omit secrets and sensitive production data.
