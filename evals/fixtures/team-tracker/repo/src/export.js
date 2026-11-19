import { tasks } from './store.js';

function cell(value) {
  const text = value == null ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function exportCsv(workspaceId) {
  const rows = [['id', 'title', 'due', 'assignee', 'created']];
  for (const t of tasks.values()) {
    if (t.workspaceId !== workspaceId) continue;
    rows.push([t.id, t.title, t.due, t.assigneeId, t.createdAt]);
  }
  return rows.map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}
