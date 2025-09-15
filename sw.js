const CACHE_NAME = 'dbms-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // add icons if needed: './icons/icon-192.png','./icons/icon-512.png'
];

// Install event
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Fetch event
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
