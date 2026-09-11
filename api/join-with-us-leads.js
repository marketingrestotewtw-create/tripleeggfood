import { sendJson, supabaseConfig, supabaseHeaders, validSession } from '../server/join-with-us.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return sendJson(response, 405, { success: false });
  }
  if (!validSession(request.headers.cookie, process.env.JOIN_ADMIN_PASSWORD)) {
    return sendJson(response, 401, { success: false });
  }

  try {
    const { url, key } = supabaseConfig();
    const query = 'select=name,phone,birth_date,created_at&order=created_at.desc';
    const result = await fetch(`${url}/rest/v1/join_with_us_leads?${query}`, { headers: supabaseHeaders(key) });
    if (!result.ok) throw new Error(`Supabase select returned HTTP ${result.status}`);
    const leads = await result.json();
    return sendJson(response, 200, { success: true, leads });
  } catch (error) {
    console.error('Join With Us lead retrieval failed:', error);
    return sendJson(response, 500, { success: false });
  }
}
