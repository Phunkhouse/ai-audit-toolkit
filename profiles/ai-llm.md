# AI and LLM application profile

Use only when the audited application calls language models or gives agents tools. Apply each check to the actual data flow and permissions.

- Trace untrusted content into prompts and model responses. Check whether prompt injection can influence privileged instructions or tool use across a trust boundary.
- Trace model output into tools, queries, file paths, API calls and the DOM. Check validation and authorization before effects occur.
- Check that model API keys and other credentials stay server-side and are not exposed in bundles, logs or responses.
- Review agent tool permissions, approval boundaries, tenant isolation and limits on side effects.
- Check cost abuse controls: authentication, rate limits, quotas, token budgets and safeguards against unbounded retries or loops.
- Distinguish demonstrated exploits from hypothetical prompt injection patterns. Record the attacker-controlled input, reachable path, missing control and realistic impact.

## Performance checks

- Measure or inspect model call counts, context and output token counts, retries, time to first token and total latency for critical operations.
- Identify duplicate requests, unnecessary sequential calls and repeated context processing. Evaluate caching, batching or concurrency only where permissions, freshness and workflow dependencies allow them.
- Assess cost per successfully completed operation with model, pricing source and date, token usage and output quality requirements recorded. Do not claim that a faster or cheaper alternative preserves quality without evidence.

## Architecture checks

- Map orchestration, prompt and retrieval policy, provider integration and tool execution responsibilities. Trace where application invariants and permission boundaries are enforced independently of model output.
- Assess provider and tool contracts, state ownership and evaluation boundaries against documented change or quality requirements. Do not propose a provider abstraction or agent framework solely for hypothetical future flexibility.
