# The ToDo PWA

This project demonstrates some of the latest progressive web app features.

The functionality is quite simple: It's a Webapp thet halps you to manage ToDos.  
For demo purposes I created the same App in [VueJS](https://vuejs.org) and [Preact](https://preactjs.com), which uses the same syntax like [React](https://reactjs.org).

VueJS: https://github.com/nico-martin/todo-pwa/tree/master/vue  
(P)ReactJS: https://github.com/nico-martin/todo-pwa/tree/master/preact

## Basic Setup

I'm using a quite basic [Webpack](https://webpack.js.org) setup that compiles and bundles my Vue and JSX files.  
I'm then using [TailwindCSS](https://tailwindcss.com/) as a CSS Framework because in this case I just wantend something pretty without having to care about the architecture.

## Offline usage

### ServiceWorker

A [ServiceWorker](https://web.dev/service-workers-cache-storage/) is a JavaScript file that lives in a special scope of the browser and runs even if the browser is closed.

This App uses the `InjectManifest` method from [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) to add generated files to the ServiceWorker so they will be precached. Additionally, it allows us to add more ServiceWorker event listeners if we need to ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/service-worker.js#L23) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/service-worker.js#L23)).

The ServiceWorker then needs to be registered from JavaScript ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/index.js#L9) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/index.js#L8)).

### IndexedDB

The [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is a Non-relational database (an Object Store) inside the Browser. In this example I'm using [idb](https://github.com/jakearchibald/idb), a promise based wrapper around the IndexedDB API ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/vendor/db.js) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/vendor/db.js)). This app uses the IndexedDB to store ToDo items persistently ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/App.vue#L60-L71) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/App.jsx#L29-L36))

Please note that "peristance" is still managed by the browser. In version 52, Chrome introduced the [Persistent Storage API](https://developers.google.com/web/updates/2016/06/persistent-storage) that would assure the data won't be deleted if the app matches one or more defined criterias.

## Web App Manifest

I'm using [Webpack PWA Manifest](https://github.com/Diokuz/webpack-pwa-manifest) to generate a Manifest File that provides all the information to make the app "installable" ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/webpack.config.babel.js#L111) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/webpack.config.babel.js#L111))

### Add to Homescreem

Instead of using the native add to homescreen promit I added a custom "add to homescreen" button. Therefore I catched the `beforeinstallprompt` event and implemented my own button ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/A2H.vue) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/A2H.jsx))

### Web Share API

The [web share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) allows us to share data from our web app the same way we do from our iOS and Android apps.

Therefor we only need to call the `navigator.share`-Method with a set of data. ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/Header.vue#L28-L33) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/Header.jsx#L12-L17))

### Share Tagret API

The [Share Target API](https://web.dev/web-share-target/) allows your app to be registered as a share target so it appears in the share modal whenever you want to share something using the native share propmpt. ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/webpack.config.babel.js#L128) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/webpack.config.babel.js#L128))  
The incoming Share-Requests can then be handeled inside your application ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/Form.vue#L35) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/Form.jsx#L12))

## Push Notifications

This App uses the [Notification Triggers API](https://web.dev/notification-triggers/) to display scheduled push notifications. If you click on the little bell right to the todo item you can select a time when you want to recieve a reminder.

It schedules a new notification in the app ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/List/PushReminder.vue#L112-L221) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/List/PushReminder.jsx#L77-L86)). The Push Notification can then be handled inside the ServiceWorker. For example to open the app or focus an already opened window if the user clicks on the notification ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/service-worker.js#L46-L58) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/service-worker.js#L46-L58)). It's also possible for the ServiceWorker to send messages to the app using ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/service-worker.js#L25-L34) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/service-worker.js#L25-L34)) that can then be processed within the app ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/List/PushReminder.vue#L52-L65) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/List/PushReminder.jsx#L15-L28)).

## Contact Picker API

The [Contact Picker API](https://web.dev/contact-picker/) opens a modal that allows the user to choose one or more contacts. This information can then be used by the Webapp. ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/Form/ContactPicker.vue#L41-L49) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/Form/ContactPicker.jsx#L25-33))
