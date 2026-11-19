# Finding severity

Assign severity from the concrete impact in this project and the likely conditions for exploitation or failure. Confidence in the evidence is a separate field.

| Level | Meaning |
| --- | --- |
| Critical | Likely catastrophic harm or direct compromise of essential data or services; requires immediate action. |
| High | Significant security, data, or operational impact in a realistic scenario; usually blocks release. |
| Medium | Limited impact, narrower conditions, or meaningful risk in a noncritical flow; schedule a fix. |
| Low | Minor impact or a rare edge case; fix according to project priorities. |

For audits that mainly propose improvements (performance, architecture, code cleanup, test/CI), severity is the harm of leaving the issue as it is, such as wrong results, release risk, wasted compute or maintenance cost. Most such findings are Medium or Low; that is expected, not a reason to inflate them.

## Priority

Performance, architecture, code cleanup and test/CI findings also carry a `Priority` that orders the work independently of severity:

| Priority | Meaning |
| --- | --- |
| Now | Act now: clear benefit at low effort or risk, or it blocks a planned change or release. |
| Next | Prepare or schedule: worthwhile, but needs design, coordination or a measurement first. |
| Later | Defer: benefit is small or conditional; name the trigger that would raise it. |

Explain the choice in the finding or backlog row. Priority never changes whether a finding is a release blocker.

## Evidence

An unverified possibility is not a confirmed finding. List it separately as `Not verified`, with the reason and a way to verify it. Use `Passed` only for a specific check that was performed and supported by evidence. If the conditions for impact are unknown, state the assumptions rather than inflating severity.
