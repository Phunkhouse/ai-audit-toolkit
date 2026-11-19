# Architecture report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Insert `Architecture overview` before `Findings`.

**Additional finding fields.** Include `Priority` as defined in `references/severity.md`. For architecture findings, connect structural evidence to an affected requirement or concrete change scenario. Include known decision context, counter-evidence, and the smallest useful remediation with migration steps, risks and verification. Use `references/architecture-review.md` to distinguish a defect from an accepted tradeoff or an unverified assumption. Explain release-blocking impact separately from improvement priority, and cross-reference overlapping findings from other audit types.

## Architecture overview

Map the observed system using evidence and a compact diagram if it adds clarity. Mark inferred or inaccessible relationships as unverified.

| Component or boundary | Responsibility and data ownership | Dependencies or contracts | Evidence and limits |
| --- | --- | --- | --- |
| <component> | <responsibility and owner> | <relationship> | <source or unknown> |

Record relevant decision rationale, constraints and accepted tradeoffs with sources. Keep acceptable tradeoffs outside active findings. When rationale is unknown, state what evidence is missing.
