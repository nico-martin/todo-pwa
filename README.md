# The ToDo PWA

This project demonstrates some of the latest progressive web app features.

The functionality is quite simple: It's a Webapp thet halps you to manage ToDos.  
For demo purposes I created the same App in VueJS and Reacr, which uses the same syntax like React.

VueJS: https://github.com/nico-martin/todo-pwa/tree/master/vue  
(P)ReactJS: https://github.com/nico-martin/todo-pwa/tree/master/preact

## Basic Setup

I'm using a quite basic Webpack setup that compiles and bundles my Vue and JSX files.  
I'm then using [TailwindCSS](https://tailwindcss.com/) as a CSS Framework because in this case I just wantend something pretty without having to care about the architecture.

## Offline usage

### ServiceWorker

// Todo: switch to InjectManifest

### IndexedDB

The [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is a Non-relational database (an Object Store) inside the Browser. In this example I'm using [idb](https://github.com/jakearchibald/idb), a promise based wrapper around the IndexedDB API ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/vendor/db.js) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/vendor/db.js)). This app uses the IndexedDB to store ToDo items persistently ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/App.vue#L60-L71) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/App.jsx#L29-L36))

Please not that "peristance" is still managed by the browser. In version 52, Chrome introduced the [Persistent Storage API](https://developers.google.com/web/updates/2016/06/persistent-storage) that would assure the data won't be deleted if the app matches one or criterias.

## Web App Manifest

I'm using [Webpack PWA Manifest](https://github.com/Diokuz/webpack-pwa-manifest) to generate a Manifest File that provides all the information to make the app "installable" ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/webpack.config.babel.js#L111) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/webpack.config.babel.js#L111))

### Add to Homescreem

Instead of using the native add to homescreen promit I added a custom "add to homescreen" button. Therefore I catched the `beforeinstallprompt` event and implemented m own button ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/A2H.vue) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/A2H.jsx))

### Share Tagret API

The [Share Target API](https://web.dev/web-share-target/) allows your app to be registered as a share target so it appears in the share modal whenever you want to share something using the native share propmpt. ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/webpack.config.babel.js#L128) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/webpack.config.babel.js#L128))  
The incoming Share-Requests can then be handeled inside your application ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/Form.vue#L35) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/Form.jsx#L12))

## Push Notifications

This App uses the [Notification Triggers API](https://web.dev/notification-triggers/) to display scheduled push notifications. If you click on the little bell right to the todo item you can select a time when you want to recieve a reminder. ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/List/PushReminder.vue) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/List/PushReminder.jsx))

## Contact Picker API

The [Contact Picker API](https://web.dev/contact-picker/) opens a modal that allows the user to choose one or more contacts. This information can then be used by the Webapp. ([VueJS](https://github.com/nico-martin/todo-pwa/blob/master/vue/src/app/Form/ContactPicker.vue#L41-L49) / [PreactJS](https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/Form/ContactPicker.jsx#L25-33))
