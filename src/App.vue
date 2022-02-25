<template>
  <div ref="body">
    <div ref="tooltip" class="webix-tooltip" role="tooltip">
      <img class="webix-tooltip__image" style="width: 200px; height: 200px" :src="userAvatar">
      <div class="webix-tooltip__arrow" data-popper-arrow></div>
    </div>

    <div>Webix Content:</div>
    <webix-datatable :config='config1' :value="config1Data">
      <template #percent="row">
        Percent:&nbsp;<span style="color: red">{{ row.percent }}</span>
      </template>

      <template #product>
        Product
        <button class="delbtn" style="padding: 20px">Click</button>
      </template>
    </webix-datatable>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

function adjustHeaderHeight() {
  const { columns } = this.config;

  columns.reduce((acc, column) => {
    const header = column.header[0];

    // create a temp div
    const d = window.webix.html.create('DIV', { class: `webix_measure_size ${header.css}` }, '');
    d.style.cssText = `width:${column.width}px; height:auto; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;`;
    d.innerHTML = header.text;
    this.$view.appendChild(d);

    // get the necessary height
    header.height = d.scrollHeight;
    // remove the temp div
    window.webix.html.remove(d);

    return 60;
  }, 0);

  // apply new height
  this.refreshColumns();
}

export default {
  name: 'App',
  data() {
    return {
      userAvatar: '',
      config1: {
        view: 'datatable',
        css: 'webix-table',
        height: 500,
        // autoheight: true,
        // autowidth: true,
        fixedRowHeight: false,
        rowLineHeight: 25,
        rowHeight: 25,
        resizeColumn: true,
        columns: [
          {
            id: 'percent',
            header: {
              text: 'Упущен %',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'position',
            header: {
              text: 'Позиция',
              css: 'multiline',
            },
            template: (obj) => `<span>${obj.position.num}</span><span class="plus-position">+${obj.position.add}</span>`,
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'photo',
            header: {
              text: 'Фото',
              css: 'multiline',
            },
            template: '<img class="enlarge-image" src="#photo#" alt="avatar"/>',
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'vendor',
            header: {
              text: 'Артикул',
              css: 'multiline',
            },
            css: 'text-center',
            template: (row) => `${row.vendor ? `<a href="${row.vendor?.url}">${row.vendor?.code}</a>` : ''}`,
            width: 100,
            sort: 'int',
          },
          {
            id: 'salesChart',
            header: {
              text: 'График продаж',
              css: 'multiline',
            },
            template: this.$webix.Sparklines.getTemplate({
              type: 'bar',
              paddingY: 5,
              paddingX: 5,
              minHeight: 10,
            }),
            height: 200,
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'product',
            header: {
              text: 'Товар',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'brand',
            header: {
              text: 'Брэнд',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'seller',
            header: {
              text: 'Продавец',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'group',
            header: {
              text: 'Группа',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'remainder',
            header: {
              text: 'Остаток',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'reviews',
            header: {
              text: 'Отзывы',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'rating',
            header: {
              text: 'Рейтинг',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          {
            id: 'price',
            header: {
              text: 'Цена',
              css: 'multiline',
            },
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
        ],
        on: {
          onResize: window.webix.once(adjustHeaderHeight, this),
          onAfterLoad() {
            window.webix.delay(function () {
              this.adjustRowHeight(null, true);
              this.render();
            }, this);
          },
          onColumnResize() {
            this.adjustRowHeight(null, true);
            this.render();
          },
        },
        onClick: {
          delbtn: () => {
            console.log('delbtn');
          },
        },
      },
      config1Data: [
        {
          id: '1',
          percent: 1,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
          vendor: {
            code: '3452454243',
            url: 'https://ya.ru',
          },
          salesChart: [2000, 3000, 2100, 2500, 2000, 3000, 2100, 2500],
        },
        {
          id: '2',
          percent: 2,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar2.png',
        },
        {
          id: '3',
          percent: 3,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '4',
          percent: 4,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '5',
          percent: 5,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '6',
          percent: 6,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '7',
          percent: 7,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '8',
          percent: 8,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '9',
          percent: 9,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '10',
          percent: 10,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '11',
          percent: 20,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '12',
          percent: 20,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '13',
          percent: 20,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '14',
          percent: 20,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },
        {
          id: '15',
          percent: 20,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
        },

      ],
    };
  },
  mounted() {
    const { tooltip } = this.$refs;

    this.popperInstance = createPopper(tooltip, tooltip, {
      placement: 'right',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 12],
          },
        },
      ],
    });
    tooltip.removeAttribute('data-show');

    this.$refs.body.addEventListener('mouseover', (event) => {
      const el = event.target;
      if (el.tagName === 'IMG' && el.classList.contains('enlarge-image')) {
        this.userAvatar = el.getAttribute('src');
        this.popperInstance.state.elements.reference = event.target;
        tooltip.setAttribute('data-show', '');

        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        this.popperInstance.update();
      }
    });

    this.$refs.body.addEventListener('mouseout', () => {
      tooltip.removeAttribute('data-show');
    });
  },
  methods: {
    generateData() {
      this.config1Data = [];
      for (let i = 0; i < 10000; i++) {
        this.config1Data.push({
          id: i,
          percent: 1,
          position: {
            num: 1,
            add: 2,
          },
          photo: 'https://html5css.ru/howto/img_avatar.png',
          vendor: {
            code: '3452454243',
            url: 'https://ya.ru',
          },
          salesChart: [2000, 3000, 2100, 2500, 2000, 3000, 2100, 2500],
        });
      }
    },
    testHandler() {
      console.log('testHandler');
    },
  },
};
</script>

<style lang="scss">
.webix-table {
  border: none;

  .webix_ss_vscroll_header {
    border: none;
  }

  .enlarge-image {
    border-radius: 10px;
    transition: all 0.5s;
    width: 50px;
    height: 50px;

    :hover {
      animation: image-zoom ease-in 2s forwards;
    }
  }

  .webix_ss_center_scroll {
    overflow: unset;
  }

  .plus-position {
    display: inline-flex;
    padding: 5px;
    border-radius: 3px;
    background: #e6f9ed;
    color: #23be66;
    line-height: 100%;
    font-weight: 500;
    margin-left: 8px;
  }

  .webix_hcolumn {
    border-right: 1px solid #e9e9e9;
    border-bottom: none;
  }

  .webix_ss_header .webix_hcolumn div.webix_last_row, .webix_dtable .webix_ss_header
  .webix_span.webix_last_row {
    border-bottom: none;
  }

  .webix_column.text-center .webix_cell {
    display: flex;
    align-items: center;
  }

  .webix_ss_header, .webix_hcolumn, .webix_ss_vscroll_header, .webix_dd_drag_column,
  .webix_hs_left, .webix_hs_center, .webix_hs_right {
    background: transparent;
  }
}

.multiline {
  line-height: 30px !important;
}
</style>

<style lang="scss" scoped>
.webix-tooltip {
  display: block;
  z-index: 1;
  opacity: 0;
  background: #f1f1f1;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
  transition: opacity .3s;
  pointer-events: none;
}

.webix-tooltip[data-show] {
  opacity: 1;
}

.webix-tooltip__arrow,
.webix-tooltip__arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #f1f1f1;
}

.webix-tooltip__arrow {
  visibility: hidden;
}

.webix-tooltip__arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.webix-tooltip[data-popper-placement^='top'] > .webix-tooltip__arrow {
  bottom: -4px;
}

.webix-tooltip[data-popper-placement^='bottom'] > .webix-tooltip__arrow {
  top: -4px;
}

.webix-tooltip[data-popper-placement^='left'] > .webix-tooltip__arrow {
  right: -4px;
}

.webix-tooltip[data-popper-placement^='right'] > .webix-tooltip__arrow {
  left: -4px;
}
</style>
