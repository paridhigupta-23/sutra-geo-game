const CACHE = 'sutra-geo-v7';

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Always fetch HTML pages from the network.
    if (
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('/')
    ) {
        event.respondWith(
            fetch(event.request, {
                cache: 'no-store'
            }).catch(() => caches.match(event.request))
        );

        return;
    }

    // Other files use network first, then cache.
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});