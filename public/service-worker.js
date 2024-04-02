// public/service-worker.js

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// Optionally, you can add custom routes or caching strategies

// Example: Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Example: Cache the Google Fonts webfonts with a cache-first strategy for 1 year
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
    ],
  })
);
