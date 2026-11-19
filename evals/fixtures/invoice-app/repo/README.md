# Invoice portal

A small internal portal where customers sign in, list their invoices and download invoice PDFs. A payment provider calls a webhook when an invoice is paid.

## Behaviour

- Each customer sees only their own invoices. Staff accounts (`role: "staff"`) can see all invoices.
- `GET /api/invoices?page=N&from=YYYY-MM-DD&to=YYYY-MM-DD` lists invoices. Pages are numbered from 1 and hold 20 invoices. The date range is inclusive on both ends.
- `GET /api/invoices/:id` returns one invoice.
- `GET /files?name=<file>` downloads a PDF from `uploads/`.
- Sign-in is handled by the company SSO proxy in front of this app, which sets the signed `session` cookie and serves `/sso/*`. `GET /login?next=/path` links to it and, once signed in, returns the user to `next`, which must be a path on this site.
- `POST /webhooks/payment` marks an invoice paid. The provider retries a delivery until it gets a 2xx response, so the same event can arrive more than once. Each event has a unique `eventId`.
- `GET /version` shows the deployed Git revision.

## Running

```bash
npm test
PORT=3000 SESSION_SECRET=... WEBHOOK_SECRET=... npm start
```
