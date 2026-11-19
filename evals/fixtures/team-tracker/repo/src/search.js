// Inverted index of title words per workspace, updated on create and update.
const index = new Map(); // `${workspaceId}:${word}` -> Set<taskId>

const words = (title) => title.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);

export function indexTask(task, previousTitle) {
  if (previousTitle) {
    for (const word of words(previousTitle)) index.get(`${task.workspaceId}:${word}`)?.delete(task.id);
  }
  for (const word of words(task.title)) {
    const key = `${task.workspaceId}:${word}`;
    if (!index.has(key)) index.set(key, new Set());
    index.get(key).add(task.id);
  }
}

export function search(workspaceId, query) {
  const terms = words(query);
  if (terms.length === 0) return [];
  let result = null;
  for (const term of terms) {
    const ids = index.get(`${workspaceId}:${term}`) ?? new Set();
    result = result ? new Set([...result].filter((id) => ids.has(id))) : new Set(ids);
  }
  return [...result];
}
