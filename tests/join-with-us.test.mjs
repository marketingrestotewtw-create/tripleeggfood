import assert from 'node:assert/strict';
import test from 'node:test';
import submitLead from '../api/join-with-us.js';
import adminLogin from '../api/join-admin-login.js';
import getLeads from '../api/join-with-us-leads.js';
import { createSession, normalizePhone, SESSION_COOKIE, validateLead } from '../server/join-with-us.js';

function responseMock() {
  return { headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(value) { this.body = JSON.parse(value); } };
}

const validLead = { name: ' Angelica Revadias ', phone: '0851795807085', birth_date: '1998-08-24' };

test('lead validation trims and normalizes valid data', () => {
  assert.deepEqual(validateLead(validLead), { name: 'Angelica Revadias', phone: '+62851795807085', birth_date: '1998-08-24' });
  assert.equal(normalizePhone('+62 851-7958-07085'), '+62851795807085');
});

test('lead validation rejects blank names, invalid phones, and future dates', () => {
  assert.equal(validateLead({ ...validLead, name: '  ' }), null);
  assert.equal(validateLead({ ...validLead, phone: '12345' }), null);
  assert.equal(validateLead({ ...validLead, birth_date: '2999-01-01' }), null);
});

test('submission API rejects invalid data with 400', async () => {
  const response = responseMock();
  await submitLead({ method: 'POST', body: { ...validLead, phone: 'invalid' } }, response);
  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, { success: false });
});

test('submission API returns success only after Supabase accepts insert', async t => {
  process.env.SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'server-secret';
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  globalThis.fetch = async (_url, options) => {
    assert.deepEqual(JSON.parse(options.body), { name: 'Angelica Revadias', phone: '+62851795807085', birth_date: '1998-08-24' });
    return { ok: true, status: 201 };
  };
  const response = responseMock();
  await submitLead({ method: 'POST', body: validLead }, response);
  assert.equal(response.statusCode, 201);
  assert.deepEqual(response.body, { success: true });
});

test('submission API returns 500 when database insert fails', async t => {
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  t.after(() => { globalThis.fetch = originalFetch; console.error = originalError; });
  console.error = () => {};
  globalThis.fetch = async () => ({ ok: false, status: 500 });
  const response = responseMock();
  await submitLead({ method: 'POST', body: validLead }, response);
  assert.equal(response.statusCode, 500);
});

test('admin login rejects wrong password and sets HttpOnly cookie for correct password', () => {
  process.env.JOIN_ADMIN_PASSWORD = 'correct horse battery staple';
  const rejected = responseMock();
  adminLogin({ method: 'POST', body: { password: 'wrong' } }, rejected);
  assert.equal(rejected.statusCode, 401);
  const accepted = responseMock();
  adminLogin({ method: 'POST', body: { password: 'correct horse battery staple' } }, accepted);
  assert.equal(accepted.statusCode, 200);
  assert.match(accepted.headers['Set-Cookie'], /HttpOnly; Secure; SameSite=Strict/);
});

test('lead list is private and requests newest records first', async t => {
  const unauthorized = responseMock();
  await getLeads({ method: 'GET', headers: {} }, unauthorized);
  assert.equal(unauthorized.statusCode, 401);

  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  globalThis.fetch = async url => {
    assert.match(url, /order=created_at\.desc/);
    return { ok: true, json: async () => [validLead] };
  };
  const session = createSession(process.env.JOIN_ADMIN_PASSWORD);
  const authorized = responseMock();
  await getLeads({ method: 'GET', headers: { cookie: `${SESSION_COOKIE}=${session}` } }, authorized);
  assert.equal(authorized.statusCode, 200);
  assert.equal(authorized.body.leads.length, 1);
});
