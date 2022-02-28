import * as webix from 'webix';

webix.protoUI({
  name: 'vue',
  $init(config) {
    const vtm = config.template;
    const id = `vue_${webix.uid()}`;
    this.$vueData = config.data;

    delete config.data;
    config.template = `<div id='${id}'></div>`;

    this.attachEvent('onAfterRender', function () {
      this.$vue = new Vue({
        el: `#${id}`,
        template: vtm,
        data: this.$vueData,
        watch: this.config.watch,
      });
    });
  },
  getVue() {
    return this.$vue;
  },
  setValues(value) {
    if (this.$vue) {
      for (const key in value) {
        if (typeof this.$vueData[key] !== 'undefined') this.$vue.$set(this.$vue.$data, key, value[key]);
      }
    } else this.$vueData = value;
  },
}, webix.ui.template);
