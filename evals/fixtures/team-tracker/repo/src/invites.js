import { randomBytes } from 'node:crypto';
import { invites, memberships } from './store.js';
import { HttpError } from './http.js';
import { looksLikeEmail } from './util.js';
import { setMembership } from './access.js';

export function createInvite(workspaceId, { email, role }) {
  if (!looksLikeEmail(email)) throw new HttpError(400, 'invalid email');
  if (!['viewer', 'editor', 'admin'].includes(role)) throw new HttpError(400, 'invalid role');
  const token = randomBytes(24).toString('base64url');
  invites.set(token, { workspaceId, email, role, expires: Date.now() + 7 * 86_400_000 });
  return { token };
}

export function acceptInvite(user, body) {
  const invite = invites.get(body.token);
  if (!invite || invite.expires < Date.now()) throw new HttpError(404, 'invite not found');
  if (invite.email.toLowerCase() !== user.email.toLowerCase()) throw new HttpError(403, 'invite is for another address');
  invites.delete(body.token);
  const membership = { ...invite, ...body, userId: user.id };
  setMembership(membership.workspaceId, user.id, membership.role);
  return memberships.get(`${membership.workspaceId}:${user.id}`);
}
