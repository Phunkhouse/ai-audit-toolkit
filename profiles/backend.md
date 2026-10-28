# Backend profile

Use for APIs, server actions, jobs, and other server-side logic.

- Check authentication and authorization at every relevant entry point, including tenant isolation and service roles.
- Trace input into queries, shells, files, URLs, templates, and serialization.
- Review idempotency, concurrency, retries, timeouts, and transaction boundaries for critical operations.
- Review error responses, logging, rate limiting, and handling of external services according to the system's exposure.
- Where applicable, check CSRF defenses, SSRF protections, file upload handling, webhook signature verification, and session or cookie security flags.
- For production readiness, check readiness, health checks, and behavior when dependencies fail, where evidence is available.

## Performance checks

- Trace critical requests for redundant computation, repeated external calls, unnecessary sequential work, blocking operations and oversized responses. Verify whether apparent dependencies actually allow parallel execution.
- Inspect bounded pagination, streaming or batching where response size grows with data, and connection pools or other concurrency limits under the stated load.
- Assess caching only where repeated work and safe reuse are demonstrated; account for invalidation, user isolation and freshness requirements.
