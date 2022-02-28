import Vue from 'vue';
import Vuex from 'vuex';
import sales from '@/store/modules/sales';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { sales },
  plugins: [createPersistedState()],
});

export default store;
