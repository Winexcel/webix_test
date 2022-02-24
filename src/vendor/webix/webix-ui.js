import Vue from 'vue';
import * as webix from 'webix';

const { $$ } = webix;

function dataHandler(value) {
  let newValue = value;
  const view = $$(this.webixId);

  if (typeof value === 'object') {
    if (this.copyData) newValue = webix.copy(newValue);

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

Vue.component('webix-ui', {
  props: ['config', 'value', 'copyData'],
  watch: {
    value: {
      handler: dataHandler,
    },
  },

  render(h) {
    return h('div');
  },

  mounted() {
    const config = webix.copy(this.config);
    config.$scope = this;

    this.webixId = webix.ui(config, this.$el);
    if (this.value) dataHandler.call(this, this.value);

    window.addEventListener('resize', this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler);

    webix.$$(this.webixId)
      .destructor();
  },

  methods: {
    resizeHandler() {
      this.webixId.adjust();
    },
  },
});
