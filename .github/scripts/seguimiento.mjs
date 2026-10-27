// Robot de seguimiento a Miller Preciado y Agroventure Capital (Vibras Positivas HM)
// Busca noticias reales en Google News y las guarda en seguimiento.json (rama "datos").
import fs from 'node:fs';
const FILE = process.argv[2] || 'seguimiento.json';
const QUERIES = [
  ['"Miller Preciado"', 'miller'],
  ['"Agroventure Capital"', 'agroventure'],
  ['Miller Preciado Venezuela', 'miller'],
  ['arándanos Colombia', 'arandano'],
  ['Asocolblue arándano', 'arandano'],
];
const clean = s => (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const tag = (x, t) => { const m = x.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`)); return m ? clean(m[1]) : ''; };

let data = { bitacora: [], noticias: [] };
try { data = JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch {}
const seen = new Map((data.noticias || []).map(n => [n.link, n]));

for (const [q, tema] of QUERIES) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=es-419&gl=CO&ceid=CO:es-419`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 ArandanoPro-bot' } });
    if (!r.ok) { console.log('fallo', q, r.status); continue; }
    const xml = await r.text();
    for (const it of xml.split('<item>').slice(1, 25)) {
      const link = tag(it, 'link'); if (!link) continue;
      let title = tag(it, 'title'); const fuente = tag(it, 'source');
      if (fuente && title.endsWith(' - ' + fuente)) title = title.slice(0, -(fuente.length + 3));
      const fecha = new Date(tag(it, 'pubDate') || Date.now()).toISOString();
      if (!seen.has(link)) seen.set(link, { titulo: title, link, fuente, fecha, tema });
    }
  } catch (e) { console.log('error', q, e.message); }
}
const all = [...seen.values()].sort((a, b) => b.fecha.localeCompare(a.fecha));
// Prioriza lo de Miller y Agroventure; deja también lo más reciente del sector
const top = [...all.filter(n => n.tema !== 'arandano').slice(0, 40), ...all.filter(n => n.tema === 'arandano').slice(0, 25)]
  .sort((a, b) => b.fecha.localeCompare(a.fecha));
const out = { ...data, noticias: top, actualizado: new Date().toISOString() };
const before = JSON.stringify({ ...data, actualizado: '' }), after = JSON.stringify({ ...out, actualizado: '' });
fs.writeFileSync(FILE, JSON.stringify(out, null, 1));
console.log(before === after ? 'sin cambios en noticias' : `noticias: ${top.length}`);
