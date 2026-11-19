import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listInvoices } from '../src/invoices.js';
import { escapeHtml } from '../src/render.js';

const ana = { id: 'u1', role: 'customer' };

test('customers only see their own invoices', () => {
  const rows = listInvoices(ana, { page: 0 });
  assert.ok(rows.length > 0);
  assert.ok(rows.every((inv) => inv.customerId === 'u1'));
});

test('escapeHtml escapes markup', () => {
  assert.equal(escapeHtml('<a href="x">'), '&lt;a href=&quot;x&quot;&gt;');
});
