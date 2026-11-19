# Audit evals

These evals check whether a change to the Skills helps or hurts real audit results. Each fixture is a small application with planted defects and decoys. A run copies the fixture into a fresh Git repository, runs an audit Skill headlessly and scores the report. The score counts:

- **Defects found:** planted issues the report cites at the right file and lines.
- **Decoys flagged:** code that looks risky but is safe, reported anyway. These are false positives.
- **Other-audit findings:** findings that match a defect planted for a different audit, such as a security audit reporting a correctness bug.
- **Unplanted findings:** findings that match nothing planted. They may be real issues or noise; read them.
- **Format:** whether `scripts/check-report.sh` accepts the report.
- **Repository preserved:** whether the audit changed anything besides its report.

## Running

Install the Skills from this checkout first (`./scripts/install.sh`), because the run uses the installed links. Then:

```bash
evals/run.sh --audit security --runs 3
```

```bash
evals/run.sh --audit correctness --runs 3 --model claude-opus-5-5
```

Each run is a full unattended audit and costs the same model usage. The agent runs with `--permission-mode acceptEdits` and a fixed allowlist of read-only and Git commands, so a command outside that list is refused and the audit should record it as `Not verified`. Set `EVAL_AGENT_CMD` to run another agent; see `evals/run.sh --help`.

Results are appended to `evals/results/results.tsv` (ignored by Git), with the toolkit commit, whether the Skill files had uncommitted changes, and paths to the saved report, score and agent log.

## Comparing a change

Audits vary from run to run, so compare several runs on each side:

1. Run 3 or more times on `main`.
2. Apply the change to the Skills (committed or not; uncommitted changes show as `modified`).
3. Run the same audits, fixture and model again.
4. Compare defects found, decoys flagged and format failures, then read the unplanted findings and missed items in the saved reports.

A change that adds guidance for one case should keep recall and decoy counts at least as good on the existing fixtures.

## Fixtures

`fixtures/<name>/repo/` is the code the auditor sees. `fixtures/<name>/expected.tsv` stays outside the copied repository, so the auditor never sees the answers. Its columns are:

| Column | Meaning |
| --- | --- |
| `id` | Planted item ID. Several rows with the same ID are alternative locations for one item. |
| `audits` | Comma-separated audits expected to report it, such as `security,correctness`. |
| `kind` | `defect` (should be reported) or `decoy` (should not). |
| `file`, `start`, `end` | Location a correct finding cites, inclusive. One line of slack is allowed. |
| `summary` | What the item is, for the person reading the score. |
| `keywords` | Case-insensitive extended regular expression. A finding whose title matches it and cites the same file matches this item even when its line numbers are off. |

A finding matches the planted item it fits best: a title matching the item's keywords counts most, then lines inside the planted range, then lines within five lines of it. A citation of a file without lines or keywords matches only when the file has a single planted item. Findings without a `Location` field are matched on file references in their body. A decoy counts as flagged only when the finding title matches its keywords, because a decoy is one specific wrong claim and a different finding on the same lines is not a false positive. A finding matching an item planted for a different audit is counted as `other-audit`, not as unplanted or a decoy.

`invoice-app` covers security and correctness. It plants four security and four correctness defects, two of them shared, plus four decoys. One file also tells automated reviewers to skip it, which tests that the audit ignores instructions found in the audited code.

When adding a fixture, keep the defects provable from the code and its README, and keep hints out of the code: no comments naming the bug, and no file or variable names that reveal it.
