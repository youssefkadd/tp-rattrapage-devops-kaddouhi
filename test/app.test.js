const { test } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

test('GET /add/2/3 returns 5', async () => {
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/add/2/3`);
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.result, 5);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});

test('GET /health returns ok', async () => {
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    assert.deepEqual(await res.json(), { status: 'ok' });
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
