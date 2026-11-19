// In-memory data store. A real deployment would use a database.

export const users = [
  { id: 'u1', email: 'ana@example.com', role: 'customer' },
  { id: 'u2', email: 'ben@example.com', role: 'customer' },
  { id: 's1', email: 'ops@example.com', role: 'staff' },
];

export const invoices = [];
for (let i = 0; i < 45; i++) {
  invoices.push({
    id: `INV-${1001 + i}`,
    customerId: i % 2 === 0 ? 'u1' : 'u2',
    issuedOn: `2026-10-${String((i % 28) + 1).padStart(2, '0')}`,
    amountCents: 10000 + i * 250,
    paidCents: 0,
    status: 'open',
  });
}

export const processedEvents = new Set();
