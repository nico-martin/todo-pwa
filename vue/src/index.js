import './styles.css';
import Vue from 'vue';
import App from './App.vue';

import { isDev } from './app/vendor/helpers';

!isDev &&
  'serviceWorker' in navigator &&
  navigator.serviceWorker.register('service-worker.js');

new Vue({
  el: '#app',
  render: h => h(App),
});
