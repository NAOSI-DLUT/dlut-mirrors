import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDate, parseMirrors, statusLabel } from '../src/lib/mirrors.ts';

test('Go timestamps normalize timezone and sentinel dates', () => {
  assert.equal(formatDate('2026-05-07 15:30:00 +0800'), '2026-05-07 15:30');
  assert.equal(formatDate('2026-05-07 07:30:00 +0000'), '2026-05-07 15:30');
  for (const value of ['', 'invalid', '0001-01-01 00:00:00 +0000'])
    assert.equal(formatDate(value), '暂无记录');
});
test('malformed feeds are rejected before replacing the current table', () => {
  for (const value of [null, {}, [null], [{ name: 'Ubuntu' }]])
    assert.throws(() => parseMirrors(value));
  const item = {
    name: 'Future mirror',
    status: 'paused',
    size: 'unknown',
    last_update: '',
    next_schedule: '',
  };
  assert.equal(parseMirrors([item])[0].description, '');
  assert.equal(statusLabel(item.status), '未知状态');
  assert.throws(() => parseMirrors([{ ...item, description: {} }]));
});
