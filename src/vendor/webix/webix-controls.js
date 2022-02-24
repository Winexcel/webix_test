import Vue from 'vue';
import * as webix from 'webix';

const { $$ } = webix;

(function () {
  const one = ['text', 'search', 'slider', 'checkbox', 'colorpicker', 'datepicker', 'counter', 'richtext', 'textarea', 'tabbar', 'segmented', 'combo', 'richselect', 'multicombo', 'select', 'button', 'radio'];
  const props = ['label', 'labelWidth', 'options', 'labelPosition'];
  const propsHandler = function (name) {
    return function (value) {
      const self = webix.$$(this.webixId);
      self.config[name] = value;
      self.render();
    };
  };

  function addInput(name) {
    const handlers = {
      value: {
        handler(value) {
          const self = webix.$$(this.webixId);
          self.setValue(value);
        },
      },
    };
    for (let i = 0; i < props.length; i += 1) handlers[props[i]] = propsHandler(props[i]);

    Vue.component(`webix-${name}`, {
      props: ['value', 'label', 'labelWidth', 'options', 'labelPosition', 'id'],
      template: '<div></div>',
      watch: handlers,

      mounted() {
        const config = {
          view: name,
          value: this.value,
        };

        if (this.label) config.label = this.label;
        if (this.labelWidth) config.labelWidth = this.labelWidth;
        if (this.labelPosition) config.labelPosition = this.labelPosition;
        if (this.options) config.options = webix.copy(this.options);

        this.webixId = webix.ui(config, this.$el);

        const context = this;
        $$(this.webixId).attachEvent('onChange', function () {
          const value = this.getValue();
          if (context.value !== value) context.$emit('input', value);
        });
      },
      destroyed() {
        webix.$$(this.webixId).destructor();
      },
    });
  }

  for (let i = 0; i < one.length; i += 1) addInput(one[i]);
}());
