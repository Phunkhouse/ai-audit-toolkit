# Infrastructure profile

Use for deployment, CI/CD, hosting, networks, and external services when they are in audit scope.

- Review environment separation, secret management, and access permissions in the available configuration.
- Check migration order, rollback, health checks, and the procedure for failed deployments.
- Review logs, metrics, alerts, and oversight of critical operations using available artifacts.
- Review CI workflow permissions, dependency lockfiles and artifact integrity, and whether third-party CI actions are pinned appropriately.
- If Git history is in scope, look for committed secrets using a read-only history scan (for example, `gitleaks` if installed). Do not print secret values in the report; record redacted evidence and whether history was scanned.
- Assess limits, timeouts, retries, and behavior when key dependencies fail.
- Mark the live state of hosting, backups, and the production database `Not verified` if you cannot access them.

## Performance checks

- Correlate latency and successful throughput with CPU, memory, I/O, network limits and resource saturation. Separate cold starts from steady-state behavior.
- For jobs and queues, inspect processing time, waiting time, backlog growth and retry amplification at the expected arrival rate.
- Relate scaling limits and resource cost to the workload; do not infer production capacity from an unrepresentative local run.

## Architecture checks

- Verify deployment and failure boundaries using available configuration. Do not infer operational independence from source packages or service names.
- Trace coordinated release requirements and shared infrastructure dependencies against the project's actual rollout and isolation needs; record inaccessible runtime topology as unverified.

## Scalability and cost checks

- Verify account-level versus project-level quotas, resets, spend controls, commercial eligibility and behavior after limits using current official sources and available account evidence.
- Include self-hosted hardware, power, network, maintenance and recovery constraints. Review monitoring, backup/restore evidence and single points of failure against requirements before proposing redundancy or migration.
- Compare keeping the setup, small optimizations, eligible plan changes and relevant alternatives over the same horizon, including transition costs and exit risks.
