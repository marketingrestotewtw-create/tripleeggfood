import { createHmac, timingSafeEqual } from 'node:crypto';

const PHONE_PATTERN = /^\+628\d{7,11}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SESSION_SECONDS = 8 * 60 * 60;
export const SESSION_COOKIE = 'triple_egg_admin';

export function normalizePhone(value) {
  if (typeof value !== 'string') return null;
  const compact = value.trim().replace(/[\s().-]/g, '');
  const normalized = compact.startsWith('08') ? `+62${compact.slice(1)}` : compact;
  return PHONE_PATTERN.test(normalized) ? normalized : null;
}

export function validateLead(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const phone = normalizePhone(body?.phone);
  const birthDate = typeof body?.birth_date === 'string' ? body.birth_date : '';
  const parsedDate = DATE_PATTERN.test(birthDate) ? new Date(`${birthDate}T00:00:00Z`) : null;
  const isRealDate = parsedDate && !Number.isNaN(parsedDate.valueOf()) && parsedDate.toISOString().slice(0, 10) === birthDate;
  const today = new Date().toISOString().slice(0, 10);
  if (!name || !phone || !isRealDate || birthDate > today) return null;
  return { name, phone, birth_date: birthDate };
}

export function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return { url, key };
}

export function supabaseHeaders(key, prefer) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

function signature(value, secret) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function passwordsMatch(candidate, expected) {
  if (typeof candidate !== 'string' || !expected) return false;
  const candidateHash = createHmac('sha256', 'triple-egg-password').update(candidate).digest();
  const expectedHash = createHmac('sha256', 'triple-egg-password').update(expected).digest();
  return timingSafeEqual(candidateHash, expectedHash);
}

export function createSession(secret) {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${expires}.${signature(expires, secret)}`;
}

export function validSession(cookieHeader, secret) {
  if (!cookieHeader || !secret) return false;
  const cookies = Object.fromEntries(cookieHeader.split(';').map(part => part.trim().split(/=(.*)/s).slice(0, 2)));
  const [expires, suppliedSignature] = (cookies[SESSION_COOKIE] || '').split('.');
  if (!expires || !suppliedSignature || Number(expires) <= Date.now() / 1000) return false;
  const expected = signature(expires, secret);
  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expected);
  return suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
}

export function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}
