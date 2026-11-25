# Availability and abuse resistance

Use this method to find ways an outside party can make a service unavailable, slow or expensive: application-level denial of service, automated abuse of public flows, cost or quota exhaustion ("denial of wallet"), and gaps in edge protection. It is a static review of code, configuration and existing evidence.

**Never test availability against a live system.** Do not run load, flood, fuzzing or slow-connection tests, or send requests meant to exhaust a resource, on production, staging, shared previews or third-party services. A bounded local reproduction in the disposable copy, against isolated services, is enough to confirm a mechanism, for example timing one crafted regex input or showing that a body limit is not enforced. Record its inputs and limits.

## Map the exposure first

List every entry point with who can reach it: anonymous, any signed-in user, a privileged role, a webhook sender or an internal caller. Include pages, API routes, server actions, form handlers, file uploads, webhooks, health and diagnostic routes, WebSockets and background triggers that a request can start. Note the deployment model: one process, autoscaled instances, serverless functions or a managed platform. The same flaw can stall a single process, multiply cost across instances, or exhaust a shared quota.

For each, ask what the cheapest request that crashes, stalls or bills the service looks like. Rank by reach and cost: an anonymous endpoint that does expensive or paid work matters more than an admin-only one. Authentication is a mitigation, not a full defense; an account is often cheap to obtain.

## Request and input limits

- **Body and upload size.** Check that limits are enforced before reading or buffering the whole body, and that reading stops when the limit is hit. Include multipart uploads, decompression (zip or gzip bombs) and image or document processing.
- **Parsing.** Look for deeply nested JSON or XML, entity expansion, unbounded arrays, and parsers run on attacker-chosen formats.
- **Expensive patterns.** Look for regular expressions with nested or overlapping quantifiers applied to request data, and for regexes built from user input. Also check sorting, hashing or diffing of large inputs, and per-item work with no item cap. Confirm a suspected ReDoS with one bounded local timing, not with production traffic.
- **Unbounded queries.** Look for page sizes, `limit` or date ranges taken from the request without a maximum, search or export over a whole tenant, and N+1 work multiplied by caller-chosen counts.
- **Timeouts.** Check for request, database and outbound-call timeouts. Missing timeouts let slow upstreams or slow clients hold connections, workers or database pool slots.

Check whether a framework, proxy or platform already enforces a limit before reporting its absence. Name the layer and, if the configuration lives outside the repository, mark it `Not verified`.

## Rate limiting and automated abuse

- **Coverage.** Identify which flows need limits: sign-in, sign-up, password reset, one-time codes, invitations, contact and comment forms, search and other expensive reads, and anything that sends messages or calls paid APIs. A missing limit matters where repetition causes harm, such as credential guessing, enumeration, spam or cost. It does not matter on every route.
- **Key.** Check what a limit is keyed on and whether the caller controls it. Client-supplied headers such as `X-Forwarded-For` are trustworthy only in the position a trusted proxy writes. Also check per-account versus per-IP limits, and shared buckets that let one abuser lock out everyone, including legitimate owners.
- **Scope.** Per-process counters do not limit across instances or survive restarts. Check whether that matters for the actual deployment; an accepted decision for a single instance is a tradeoff, not a finding.
- **Bot defenses.** For public forms, check whatever challenge, proof of work, honeypot or timing barrier exists, and whether the server actually verifies it.

## Cost and quota exhaustion

Trace cheap requests to paid or capped work: e-mail and SMS sends, model or other third-party API calls, serverless invocations and duration, egress, storage writes and database compute. Identify the multiplier, for example one request causing many sends or retries, and the cap, such as a per-user budget, a global quota, a provider spend limit or none. Check what happens at the provider limit: rejection, throttling, suspension of the whole account, or automatic charges. Reuse the scalability/cost and resource-efficiency evidence for pricing and quotas rather than re-deriving it. A quota shared with other projects or environments raises impact.

## Crash paths

One request that ends the process is a denial of service for everyone it serves. Trace error handling on each untrusted path:
- stream and event-emitter `error` events without a listener, such as a read stream on a missing file or a directory;
- promise rejections and exceptions thrown outside the request handler's catch, in callbacks, timers or piped streams;
- `process.exit`, assertions or panics reachable from input;
- inputs the code does not expect: empty, missing, wrong type, the default value, very large or deeply nested.

Check how the process is supervised (restart policy, other replicas) to judge impact, but a restart does not make a request-triggered crash acceptable.

## Concurrency and resource exhaustion

Look for work that holds a scarce resource per request: database connections, locks, worker threads, file handles, memory caches without size bounds, and unbounded in-memory maps keyed by request data (rate-limit tables, sessions, idempotency keys). In single-threaded runtimes such as Node.js, any synchronous CPU-heavy step blocks every other request. Check retry loops and background queues that a request can grow without bound.

## Edge and network protection

Volumetric DDoS protection normally lives at the hosting provider, CDN or WAF, outside the repository. Record what the evidence shows:
- whether a protective edge is configured;
- whether the origin can be reached directly around it;
- whether rules or limits exist at the edge;
- what the platform provides by default, from its current official documentation.

If none of this is accessible, list it under `Not verified` with the evidence needed, such as provider settings or an origin firewall rule. Do not report "no DDoS protection" from the repository alone.

## Findings

Each finding names the entry point and who can reach it, the resource that runs out (CPU, memory, connections, quota, money or another user's access), the amplification and the existing limits, and the realistic effect on the deployed system. Separate a confirmed mechanism from its unmeasured production magnitude. Severity follows the impact: a single request that stalls a single-process service, or an anonymous path to an account-wide quota suspension, can be High. A missing limit on a low-value authenticated route is usually Low. Remediation should name the cheapest effective layer (a framework limit, an edge rule, a per-account budget, a timeout or a bounded query) and how to verify it without load-testing production.
