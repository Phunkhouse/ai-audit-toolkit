# Team tracker

A multi-tenant task tracker. Each workspace is an isolated tenant: members of one workspace must never see or change another workspace's data. Clients use API tokens.

## Accounts and access

- A user can belong to several workspaces. A membership has a role: `viewer`, `editor` or `admin`. Viewers read; editors create and change tasks; admins also manage members, invites, webhooks and exports.
- Admins invite people by e-mail. An invite carries the role the admin chose; the invited person accepts it with the invite token and joins with that role.
- API tokens are created per user. Revoking a token takes effect immediately.

## Tasks

- `GET /w/:ws/tasks?after=<cursor>&sort=<field>` lists tasks 50 at a time. The `next` cursor must page through every task exactly once, even when several tasks share a creation time.
- `PATCH /w/:ws/tasks/:id` updates a task. Clients must send the `version` they last read; a request whose version is missing or stale is rejected with 409, so concurrent edits never overwrite each other.
- `DELETE /w/:ws/tasks/:id` deletes a task. Deleted tasks disappear from lists, search, reports and exports.
- Due dates are calendar dates in the workspace's time zone (`workspace.timeZone`, an IANA name). "Due today" and "overdue" use the current date in that time zone.
- Recurring tasks repeat weekly or monthly. A monthly task due on the 29th to 31st falls on the last day of shorter months.
- Attachments belong to one task: `GET /w/:ws/tasks/:id/attachments/:attachmentId`.

## Search, reports and exports

- `GET /w/:ws/search?q=` searches task titles in the workspace. `GET /w/:ws/search/pattern?re=` matches titles against a regular expression.
- The service runs as one Node process (see `docs/decisions/0001-single-process.md`), so it must stay responsive to every workspace when one workspace's users send unusual requests.
- `GET /w/:ws/reports/:name` returns a summary report. Reports are cached for 60 seconds.
- `GET /w/:ws/export.csv` (admins) exports tasks as CSV for spreadsheet use.

## Outgoing webhooks

Admins register a URL that receives task events. The URL must be a public HTTPS endpoint; the service must never send requests to internal addresses. Failed deliveries are retried with exponential backoff and jitter.

## Operations

See `docs/decisions/` for accepted design decisions.

```bash
npm test
PORT=3000 TRUST_PROXY=1 npm start
```
