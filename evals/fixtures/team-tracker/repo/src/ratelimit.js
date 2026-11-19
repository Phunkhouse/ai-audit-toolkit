// Fixed-window limiter, per process (see docs/decisions/0001).
const windows = new Map();
const WINDOW_MS = 60_000;

export function clientAddress(req) {
  if (process.env.TRUST_PROXY === '1') {
    // The proxy appends the address it saw, so only the last entry is trustworthy.
    const forwarded = (req.headers['x-forwarded-for'] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    if (forwarded.length) return forwarded[forwarded.length - 1];
  }
  return req.socket.remoteAddress;
}

export function allow(req, limit = 300) {
  const key = clientAddress(req);
  const now = Date.now();
  const w = windows.get(key);
  if (!w || now - w.start >= WINDOW_MS) {
    windows.set(key, { start: now, count: 1 });
    return true;
  }
  w.count++;
  return w.count <= limit;
}
