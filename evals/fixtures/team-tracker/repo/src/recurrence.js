import { addDays } from './dates.js';

// Returns the next due date after `due` for a recurrence rule.
export function nextDue(due, recurrence) {
  if (recurrence === 'weekly') {
    // Date-only arithmetic in UTC: daylight-saving changes cannot shift the day.
    return addDays(due, 7);
  }
  if (recurrence === 'monthly') {
    const d = new Date(`${due}T00:00:00Z`);
    d.setUTCMonth(d.getUTCMonth() + 1);
    return d.toISOString().slice(0, 10);
  }
  throw new Error(`unknown recurrence ${recurrence}`);
}
