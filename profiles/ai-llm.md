# AI and LLM application profile

Use only when the audited application calls language models or gives agents tools. Apply each check to the actual data flow and permissions.

- Trace untrusted content into prompts and model responses. Check whether prompt injection can influence privileged instructions or tool use across a trust boundary.
- Trace model output into tools, queries, file paths, API calls and the DOM. Check validation and authorization before effects occur.
- Check that model API keys and other credentials stay server-side and are not exposed in bundles, logs or responses.
- Review agent tool permissions, approval boundaries, tenant isolation and limits on side effects.
- Check cost abuse controls: authentication, rate limits, quotas, token budgets and safeguards against unbounded retries or loops.
- Distinguish demonstrated exploits from hypothetical prompt injection patterns. Record the attacker-controlled input, reachable path, missing control and realistic impact.
