import './styles.css';
import './App';

import { isDev } from './app/vendor/helpers';

!isDev &&
  'serviceWorker' in navigator &&
  navigator.serviceWorker.register('service-worker.js');
