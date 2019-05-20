importScripts("/precache-manifest.6a25943a31da86e56c0408b4a7e4c8ea.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

const thirtyDays = 30 * 24 * 60 * 60;
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
    '/',
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp('\\.html$'),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    new RegExp('/.\\.js$'),
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
    /\/media\/catalog.*\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'catalog',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: thirtyDays // 30 Days
            })
        ]
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: thirtyDays // 30 Days
            })
        ]
    })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.

// TODO: Add fallbacks

