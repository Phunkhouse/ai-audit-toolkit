# Legal readiness report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Insert after `Findings`. In Planning, the planning table replaces launch-verdict framing; omit empty severity counts and release-blocker sections.

**Additional finding fields.** For legal readiness findings, include the exact source/provision and relevant legal dates, applicability reasoning and exceptions, project evidence, verification status and focused corrective action or interpretation question. Use `references/legal-review.md` to distinguish applicability from fulfillment and authority guidance from binding rules. Preserve the normal finding status for evidence strength; a confirmed technical fact is not by itself a confirmed legal violation. Missing sources or unsettled classification cannot become a confirmed legal gap.

## Legal readiness assessment

For legal reviews, state the mode (`Planning` or `Pre-launch`), specification/revision reviewed, and model/reasoning setting when reliably known (otherwise `Not verified`). Record any model limitation. In Planning, replace launch-verdict framing with planning decisions, omit empty severity counts and release-blocker sections, and use the planning table below. The shared fulfillment statuses below apply to inspected implementation; use `Not yet assessed` for future fulfillment in Planning. Retain the same source and applicability evidence in both modes.

### Planning requirements and decisions (Planning only)

| LEG-ID | Planned facts and applicability reasoning | Source IDs and exact provisions; duty or recommendation | Implementation requirement or decision | Observable acceptance check | Unresolved facts and re-review trigger |
| --- | --- | --- | --- | --- | --- |
| <ID> | <settled choice, conditional option or unknown; applicable scope and exceptions> | <verified rule or explicit uncertainty; statutory, contractual or optional> | <focused action or decision> | <future test, walkthrough or evidence; fulfillment not yet assessed> | <missing input and material change requiring reassessment> |

Do not equate this table with completed implementation, publishable legal documents or legal clearance. In Pre-launch, reconcile each earlier requirement using its existing ID and actual evidence; reverify the sources and assumptions.

Establish operator, jurisdictions/markets, audience/contract model and the review and target launch dates. Separate observed facts, operator statements, assumptions and missing inputs. List excluded markets/topics and which conclusions they limit. Do not issue an overall compliance score or unrestricted legal clearance.

### Primary-source register

Retrieve and read the actual source; an entry-point URL alone is not verification. Distinguish legislation, judgments/decisions, authority guidance/recommendations, agreed contracts and exact licenses. Record the version and operative provision, effective and applicability dates, retrieval date and access/currency limitations.

| Source ID | Issuer and source type | Document, version and exact provision/clause | Effective/applicable dates | Official URL, retrieval date and verification limits |
| --- | --- | --- | --- | --- |
| <ID> | <issuer; binding rule, guidance, contract or license> | <text actually checked, or unavailable> | <dates and transition notes> | <source and access status> |

### Applicability and verification

Use `Applies`, `Does not apply` or `Undetermined` for applicability, with facts, exceptions and source references. Use `Supported`, `Gap`, `Not verified` or `Needs interpretation` for verification; a justified `Does not apply` uses a dash instead. `Supported` covers only the specific inspected obligation. A `Gap` requires a verified applicable rule and project evidence; an interpretation question is not a confirmed violation.

| Candidate obligation and source IDs | Applicability and reasoning | Verification | Project evidence and limits | Finding ID or focused next step |
| --- | --- | --- | --- | --- |
| <requirement and exact provision> | <status, relevant facts and exception reasoning> | <status or dash> | <code, UI, document, process or missing evidence> | <LEG-ID, evidence request or interpretation question> |

### Prioritized launch actions and unresolved questions

For each active finding, connect source -> applicability -> evidence -> action -> verification. Keep statutory duties, contractual duties and recommendations distinct. The generic `Confirmed`/`Suspected` status describes supported facts, not certification of legal compliance. Identify the exact question and missing facts for any material interpretation issue, and obtain focused clarification where needed rather than a blanket referral for every routine item.

| Finding or question | Launch impact and priority | Smallest justified action or clarification | Required evidence and verification |
| --- | --- | --- | --- |
| <LEG-ID or unresolved question> | <impact, confidence and dependent conclusions> | <action, precise question and owner if known> | <source/fact needed and follow-up check> |
