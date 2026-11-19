import { invoices, processedEvents } from './store.js';
import { canSee } from './auth.js';

export const PAGE_SIZE = 20;

export function listInvoices(user, { page = 1, from, to } = {}) {
  let rows = invoices.filter((inv) => canSee(user, inv));
  if (from) rows = rows.filter((inv) => inv.issuedOn >= from);
  if (to) rows = rows.filter((inv) => inv.issuedOn < to);
  const start = page * PAGE_SIZE;
  return rows.slice(start, start + PAGE_SIZE);
}

export function getInvoice(id) {
  return invoices.find((inv) => inv.id === id) ?? null;
}

// Called for every webhook delivery. The provider may deliver an event more than once.
export function recordPayment({ eventId, invoiceId, amountCents }) {
  const invoice = getInvoice(invoiceId);
  if (!invoice) return { ok: false, reason: 'unknown invoice' };
  invoice.paidCents += amountCents;
  if (invoice.paidCents >= invoice.amountCents) invoice.status = 'paid';
  processedEvents.add(eventId);
  return { ok: true };
}

export function totalOutstanding(user) {
  // `== null` deliberately treats both null and undefined as "no payment yet".
  return invoices
    .filter((inv) => canSee(user, inv))
    .reduce((sum, inv) => sum + inv.amountCents - (inv.paidCents == null ? 0 : inv.paidCents), 0);
}
