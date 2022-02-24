import Vue from 'vue';
import WebixPlugin from '@/plugins/webix';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(WebixPlugin);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
