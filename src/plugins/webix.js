// webix
import * as webix from 'webix/webix';
import 'webix/webix.css';
import '@/vendor/webix/webix-controls';
import '@/vendor/webix/webix-ui';
import '@/vendor/webix/webix-vue-view';

const webixPlugin = {
  install(VueInstance) {
    webix.debug = true;

    window.webix = webix;
    // eslint-disable-next-line no-param-reassign
    VueInstance.prototype.$webix = webix;
  },
};

export default webixPlugin;
