import { memberships, workspaces } from './store.js';
import { HttpError } from './http.js';

const rank = { viewer: 1, editor: 2, admin: 3 };

// Per-request role lookups are memoised; every membership change clears the entry.
const roleCache = new Map();

export function roleIn(workspaceId, userId) {
  const key = `${workspaceId}:${userId}`;
  if (!roleCache.has(key)) roleCache.set(key, memberships.get(key)?.role ?? null);
  return roleCache.get(key);
}

export function setMembership(workspaceId, userId, role) {
  const key = `${workspaceId}:${userId}`;
  if (role) memberships.set(key, { workspaceId, userId, role });
  else memberships.delete(key);
  roleCache.delete(key);
}

export function requireRole(workspaceId, user, minimum) {
  if (!workspaces.has(workspaceId)) throw new HttpError(404, 'no such workspace');
  const role = roleIn(workspaceId, user.id);
  if (!role || rank[role] < rank[minimum]) throw new HttpError(403, 'forbidden');
  return role;
}
