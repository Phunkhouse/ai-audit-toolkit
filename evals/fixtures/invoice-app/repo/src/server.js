import { createServer } from 'node:http';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { currentUser, canSee } from './auth.js';
import { listInvoices, getInvoice, recordPayment } from './invoices.js';
import { sendFile } from './files.js';
import { page, escapeHtml, invoiceRow } from './render.js';
import { revision } from './version.js';

const webhookSecret = process.env.WEBHOOK_SECRET;

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' }).end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 64 * 1024) reject(new Error('body too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function validSignature(body, header) {
  if (!header) return false;
  const expected = createHmac('sha256', webhookSecret).update(body).digest('hex');
  const a = Buffer.from(header, 'hex');
  const b = Buffer.from(expected, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const user = currentUser(req);

  if (req.method === 'GET' && url.pathname === '/login') {
    const next = url.searchParams.get('next') ?? '/';
    if (user) {
      res.writeHead(302, { location: next }).end();
      return;
    }
    res.writeHead(200, { 'content-type': 'text/html' }).end(page('Sign in', `<a href="/sso/start?next=${encodeURIComponent(next)}">Sign in with company SSO</a>`));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/webhooks/payment') {
    const body = await readBody(req);
    if (!validSignature(body, req.headers['x-signature'])) return json(res, 401, { error: 'bad signature' });
    const event = JSON.parse(body);
    return json(res, 200, recordPayment(event));
  }

  if (req.method === 'GET' && url.pathname === '/version') {
    return json(res, 200, { revision: await revision() });
  }

  if (!user) return json(res, 401, { error: 'sign in required' });

  if (req.method === 'GET' && url.pathname === '/api/invoices') {
    const pageNumber = Number(url.searchParams.get('page') ?? '1');
    const rows = listInvoices(user, {
      page: pageNumber,
      from: url.searchParams.get('from') ?? undefined,
      to: url.searchParams.get('to') ?? undefined,
    });
    return json(res, 200, rows);
  }

  const match = url.pathname.match(/^\/api\/invoices\/([A-Z0-9-]+)$/);
  if (req.method === 'GET' && match) {
    const invoice = getInvoice(match[1]);
    if (!invoice) return json(res, 404, { error: 'not found' });
    return json(res, 200, invoice);
  }

  if (req.method === 'GET' && url.pathname === '/invoices') {
    const rows = listInvoices(user, { page: 1 }).filter((inv) => canSee(user, inv));
    return res.writeHead(200, { 'content-type': 'text/html' }).end(page(`Invoices for ${user.email}`, `<h1>${escapeHtml(user.email)}</h1><table>${rows.map(invoiceRow).join('')}</table>`));
  }

  if (req.method === 'GET' && url.pathname === '/files') {
    return sendFile(res, url.searchParams.get('name') ?? '');
  }

  json(res, 404, { error: 'not found' });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  createServer((req, res) => {
    handle(req, res).catch(() => json(res, 500, { error: 'internal error' }));
  }).listen(Number(process.env.PORT ?? 3000));
}
