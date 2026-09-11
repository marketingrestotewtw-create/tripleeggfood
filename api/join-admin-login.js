import { createSession, passwordsMatch, sendJson, SESSION_COOKIE } from '../server/join-with-us.js';

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { success: false });
  }

  const password = process.env.JOIN_ADMIN_PASSWORD;
  if (!password) {
    console.error('Join admin login failed: JOIN_ADMIN_PASSWORD is not configured');
    return sendJson(response, 500, { success: false });
  }
  if (!passwordsMatch(request.body?.password, password)) return sendJson(response, 401, { success: false });

  const session = createSession(password);
  response.setHeader('Set-Cookie', `${SESSION_COOKIE}=${session}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`);
  return sendJson(response, 200, { success: true });
}
