import Vue from 'vue';
import WebixPlugin from '@/plugins/webix';
import store from '@/store';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(WebixPlugin);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
