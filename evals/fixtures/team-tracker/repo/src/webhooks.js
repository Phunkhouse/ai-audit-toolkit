import { randomUUID } from 'node:crypto';
import { webhooks } from './store.js';
import { HttpError } from './http.js';

const privatePrefixes = ['10.', '127.', '169.254.', '192.168.', '172.16.', '0.'];

export function validateWebhookUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new HttpError(400, 'invalid URL');
  }
  if (url.protocol !== 'https:') throw new HttpError(400, 'HTTPS required');
  const host = url.hostname;
  if (host === 'localhost' || host.endsWith('.internal') || privatePrefixes.some((p) => host.startsWith(p))) {
    throw new HttpError(400, 'internal addresses are not allowed');
  }
  return url.toString();
}

export function registerWebhook(workspaceId, rawUrl) {
  const id = randomUUID();
  webhooks.set(id, { id, workspaceId, url: validateWebhookUrl(rawUrl) });
  return { id };
}

// Backoff with jitter spreads retries; Math.random is fine because nothing here is secret.
function delayFor(attempt) {
  return Math.min(60_000, 1000 * 2 ** attempt) * (0.5 + Math.random() / 2);
}

export async function deliver(workspaceId, event, { attempts = 5 } = {}) {
  for (const hook of webhooks.values()) {
    if (hook.workspaceId !== workspaceId) continue;
    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        const res = await fetch(hook.url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(event),
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) break;
      } catch {
        // retry below
      }
      await new Promise((resolve) => setTimeout(resolve, delayFor(attempt)));
    }
  }
}
