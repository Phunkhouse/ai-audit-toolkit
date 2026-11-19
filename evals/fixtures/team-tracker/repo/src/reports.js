import { tasks, workspaces } from './store.js';
import { isOverdue } from './dates.js';
import { HttpError } from './http.js';

const TTL_MS = 60_000;
const cache = new Map(); // report name -> { at, value }

const builders = {
  summary(workspaceId) {
    const workspace = workspaces.get(workspaceId);
    const rows = [...tasks.values()].filter((t) => t.workspaceId === workspaceId && !t.deleted);
    return {
      workspace: workspace.name,
      total: rows.length,
      open: rows.filter((t) => !t.done).length,
      overdue: rows.filter((t) => isOverdue(t, workspace)).length,
      titles: rows.slice(0, 20).map((t) => t.title),
    };
  },
};

export function report(workspaceId, name) {
  const build = Object.hasOwn(builders, name) ? builders[name] : null;
  if (!build) throw new HttpError(404, 'no such report');
  const hit = cache.get(name);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value;
  const value = build(workspaceId);
  cache.set(name, { at: Date.now(), value });
  return value;
}
