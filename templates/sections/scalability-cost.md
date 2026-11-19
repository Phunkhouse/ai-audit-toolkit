# Scalability and cost report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Insert after `Findings`. Add the [resource efficiency sections](resource-efficiency.md) when relevant.

**Additional finding fields.** For scalability and cost findings, record the affected current or growth scenario, observation and forecast windows, equations and assumptions, dated pricing/limits/terms sources, and estimated impact with confidence. Use `references/scalability-cost-review.md` to compare keeping the setup with relevant alternatives and include effort, migration risks and a measurable action trigger with its window, source and lead time. Keep conditional growth risks separate from established current failures and cross-reference overlapping findings.

## Scalability and cost assessment

State the mode (`Planning` or `Audit`) and specification/revision reviewed. In Planning, keep this section short and adapt the scenario table to expected initial operation and a relevant peak; add 10x/100x only when decision-relevant. Replace observed-usage cells with explicit assumptions or `Not verified`, never invented measurements. Include the proposed minimal setup, monitoring, justified action triggers and missing inputs; omit empty severity/release-blocker sections. Planning decisions are not verified capacity. Audit reconciles earlier planning requirements and triggers using continuing `SCE-` IDs and real evidence.

Separate observed usage from estimates and unverified inputs. Record budget, currency, observation period, forecast horizon and any tax or currency-conversion assumptions. Never use zero as a substitute for missing usage or billing evidence.

### Resource, quota and terms register

Use a row per material billed dimension or restriction. Record actual product/plan, region, account/project scope, shared allowances, units and reset windows. Include prices, billing-unit rounding, fixed fees, promotional expiry and applicable commercial or operational restrictions. Distinguish public documentation from verified account settings.

| Resource and dimension | Observed usage and window | Quota, price or applicable restriction | Behavior at limit and controls | Source URL, verification date and uncertainty |
| --- | --- | --- | --- | --- |
| <resource, plan, region, scope> | <usage and source, or not verified> | <units, currency, period and terms> | <stop, throttle, charge or plan change> | <official source and account evidence limits> |

### Current, 10x and 100x scenarios

Define workload drivers, fixed inputs, bursts, retention and horizon for each scenario. Show equations and input sources, using actual rate schedules and allowance scopes. If a plan cannot support a scenario, label it infeasible and price any eligible alternative separately. Estimates are not measured capacity or load-test results.

| Scenario | Workload assumptions and model | First constraint and resulting behavior | Cost range and currency | Confidence and missing evidence |
| --- | --- | --- | --- | --- |
| Current | <observed inputs and window> | <limit/headroom or unknown> | <observed or estimated, with basis> | <evidence strength> |
| 10x | <drivers, horizon and equations> | <first limit and behavior> | <range, or not verified> | <assumptions and gaps> |
| 100x | <drivers, horizon and equations> | <first limit and behavior> | <range, or not verified> | <assumptions and gaps> |

### Prioritized decisions and triggers

Always assess keeping the current setup. Compare only relevant optimizations, eligible plan changes or migrations. Include current risks and future action horizons separately from finding severity. Account for cash cost, operator effort, one-time transition costs and reliability/security tradeoffs; mark unpriced effort explicitly.

| Option or finding ID | Priority and decision now | Expected impact, effort and risks | Measurable trigger, window, source and preparation lead time | Next action and verification |
| --- | --- | --- | --- | --- |
| Keep current setup | <adequate, conditional or insufficient with evidence> | <cost and requirement assessment> | <revisit condition> | <measurement or review step> |
| <optimization, plan change or migration> | <act now, prepare or defer and why> | <estimated impact with assumptions and uncertainty> | <signal, justified threshold and window> | <concrete action, owner if known, and validation> |
