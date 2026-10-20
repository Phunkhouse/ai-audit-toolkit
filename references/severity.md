# Finding severity

Assign severity from the concrete impact in this project and the likely conditions for exploitation or failure. Confidence in the evidence is a separate field.

| Level | Meaning |
| --- | --- |
| Critical | Likely catastrophic harm or direct compromise of essential data or services; requires immediate action. |
| High | Significant security, data, or operational impact in a realistic scenario; usually blocks release. |
| Medium | Limited impact, narrower conditions, or meaningful risk in a noncritical flow; schedule a fix. |
| Low | Minor impact or a rare edge case; fix according to project priorities. |

An unverified possibility is not a confirmed finding. List it separately as `Not verified`, with the reason and a way to verify it. Use `Passed` only for a specific check that was performed and supported by evidence. If the conditions for impact are unknown, state the assumptions rather than inflating severity.
