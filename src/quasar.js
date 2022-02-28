import Vue from 'vue';

import './styles/quasar.scss';
import iconSet from 'quasar/icon-set/fontawesome-v5.js';
import lang from 'quasar/lang/ru.js';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import { Quasar } from 'quasar';

Vue.use(Quasar, {
  config: {},
  plugins: {
  },
  lang,
  iconSet,
});
