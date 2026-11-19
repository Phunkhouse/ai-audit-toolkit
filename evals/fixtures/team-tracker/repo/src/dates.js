// Calendar-date helpers. Dates are 'YYYY-MM-DD' strings.

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function dateInZone(instant, timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(instant);
  const get = (type) => parts.find((p) => p.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function addDays(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function isOverdue(task, workspace) {
  return Boolean(task.due) && task.due < today();
}

export function isDueToday(task, workspace) {
  return task.due === today();
}
