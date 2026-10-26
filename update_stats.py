"""Fetch Valorant competitive MMR without exposing the HenrikDev API key."""
import datetime, json, os, pathlib, urllib.request, urllib.error

KEY = os.environ['HENRIK_API_KEY']
URL = 'https://api.henrikdev.xyz/valorant/v2/mmr/eu/Vinc3e/uwu'
request = urllib.request.Request(URL, headers={'Authorization': KEY, 'User-Agent': 'Vinc3eOverlay/1.0'})
with urllib.request.urlopen(request, timeout=25) as response:
    payload = json.load(response)
if payload.get('status') != 200 or not payload.get('data'):
    raise RuntimeError(f"HenrikDev returned status {payload.get('status')}")
data = payload['data']
current = data.get('current_data') or {}
rr = current.get('ranking_in_tier')
if rr is None:
    raise RuntimeError('Rank rating missing: account may be unranked or API unavailable')
images = current.get('images') or {}
result = {
    'rank': current.get('currenttierpatched') or 'Unranked',
    'rr': int(rr),
    'icon': images.get('small') or images.get('large') or '',
    'updated_at': datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds'),
}
pathlib.Path('stats.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print('Stats updated:', result['rank'], result['rr'], 'RR')
