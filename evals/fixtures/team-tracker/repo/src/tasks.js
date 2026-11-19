import { tasks, workspaces } from './store.js';
import { HttpError } from './http.js';
import { indexTask } from './search.js';
import { nextDue } from './recurrence.js';
import { isOverdue } from './dates.js';
import { pick } from './util.js';

export const PAGE_SIZE = 50;

// Sort fields are mapped through this allowlist; nothing from the request reaches a comparator name.
const sorters = {
  created: (a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id),
  title: (a, b) => a.title.localeCompare(b.title) || a.id.localeCompare(b.id),
  due: (a, b) => (a.due ?? '9999').localeCompare(b.due ?? '9999') || a.id.localeCompare(b.id),
};

for (const task of tasks.values()) indexTask(task);

export function listTasks(workspaceId, { after, sort = 'created' } = {}) {
  const compare = Object.hasOwn(sorters, sort) ? sorters[sort] : null;
  if (!compare) throw new HttpError(400, 'unknown sort');
  let rows = [...tasks.values()].filter((t) => t.workspaceId === workspaceId && !t.deleted).sort(sorters.created);
  if (after) rows = rows.filter((t) => t.createdAt > after);
  const page = rows.slice(0, PAGE_SIZE);
  const workspace = workspaces.get(workspaceId);
  return {
    tasks: page.sort(compare).map((t) => ({ ...t, overdue: isOverdue(t, workspace) })),
    next: page.length === PAGE_SIZE ? page[page.length - 1].createdAt : null,
  };
}

export function getTask(workspaceId, id) {
  const task = tasks.get(id);
  if (!task || task.workspaceId !== workspaceId || task.deleted) throw new HttpError(404, 'no such task');
  return task;
}

export function updateTask(workspaceId, id, body) {
  const task = getTask(workspaceId, id);
  if (body.version !== undefined && body.version !== task.version) throw new HttpError(409, 'stale version');
  const previousTitle = task.title;
  Object.assign(task, pick(body, ['title', 'due', 'recurrence', 'assigneeId']));
  task.version++;
  indexTask(task, previousTitle);
  return task;
}

export function completeTask(workspaceId, id) {
  const task = getTask(workspaceId, id);
  if (task.recurrence && task.due) {
    task.due = nextDue(task.due, task.recurrence);
  } else {
    task.done = true;
  }
  task.version++;
  return task;
}

export function deleteTask(workspaceId, id) {
  const task = getTask(workspaceId, id);
  task.deleted = true;
  task.version++;
}
