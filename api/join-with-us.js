import { sendJson, supabaseConfig, supabaseHeaders, validateLead } from '../server/join-with-us.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { success: false });
  }

  const lead = validateLead(request.body);
  if (!lead) return sendJson(response, 400, { success: false });

  try {
    const { url, key } = supabaseConfig();
    const result = await fetch(`${url}/rest/v1/join_with_us_leads`, {
      method: 'POST',
      headers: supabaseHeaders(key, 'return=minimal'),
      body: JSON.stringify(lead),
    });
    if (!result.ok) throw new Error(`Supabase insert returned HTTP ${result.status}`);
    return sendJson(response, 201, { success: true });
  } catch (error) {
    console.error('Join With Us submission failed:', error);
    return sendJson(response, 500, { success: false });
  }
}
