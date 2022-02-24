<template>
  <div>
    <div>Webix Content:</div>
    {{ config1Data }}
    <webix-ui :config='config1' :value="config1Data"/>
    <button @click="changeData">Change</button>
    <div id="testA" style="height:600px;"></div>
  </div>
</template>

<script>
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
      config1: {
        container: 'testA',
        view: 'datatable',
        css: 'webix-table',
        scroll: false,
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
          },
          {
            id: 'position',
            header: {
              text: 'Позиция',
              css: 'multiline',
            },
            template(obj) {
              return `<span>${obj.position.num}</span><span class="plus-position">+${obj.position.add}</span>`;
            },
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
            template: '<img style="width: 50px; height: 50px" src="#photo#" alt="avatar"/>',
            css: 'text-center',
            width: 100,
            sort: 'int',
          },
          /*          {
                      id: 'vendorCode',
                      header: {
                        text: 'Артикул',
                        css: 'multiline',
                      },
                      css: 'text-center',
                      width: 100,
                      sort: 'int',
                    },
                    {
                      id: 'salesChart',
                      header: {
                        text: 'График продаж',
                        css: 'multiline',
                      },
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
                    }, */
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
      },
      config1Data: [{
        id: '1',
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
    // this.$webix.ready(() => {
    //   this.$webix.ui(this.config1);
    // });
  },
  methods: {
    changeData() {
      const newArr = [...this.config1Data];
      newArr[0].title = 'abcd';
      this.config1Data = newArr;
    },
  },
};
</script>

<style lang="scss">
.webix-table {
  border: none;

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
