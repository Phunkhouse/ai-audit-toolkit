# Architecture review

Use this reference to assess structure against the project's requirements and constraints. Select applicable questions; no particular framework, directory layout or architectural pattern is required.

## Establish the observed architecture

Map the system boundary, main applications or modules, external dependencies, data stores and owners of important state. Support relationships with entry points, imports, interface definitions, schemas, configuration or traces. Label relationships that are inferred or inaccessible rather than presenting them as verified.

Use a component table or a small diagram when it adds clarity. Start with the system context and major runtime boundaries; add detail only for the flows under review. Do not infer separate deployment or failure isolation from directory names or packages alone.

Read available architecture decision records and project context for constraints and rationale. Check whether the implementation and current requirements still match them. An intentional decision does not disprove an issue when its assumptions no longer hold. Missing documentation or unknown team plans belong among limitations unless a concrete adverse consequence is established.

## Review questions

- **Responsibilities and boundaries:** Where do business rules live? Do modules expose a coherent responsibility, or must several independently maintained implementations agree to enforce the same rule? Distinguish coincidental similarity from actual duplicated policy.
- **Dependencies:** Which modules depend on each other, and through what interfaces? Trace cycles or coupling to a demonstrated problem such as initialization failure, inability to isolate tests or coordinated changes. Distinguish runtime dependencies from type-only, build-time or framework-required relationships.
- **Data ownership:** Who owns writes, invariants and lifecycle for important data? Can multiple paths bypass the same rules? Review shared schema ownership, transaction boundaries and coordination between services against the actual consistency requirements. A shared database is not inherently a defect.
- **Contracts and integration:** Are API, event and job contracts compatible across actual release boundaries? Examine synchronous dependencies, event ownership and versioning only where independent evolution or failure isolation is required.
- **Change impact and testability:** Trace a documented planned change, an existing requirement or a past change when history is available. Show the files, modules and contracts it affects. Identify why important behavior cannot be tested in isolation and the concrete consequence; missing tests alone do not establish an architectural defect.
- **Proportionality:** Does the number of layers, services, abstractions and operational boundaries serve a current need? Consider known team, scale and delivery constraints. Do not invent future growth or assume that microservices, dependency injection or clean architecture would improve the project.

## Evidence and counter-evidence

Every finding should connect a structural observation to a concrete consequence under stated conditions. Cite the relevant locations, affected requirement or change scenario, and any observed failure or change history. State uncertainty about consequences that cannot be verified.

Before reporting, look for contrary evidence: a shared policy already enforcing the invariant, an adapter shielding callers, tests preserving a boundary, framework conventions, a rollout mechanism or a deliberate decision accepting the tradeoff.

For example, three entry points may each implement price calculation. Show that they encode the same business policy and must change together before recommending consolidation. Three similar formatting helpers do not establish the same issue. If divergent calculations already cause incorrect results, cross-reference the correctness finding rather than count it as an independent architectural failure.

## Remediation and priority

Recommend the smallest useful change and explain its expected benefit, migration steps, compatibility and data risks, and verification. Consider retaining the current approach where migration cost exceeds the demonstrated impact. Describe alternatives when the choice depends on an unresolved requirement; do not invent numerical savings or effort estimates.

Use the shared severity definitions based on impact. Track improvement priority separately from whether an issue blocks release. A structural concern blocks the current release only when a concrete requirement, contract, integrity or reliability failure makes that necessary. Record intentional, acceptable tradeoffs outside active findings.

Cross-reference overlapping evidence from security, correctness, production or performance audits. An architecture review can explain a structural cause and its migration path without reporting the same failure twice.

Background: [C4 diagram guidance](https://c4model.com/diagrams) and [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
