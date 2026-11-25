import { createServer } from 'node:http';
import { send, readJson, HttpError } from './http.js';
import { authenticate } from './auth.js';
import { requireRole } from './access.js';
import { listTasks, getTask, updateTask, deleteTask, completeTask } from './tasks.js';
import { search, searchPattern } from './search.js';
import { report } from './reports.js';
import { createInvite, acceptInvite } from './invites.js';
import { registerWebhook, deliver } from './webhooks.js';
import { exportCsv } from './export.js';
import { getAttachment } from './attachments.js';
import { allow } from './ratelimit.js';

const routes = [
  ['GET', /^\/w\/([\w-]+)\/tasks$/, 'viewer', (ws, url) => listTasks(ws, { after: url.searchParams.get('after') ?? undefined, sort: url.searchParams.get('sort') ?? undefined })],
  ['PATCH', /^\/w\/([\w-]+)\/tasks\/([\w-]+)$/, 'editor', async (ws, url, req, id) => {
    const task = updateTask(ws, id, await readJson(req));
    deliver(ws, { type: 'task.updated', id }).catch(() => {});
    return task;
  }],
  ['POST', /^\/w\/([\w-]+)\/tasks\/([\w-]+)\/complete$/, 'editor', (ws, url, req, id) => completeTask(ws, id)],
  ['DELETE', /^\/w\/([\w-]+)\/tasks\/([\w-]+)$/, 'editor', (ws, url, req, id) => (deleteTask(ws, id), { ok: true })],
  ['GET', /^\/w\/([\w-]+)\/tasks\/([\w-]+)\/attachments\/([\w-]+)$/, 'viewer', (ws, url, req, id, attachmentId) => getAttachment(ws, id, attachmentId).bytes],
  ['GET', /^\/w\/([\w-]+)\/search\/pattern$/, 'viewer', (ws, url) => searchPattern(ws, url.searchParams.get('re') ?? '')],
  ['GET', /^\/w\/([\w-]+)\/search$/, 'viewer', (ws, url) => search(ws, url.searchParams.get('q') ?? '').map((id) => getTask(ws, id))],
  ['GET', /^\/w\/([\w-]+)\/reports\/([\w-]+)$/, 'viewer', (ws, url, req, name) => report(ws, name)],
  ['GET', /^\/w\/([\w-]+)\/export\.csv$/, 'admin', (ws) => exportCsv(ws)],
  ['POST', /^\/w\/([\w-]+)\/invites$/, 'admin', async (ws, url, req) => createInvite(ws, await readJson(req))],
  ['POST', /^\/w\/([\w-]+)\/webhooks$/, 'admin', async (ws, url, req) => registerWebhook(ws, (await readJson(req)).url)],
];

export async function handle(req, res) {
  if (!allow(req)) return send(res, 429, { error: 'slow down' });
  const url = new URL(req.url, 'http://localhost');
  const user = authenticate(req);

  if (req.method === 'POST' && url.pathname === '/invites/accept') {
    return send(res, 200, acceptInvite(user, await readJson(req)));
  }

  for (const [method, pattern, role, handler] of routes) {
    const match = req.method === method && url.pathname.match(pattern);
    if (!match) continue;
    const [, ws, ...params] = match;
    requireRole(ws, user, role);
    return send(res, 200, await handler(ws, url, req, ...params));
  }
  send(res, 404, { error: 'not found' });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  createServer((req, res) => {
    handle(req, res).catch((err) => {
      const status = err instanceof HttpError ? err.status : 500;
      send(res, status, { error: status === 500 ? 'internal error' : err.message });
    });
  }).listen(Number(process.env.PORT ?? 3000));
}
