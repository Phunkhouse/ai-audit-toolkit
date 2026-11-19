# Code cleanup report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Insert after `Findings`.

**Additional finding fields.** For code cleanup findings, cite the maintenance impact, relevant consumers or shared behavior, and the evidence checked before recommending a change. Record compatibility or regression risks and a targeted verification step. For UI candidates, describe the existing primitives and intentional variants. Treat exploratory candidates as findings only when a concrete issue and impact are established.

## Code cleanup assessment

Prioritize by maintenance benefit, effort and risk. Reference finding IDs for verified issues and use `Not verified` for missing evidence that blocks a removal decision.

| Priority and finding | Proposed change | Expected benefit | Effort and regression risk | Verification |
| --- | --- | --- | --- | --- |
| <priority and CLN-ID> | <smallest useful change> | <concrete maintenance scenario> | <effort and behavior or contracts at risk> | <targeted build, test or consumer checks> |

### Shared UI candidates (when relevant)

List evidence and an adoption decision for each repeated pattern. Reference a finding ID only when the pattern creates a concrete issue.

| Pattern and locations | Shared intent and intentional variants | Adoption decision and rationale | Effort, risk and verification |
| --- | --- | --- | --- |
| <instances and existing primitives checked> | <what should change together and what remains specific> | <reuse, token, shared component or keep local> | <adoption effort and accessibility, responsive and interaction checks as applicable> |
