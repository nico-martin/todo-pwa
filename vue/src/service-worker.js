workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
  new RegExp(/\.(?:png|gif|jpg|svg|ico|webp)$/),
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
  }),
  new workbox.strategies.NetworkFirst({
    cacheName: 'iindex-cache',
  })
);

workbox.routing.registerNavigationRoute('/index.html');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
