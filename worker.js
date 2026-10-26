// Cloudflare Worker: deploy this file in Workers & Pages.
// Add HENRIK_API_KEY as a Secret (never put it in GitHub or a browser URL).
const API = 'https://api.henrikdev.xyz/valorant/v2/mmr/eu/Vinc3e/uwu';
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=60',
  'X-Content-Type-Options': 'nosniff',
};
const response = (body, status = 200) => new Response(JSON.stringify(body), {status, headers: HEADERS});
export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers: HEADERS});
    const url = new URL(request.url);
    if (request.method !== 'GET' || url.pathname !== '/rank') return response({error:'Not found; use /rank'}, 404);
    if (!env.HENRIK_API_KEY) return response({error:'Missing HENRIK_API_KEY secret'}, 503);
    // Cache per Cloudflare edge, so viewers do not trigger an API request each refresh.
    const cacheKey = new Request(url.origin + '/rank', {method:'GET'});
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
    try {
      const upstream = await fetch(API, {headers: {'Authorization': env.HENRIK_API_KEY, 'Accept':'application/json'}, signal: AbortSignal.timeout(12000)});
      if (!upstream.ok) return response({error:`HenrikDev HTTP ${upstream.status}`}, 502);
      const payload = await upstream.json();
      const current = payload?.data?.current_data;
      if (payload?.status !== 200 || !current || current.ranking_in_tier == null) {
        return response({error:'Rank data unavailable or player unranked'}, 503);
      }
      const result = response({
        rank: current.currenttierpatched || 'Unranked',
        rr: Number(current.ranking_in_tier),
        icon: current.images?.small || current.images?.large || '',
        updated_at: new Date().toISOString()
      });
      ctx.waitUntil(cache.put(cacheKey, result.clone()));
      return result;
    } catch (err) {
      return response({error:'Rank service temporarily unavailable'}, 502);
    }
  }
};
