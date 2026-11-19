# Web quality report sections

Use with the skeleton in [`../report.md`](../report.md) and the finding fields in [`../../references/finding-format.md`](../../references/finding-format.md). Insert after `Findings`. Use the [performance measurement record](performance.md) for numeric metrics.

**Additional finding fields.** For web quality findings, identify the page, state and device profile, tool audit identifier or manual reproduction steps, and the affected element or source location. Record the final page reached and relevant run conditions. Use `references/web-quality-review.md` to interpret automated scores, manual coverage and intentional indexing behavior. Cross-reference existing findings for shared root causes; failed, skipped or inaccessible scans are never passing checks.

## Web quality results

Record the environment and build, tool and browser versions, resolved viewport/emulation/throttling settings, locale, cache/storage state, commands and run budget. Confirm the actual final page and authentication role without exposing credentials or sensitive URLs. Keep raw browser profiles and JSON/HTML reports outside the repository; include essential redacted evidence here.

| Page and state | Device profile and run count | Applicable category scores or unavailable reason | Manual checks completed | Evidence and limitations |
| --- | --- | --- | --- | --- |
| <route, role and observed final page> | <profile, count> | <per-run results or summary and variability> | <checks actually completed> | <redacted evidence and gaps> |

Use the performance measurement section for relevant numeric metrics and comparable baselines. Identify intentional SEO exclusions and skipped categories explicitly. Category scores alone do not prove accessibility conformance, security, search visibility or real-user performance.
