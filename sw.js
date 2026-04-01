const CACHE_NAME = 'iron-v1.4.4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './js/main.js',
  './js/dbm.js',
  './js/rails.js',
  './js/legends.js',
  './css/style.css',
  './assets/icons/icon-192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
