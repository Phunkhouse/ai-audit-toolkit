// In-memory data. Persistent snapshots are handled outside this repository (see docs/decisions/0001).

export const workspaces = new Map([
  ['acme', { id: 'acme', name: 'Acme', timeZone: 'Europe/Prague' }],
  ['globex', { id: 'globex', name: 'Globex', timeZone: 'America/Los_Angeles' }],
]);

export const users = new Map([
  ['u-ana', { id: 'u-ana', email: 'ana@acme.example' }],
  ['u-ben', { id: 'u-ben', email: 'ben@acme.example' }],
  ['u-cy', { id: 'u-cy', email: 'cy@globex.example' }],
]);

// key: `${workspaceId}:${userId}`
export const memberships = new Map([
  ['acme:u-ana', { workspaceId: 'acme', userId: 'u-ana', role: 'admin' }],
  ['acme:u-ben', { workspaceId: 'acme', userId: 'u-ben', role: 'viewer' }],
  ['globex:u-cy', { workspaceId: 'globex', userId: 'u-cy', role: 'admin' }],
]);

// tokenHash -> { userId, revoked }
export const apiTokens = new Map();

export const invites = new Map();

export const tasks = new Map();
export const attachments = new Map();
export const webhooks = new Map();

const base = Date.parse('2026-10-01T08:00:00Z');
let n = 0;
for (const ws of ['acme', 'globex']) {
  for (let i = 0; i < 120; i++) {
    n++;
    const id = `t-${String(n).padStart(4, '0')}`;
    tasks.set(id, {
      id,
      workspaceId: ws,
      title: `Task ${n}`,
      // Imports create tasks in batches of seven with the same timestamp.
      createdAt: new Date(base + Math.floor(i / 7) * 60_000).toISOString(),
      due: null,
      recurrence: null,
      assigneeId: null,
      version: 1,
      deleted: false,
    });
  }
}
attachments.set('a-1', { id: 'a-1', taskId: 't-0001', name: 'brief.pdf', bytes: Buffer.from('%PDF acme brief') });
attachments.set('a-2', { id: 'a-2', taskId: 't-0121', name: 'contract.pdf', bytes: Buffer.from('%PDF globex contract') });
