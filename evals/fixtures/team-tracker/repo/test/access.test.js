import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requireRole, setMembership } from '../src/access.js';

test('role changes take effect immediately', () => {
  const ben = { id: 'u-ben' };
  assert.throws(() => requireRole('acme', ben, 'editor'), /forbidden/);
  setMembership('acme', 'u-ben', 'editor');
  assert.equal(requireRole('acme', ben, 'editor'), 'editor');
});

test('members of another workspace are rejected', () => {
  assert.throws(() => requireRole('globex', { id: 'u-ana' }, 'viewer'), /forbidden/);
});
