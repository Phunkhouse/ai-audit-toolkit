import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listTasks, updateTask } from '../src/tasks.js';
import { nextDue } from '../src/recurrence.js';
import { deepMerge } from '../src/util.js';

test('lists only the workspace tasks', () => {
  const { tasks } = listTasks('acme');
  assert.equal(tasks.length, 50);
  assert.ok(tasks.every((t) => t.workspaceId === 'acme'));
});

test('rejects a stale version', () => {
  assert.throws(() => updateTask('acme', 't-0002', { version: 99, title: 'x' }), /stale/);
});

test('weekly recurrence keeps the weekday', () => {
  assert.equal(nextDue('2026-10-22', 'weekly'), '2026-10-29');
});

test('monthly recurrence moves one month', () => {
  assert.equal(nextDue('2026-10-15', 'monthly'), '2026-11-15');
});

test('deepMerge ignores __proto__', () => {
  const target = {};
  deepMerge(target, JSON.parse('{"__proto__": {"polluted": true}}'));
  assert.equal({}.polluted, undefined);
});
