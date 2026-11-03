const V = "mnoukgang-1.0.1";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(V).then(c => c.addAll(["./", "index.html", "lib/pixi.min.js", "img/anim.js"]))); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => { const r = e.request; if (r.method !== "GET") return; const page = r.mode === "navigate" || r.url.endsWith("index.html");
  e.respondWith(page ? fetch(r).then(x => { const y = x.clone(); caches.open(V).then(c => c.put(r, y)); return x; }).catch(() => caches.match(r).then(x => x || caches.match("index.html")))
    : caches.match(r).then(x => x || fetch(r).then(y => { if (y.ok) { const z = y.clone(); caches.open(V).then(c => c.put(r, z)); } return y; }))); });
