import Vue from 'vue';
import * as webix from 'webix';

const { $$ } = webix;

function dataHandler(value, oldValue) {
  const newValue = value;
  const view = $$(this.webixId);

  if (typeof value === 'object') {
    if (view.setValues) {
      view.setValues(newValue);
    } else if (view.parse) {
      const parsedValue = JSON.stringify(value);
      const parsedOldValue = JSON.stringify(oldValue);
      if (parsedValue !== parsedOldValue) {
        view.clearAll();
      }

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

const VNoneToHtml = Vue.extend({
  props: ['vnode'],
  render(h) {
    return h('div', [this.vnode]);
  },
});

Vue.component('webix-datatable', {
  props: ['config', 'value', 'webix'],
  watch: {
    value: {
      deep: true,
      handler: dataHandler,
    },
  },
  data() {
    return {
      templates: {},
      oldValue: null,
    };
  },
  render(h) {
    const slotColumns = Object.keys(this.$scopedSlots);

    this.config.columns.forEach((column) => {
      const columnName = column.id;
      if (slotColumns.includes(columnName)) {
        // eslint-disable-next-line no-param-reassign
        column.template = (...params) => {
          const node = new VNoneToHtml({
            propsData: { vnode: this.$scopedSlots[columnName](params[0]) },
          });
          node.$mount();

          return node.$el.innerHTML;
        };
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
