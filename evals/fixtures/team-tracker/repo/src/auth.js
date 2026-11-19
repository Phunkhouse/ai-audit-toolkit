import { createHash, randomBytes } from 'node:crypto';
import { apiTokens, users } from './store.js';
import { HttpError } from './http.js';

const hash = (token) => createHash('sha256').update(token).digest('hex');

// Token lookups are cached briefly to keep request latency low.
const cache = new Map();
const CACHE_MS = 10 * 60 * 1000;

export function issueToken(userId) {
  const token = randomBytes(32).toString('base64url');
  apiTokens.set(hash(token), { userId, revoked: false });
  return token;
}

export function revokeToken(token) {
  const record = apiTokens.get(hash(token));
  if (record) record.revoked = true;
}

export function authenticate(req) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) throw new HttpError(401, 'token required');
  const key = hash(token);
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.user;
  const record = apiTokens.get(key);
  if (!record || record.revoked) throw new HttpError(401, 'invalid token');
  const user = users.get(record.userId);
  cache.set(key, { user, expires: Date.now() + CACHE_MS });
  return user;
}
