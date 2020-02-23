import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

skipWaiting();
clientsClaim();

registerRoute(
  new RegExp(/\.(?:png|gif|jpg|svg|ico|webp)$/),
  new CacheFirst({
    cacheName: 'image-cache-vue',
  }),
  'GET'
);

new NavigationRoute('/index.html');

// The precache routes for workbox-webpack-plugin
precacheAndRoute(self.__WB_MANIFEST);

// listen to the install event
self.addEventListener('install', event => console.log('SW installed', event));

const sendNotificationDoneMessage = (notification, action = 'clicked') =>
  self.clients.matchAll().then(clients => {
    // Send the event to the client(s)
    clients.forEach(client => {
      client.postMessage({
        type: 'notification-' + action,
        messageId: notification.tag,
      });
    });
  });

// listen to a notification click
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const url = notification.data.url; // get the url passed on app/List/PushReminder.jsx#L73

  // get all bowser tabs controlled by this SW
  const eventWaitUntilFullfilled = self.clients.matchAll().then(clients => {
    // open the application on the client
    // check if there is already a tab with the url that should be opened
    let windowToFocus = false;
    clients.forEach(windowClient => {
      if (windowClient.url === url) {
        windowClient.focus(); // focus if url match
        windowToFocus = windowClient;
      }
    });

    if (!windowToFocus) {
      // if no window already open, open a new
      self.clients
        .openWindow(url)
        .then(windowClient => (windowClient ? windowClient.focus() : null));
    }

    // close the notification
    notification.close();
    return sendNotificationDoneMessage(notification);
  });

  // waitUntil needs a promise as argument. If not, the client.focus() and self.clients.openWindow() will fail
  event.waitUntil(eventWaitUntilFullfilled);
});

// listen to the notification close
self.addEventListener('notificationclose', event =>
  event.waitUntil(sendNotificationDoneMessage(event.notification, 'closed'))
);
