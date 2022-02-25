import Vue from 'vue';
import * as webix from 'webix';

const { $$ } = webix;

function dataHandler(value) {
  const newValue = value;
  const view = $$(this.webixId);

  if (typeof value === 'object') {
    if (view.setValues) {
      view.setValues(newValue);
    } else if (view.parse) {
      view.clearAll();
      view.parse(newValue);
    }
  } else if (view.setValue) view.setValue(newValue);

  const subs = view.queryView((sub) => sub.hasEvent && sub.hasEvent('onValue'), 'all');

  if (subs.length) {
    for (let i = 0; i < subs.length; i += 1) {
      subs[i].callEvent('onValue', [newValue]);
    }
  }
}

// const Profile = Vue.extend({
//   render() {
//     return this.$slots.default;
//   },
//   data() {
//     return {
//       firstName: 'Уолтер',
//       lastName: 'Уайт',
//       alias: 'Гейзенберг',
//     };
//   },
// });
// // создаёт экземпляр Profile и монтирует его к элементу DOM
// const instance = new Profile({});
// const node = instance.$createElement('div', ['Hello']);
// instance.$slots.default = [node];
// instance.$mount(document.body);

Vue.component('webix-datatable', {
  props: ['config', 'value', 'webix'],
  watch: {
    value: {
      handler: dataHandler,
    },
  },
  render(h) {
    // renderer.$mount(document.body);

    const slotColumns = Object.keys(this.$scopedSlots);

    this.config.columns.forEach((column) => {
      const columnName = column.id;
      if (slotColumns.includes(columnName)) {
        // let comp = h(this.$scopedSlots[columnName]()[0]);
        // console.log(comp);
        // comp = new Vue(comp);
        // comp.$mount(document.body);

        // eslint-disable-next-line no-param-reassign
        column.template = (row) => this.$scopedSlots[columnName](row)[0].text;
      }
    });

    return h('div');
  },
  mounted() {
    webix.ready(() => {
      const config = webix.copy(this.config);
      config.$scope = this;

      this.webixId = webix.ui(config, this.$el);
      if (this.value) dataHandler.call(this, this.value);
      this.webixId.adjust();

      window.addEventListener('resize', this.resizeHandler);

      this.$emit('update:webix', this.webixId);
    });
  },
  beforeDestroy() {
    this.$emit('update:webix', null);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler);

    webix.$$(this.webixId)
      .destructor();
  },
  methods: {
    getTemplates() {

    },
    resizeHandler() {
      this.webixId.adjust();
    },
  },
});
