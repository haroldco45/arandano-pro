// Arándano Pro — service worker (Vibras Positivas HM)
const CACHE='arandano-pro-v3';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./og-image.jpg',
  "./img/arbusto.jpg",
  "./img/avellano.jpg",
  "./img/bayas.jpg",
  "./img/bolsas-sustrato.jpg",
  "./img/calidad-fresco.jpg",
  "./img/cebolla.jpg",
  "./img/cerezo.jpg",
  "./img/ciruelo.jpg",
  "./img/cosecha-hileras.jpg",
  "./img/cosechadora.jpg",
  "./img/cosecheros.jpg",
  "./img/cultivo-cubierto.jpg",
  "./img/duke.jpg",
  "./img/esparrago.jpg",
  "./img/floracion.jpg",
  "./img/huerto-otono.jpg",
  "./img/huerto-verde.jpg",
  "./img/huerto.jpg",
  "./img/ins-avispa.jpg",
  "./img/ins-burrito.jpg",
  "./img/ins-chanchito.jpg",
  "./img/ins-chinche.jpg",
  "./img/ins-cortador.jpg",
  "./img/ins-cuncunilla.jpg",
  "./img/ins-enrollador.jpg",
  "./img/ins-gusano-blanco.jpg",
  "./img/ins-pulgon.jpg",
  "./img/ins-trips.jpg",
  "./img/mano-cosecha.jpg",
  "./img/motobomba.jpg",
  "./img/mulch.jpg",
  "./img/nogal.jpg",
  "./img/papa.jpg",
  "./img/partidura.jpg",
  "./img/pistacho.jpg",
  "./img/plantacion.jpg",
  "./img/plantas-vivero.jpg",
  "./img/poda-brigitta.jpg",
  "./img/poda-duke.jpg",
  "./img/quinoa.jpg",
  "./img/racimo.jpg",
  "./img/racimo2.jpg",
  "./img/sustrato.jpg",
  "./img/yema.jpg",
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  // El clima siempre se busca en vivo; la app guarda el último pronóstico por su cuenta
  if(u.hostname.includes('open-meteo.com'))return;
  if(u.origin===location.origin&&(e.request.mode==='navigate'||u.pathname.endsWith('.html'))){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&(u.origin===location.origin||u.hostname.includes('fonts.g'))){const c=res.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}return res})));
});
