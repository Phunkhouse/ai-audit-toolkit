# Legal readiness review

Use this method to reduce routine launch work for small websites, applications and SaaS projects. Findings connect a verified source to established project facts. The review supports practical decisions within an explicit scope; it does not certify all legal obligations or guarantee that no professional interpretation will be needed.

## Establish facts before selecting obligations

### Planning and pre-launch evidence

In Planning, use the specification and proposed data flows, markets and suppliers as conditional inputs. Distinguish settled decisions from options and unanswered questions. Apply the same primary-source discipline as a launch audit, but do not treat a control that has not been built yet as an observed violation. Use `Not yet assessed` for future fulfillment; missing facts or unreadable sources remain `Not verified`. Describe any supported conflict in the proposed design as a planning risk. Assess applicable dates against the intended launch date and flag any future source checks needed.

Translate relevant obligations into implementation requirements, product decisions and observable acceptance checks, with source IDs and unresolved assumptions. Use finding severity only for supported design risks, not for every planned task. A planning report cannot establish actual launch readiness. In Pre-launch, reconcile these requirements against actual behavior and operational evidence, rechecking sources, changed assumptions and applicability.

Read code, configuration and project documents, then ask only for material missing facts. Record evidence and distinguish operator statements from independently observed behavior. Essential inputs include:

- Operator identity and establishment, target markets and launch/review date; business/consumer users and any relevant age or sector restrictions.
- Product and contract model, paid/free access, subscriptions, advertising or use of data beyond providing the service.
- Actual personal-data flows and purposes, tracking/storage technologies, message types, retention and deletion processes, suppliers and international access or transfers.
- Available agreements, notices, licenses, proof of acceptance, consent records and off-repository operational processes, without copying sensitive content into the report.

Do not infer establishment or territorial scope from a domain name, server region or interface language. Do not equate a small/free project with a legal exemption. Missing facts block only dependent conclusions; retain useful findings elsewhere and record the unanswered questions.

## Source discipline

For every material conclusion, retrieve the actual primary source and record its identity, issuer, type, exact provision/clause, official URL, version, publication or revision date where available, effective date, date of applicability and retrieval date. Distinguish the review date from the planned launch date. Check amendments, transition provisions, exceptions and relevant judgments rather than assuming every published rule already applies.

Use `not applicable` for date fields that do not apply to that source type, or `unknown` when a relevant date cannot be verified. Do not invent legal effective dates for guidance, contracts or license files.

- **Legislation:** use official publication and consolidation services; follow national implementation where an EU directive needs it. Treat explanatory recitals separately from operative provisions and resolve material version uncertainty before declaring a gap.
- **Judgments or authority decisions:** cite the actual decision, date and relevant reasoning; explain its connection to the facts. Do not generalize a different case into an automatic rule.
- **Authority guidance:** official regulator guidance is primary evidence of the authority's position, not legislation. Label recommendations, enforcement guidance and binding decisions distinctly.
- **Contracts and licenses:** use the actual relevant version and usage/distribution model. A public current supplier policy is not proof of the operator's accepted terms or executed processing agreement; a package name or SPDX label is not a complete license review.

Blogs, vendor summaries of law, search snippets and model recollection may help navigation but cannot establish a requirement. Do not invent citations or copy whole policies from another project. A source link that cannot be read, a stale extract or inaccessible account evidence must be labeled unverified. Try available official formats or an authorized browser; if verification remains impossible, identify the exact missing text and preserve the uncertainty.

Use short necessary excerpts and a faithful paraphrase. Separate the source's rule, the project facts and the auditor's reasoning. Store confidential contracts and raw browser artifacts privately outside the audited repository; include only redacted evidence in the report.

## Two independent assessment axes

For each candidate obligation, record:

- **Applicability:** `Applies`, `Does not apply` or `Undetermined`, with the jurisdiction, facts, scope rule and any exception supporting that choice.
- **Verification:** `Supported`, `Gap`, `Not verified` or `Needs interpretation`. For justified `Does not apply`, use a dash rather than a fulfillment score.

`Supported` means the inspected evidence supports meeting that specific requirement within the stated scope. `Gap` requires a verified applicable obligation and evidence of a missing or conflicting implementation. `Not verified` means evidence or source access is missing. `Needs interpretation` means the material issue is the legal classification or application of the rule; state the competing readings, relevant facts and precise question to resolve.

Retain the toolkit's `Confirmed`/`Suspected` finding status for evidence strength. Confirming that a tracker runs before a click is not, by itself, confirmation of a legal violation: its purpose, applicable rule and possible exception must also be established. Never use a global compliance percentage or convert incomplete coverage into a passing verdict.

## Select applicable review areas

- **Operator disclosures and contracts:** examine relevant operator information, offer terms, acceptance evidence and consistency between the promise, interface and actual service.
- **Privacy:** inventory purposes and data flows; evaluate applicable lawful bases, transparency, retention, rights handling, processor arrangements, security evidence and international transfers. A published privacy policy does not prove operational compliance.
- **Cookies and similar technologies:** inspect actual browser behavior, purpose, consent/withdrawal and disclosures. Distinguish device access/storage rules from any subsequent personal-data processing. Do not demand a banner or consent for every technology by default.
- **Messaging:** classify service/transaction messages separately from promotion, verify the relevant consent or exception, evidence and opt-out behavior. Do not send live test messages without authorization.
- **Consumer transactions:** establish business/consumer roles and type of service before checking pre-contract information, payment/renewal, termination, complaints and withdrawal. Do not reuse a digital-content exception for every subscription or assume free access excludes all consumer rules.
- **Software, content and suppliers:** review exact licenses for dependencies, fonts, images and content, required notices and actual use/distribution. Check service terms against commercial use and data practices; cross-reference scalability/cost findings.

Identify additional jurisdiction, accessibility, children, sensitive-data, user-content, AI or regulated-sector questions when features justify them. The initial small-project scope does not claim tax, employment, all foreign-market or specialist-sector coverage. Record relevant excluded areas and the next scoped review needed rather than silently clearing them or expanding into every regime.

## Practical findings and follow-up

Each finding follows: **source and rule -> applicability -> project evidence -> gap or unresolved question -> focused action -> verification**. State the possible consequence and uncertainty without inventing penalty amounts or treating every issue as critical. Cross-reference shared technical evidence from security, web quality, production and scalability/cost reviews.

Actively seek contrary evidence: exceptions, necessary-function purposes, documented processes outside the repository, a different contract model or an agreement that already covers the requirement. Lack of a file is not proof an agreement or process does not exist.

Prefer the smallest correction supported by the facts. Do not require generic terms, consent checkboxes or additional tracking infrastructure without an applicable reason. Label any proposed report wording as draft. Do not publish documents, accept agreements, contact a regulator or change processing as part of the audit.

For missing facts, ask the operator a precise question. For unresolved legal interpretation, document the alternatives and evidence needed; where material consequences remain, identify a focused expert/provider/authority clarification as appropriate. Do not automatically require lawyer review for every routine finding or promise that citations eliminate all need for judgment. Revisit dependent conclusions when markets, features, suppliers, data uses or relevant sources change.
