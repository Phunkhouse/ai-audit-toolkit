import { createHmac, timingSafeEqual } from 'node:crypto';
import { users } from './store.js';

const secret = process.env.SESSION_SECRET;

export function sign(userId) {
  const mac = createHmac('sha256', secret).update(userId).digest('hex');
  return `${userId}.${mac}`;
}

export function currentUser(req) {
  const cookie = req.headers.cookie ?? '';
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return null;
  const [userId, mac] = match[1].split('.');
  if (!userId || !mac) return null;
  const expected = createHmac('sha256', secret).update(userId).digest('hex');
  const a = Buffer.from(mac, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return users.find((u) => u.id === userId) ?? null;
}

export function canSee(user, invoice) {
  return user.role === 'staff' || invoice.customerId === user.id;
}
