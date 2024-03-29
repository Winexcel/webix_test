<template>
  <div id="app" ref="body">

    <button @click="filterTable">Filter</button>

    <TableColumns :show.sync="showDialog" :columns="config1.columns" :datatable="datatable"/>

    <h5 class="app__header">Товары в категории</h5>

    <div class="table-settings">
      <div class="table-settings__search">
        <TableSearch :search.sync="searchFilter"/>
        <TableFavorites :only-favorites.sync="onlyFavorites"/>
      </div>
      <div>
        <q-btn outline color="grey-5" @click="showDialog = !showDialog">
          <i style="margin-right: 10px" class="fa-solid fa-gear"></i>
          Настройка таблицы
        </q-btn>
      </div>
    </div>

    <div ref="tooltip" class="webix-tooltip" role="tooltip">
      <img class="webix-tooltip__image" style="width: 200px; height: 200px" :src="userAvatar">
      <div class="webix-tooltip__arrow" data-popper-arrow></div>
    </div>

    <webix-datatable
      @init="datatableInit"
      style="margin-top: 30px" :config='config1' :value="salesData" :webix.sync="datatable">
      <template #position="row">
        <span>{{ row.position.num }}</span><span class="plus-position">+{{
          row.position.add
        }}</span>
      </template>

      <template #vendor="row">
        <a v-if="row.vendor" class="link" :href="row.vendor.url">{{ row.vendor.code }}</a>
        <div>
          <button class="vendor__add-favorites add-favorites">

            <i
              v-if="row.$_info && row.$_info.favorite"
              class="add-favorites__icon fa-solid fa-heart"></i>
            <i
              v-else
              class="add-favorites__icon fa-regular fa-heart"></i>
          </button>
        </div>
      </template>

      <template #product="row">
        <a class="link" v-if="row.product" :href="row.product.link">{{ row.product.name }}</a>
      </template>

      <template #brand="row">
        <a class="link" v-if="row.brand" :href="row.brand.link">{{ row.brand.name }}</a>
      </template>

      <template #seller="row">
        <a class="link" v-if="row.seller" :href="row.seller.link">{{ row.seller.name }}</a>
      </template>

      <template #group="row">
        {{ row.group }}
      </template>

    </webix-datatable>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import TableColumns from '@/components/TableColumns.vue';
import TableSearch from '@/components/TableSearch.vue';
import TableFavorites from '@/components/TableFavorites.vue';

function adjustHeaderHeight() {
  const { columns } = this.config;

  columns.reduce((acc, column) => {
    const header = column.header[0];

    // create a temp div
    const d = window.webix.html.create('DIV', { class: `webix_hcell ${header.css}` }, '');
    d.style.cssText = `width:${column.width}px; padding: 0px 12px 0px 12px;line-height: 30px; height:auto; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;`;
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
  components: {
    TableFavorites,
    TableSearch,
    TableColumns,
  },
  data() {
    return {
      showDialog: false,
      onlyFavorites: false,
      userAvatar: '',
      datatable: null,
      config1: {
        view: 'datatable',
        css: 'webix-table',
        dragColumn: true,
        height: 500,
        // autoheight: true,
        // autowidth: true,
        fixedRowHeight: false,
        rowLineHeight: 30,
        rowHeight: 25,
        resizeColumn: true,
        columns: [
          {
            id: 'percent',
            header: {
              text: 'Упущен %',
              css: 'header header_multiline header_h-end header_v-center',
            },
            css: 'col col_v-center col_h-end',
            width: 100,
            sort: 'int',
          },
          {
            id: 'position',
            header: {
              text: 'Позиция',
              css: 'header header_multiline header_h-end header_v-center',
            },
            css: 'col col_v-center col_h-end',
            width: 100,
            sort: (a, b) => a.position.num - b.position.num,

          },
          {
            id: 'photo',
            header: {
              text: 'Фото',
              css: 'header header_multiline header_h-end header_v-center',
            },
            template: async (obj) => {
              const promise = new Promise((resolve) => {
                console.log(obj.photo);
                const img = new Image();
                img.onload = function () {
                  console.log('image is loaded');
                };
                img.src = obj.photo;

                resolve();
              });

              promise.then((data) => {
                console.log(data);
              });

              return Promise.resolve(`<img class="enlarge-image" src="${obj.photo}" alt="avatar"/>`);
            },
            css: 'col col_v-center col_h-end',
            width: 100,
            sort: 'string',

          },
          {
            id: 'vendor',
            header: {
              text: 'Артикул',
              css: 'header header_multiline header_h-start header_v-center',
            },
            css: 'col col_wrap col_v-center col_h-start',
            width: 180,
            sort: 'string',

          },
          {
            id: 'salesChart',
            header: {
              text: 'График продаж',
              css: 'header header_multiline header_h-start header_v-center',
            },
            template: this.$webix.Sparklines.getTemplate({
              type: 'bar',
              color: '#5B98F5',
              paddingY: 5,
              paddingX: 5,
              minHeight: 10,
            }),
            css: 'col col_v-center col_h-center',
            width: 300,
            sort: 'int',

          },

          {
            id: 'product',
            header: [
              {
                text: 'Товар',
                css: 'header header_multiline header_h-start header_v-center',
              },
              {
                content: 'textFilter',
                compare: this.productFilter,
              },
            ],
            css: 'col col_v-center col_h-start',
            width: 200,
            sort: 'string',

          },
          {
            id: 'brand',
            header: {
              text: 'Брэнд',
              css: 'header header_multiline header_h-start header_v-center',
            },
            css: 'col col_v-center col_h-start',
            width: 200,
            sort: 'int',

          },
          {
            id: 'seller',
            header: {
              text: 'Продавец',
              css: 'header header_multiline header_h-start header_v-center',
            },
            css: 'col col_v-center col_h-start',
            width: 200,
            sort: 'int',

          },
          {
            id: 'group',
            header: [{
              text: 'Группа',
              css: 'header header_multiline header_h-start header_v-center',
            }, {
              content: 'textFilter',
            }],
            css: 'col col_v-center col_h-start',
            width: 200,
            sort: 'string',

          },
          {
            id: 'remainder',
            header: {
              text: 'Остаток',
              css: 'header header_multiline header_h-start header_v-center',
            },
            css: 'col col_v-center col_h-start',
            width: 200,
            sort: 'int',

          },
          {
            id: 'reviews',
            header: {
              text: 'Отзывы',
              css: 'header header_multiline header_h-start header_v-center',
            },
            css: 'col col_v-center col_h-center',
            width: 100,
            sort: 'int',

          },
          {
            id: 'rating',
            header: {
              text: 'Рейтинг',
              css: 'header header_multiline header_h-start header_v-center',
            },
            css: 'col col_v-center col_h-center',
            width: 100,
            sort: 'int',

          },
          {
            id: 'price',
            header: [
              {
                text: 'Цена',
                css: 'header header_multiline header_h-start header_v-center',
              },
              { content: 'numberFilter' },
            ],
            css: 'col col_v-center col_h-center',
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
            adjustHeaderHeight.call(this);
            this.adjustRowHeight(null, true);
            this.render();
          },
        },
        onClick: {
          'add-favorites': (event, column) => {
            const rowId = column.row;
            this.$store.commit('sales/toggleFavorite', rowId);
          },
        },
      },
      searchFilter: '',
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
    productFilter(value, filter) {
      return value.name.toLowerCase()
        .includes(filter.toLowerCase());
    },
    toggleColumn(column) {
      this.$webix.storage.local.put('state', this.datatable.getState());

      if (!column.isShowing) {
        this.datatable.hideColumn(column.id);
      } else {
        this.datatable.showColumn(column.id);
      }
    },
    filterTable() {
      this.datatable.filter((obj) => {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i += 1) {
          const prop = obj[keys[i]];

          if (typeof prop === 'object') {
            const propKeys = Object.keys(prop);

            for (let j = 0; j < propKeys.length; j += 1) {
              if (String(prop[propKeys[j]])
                .toLowerCase()
                .includes(this.searchFilter.toLowerCase())) {
                return true;
              }
            }
          }
          if (String(prop)
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase())) {
            return true;
          }
        }

        return false;
      });
    },
    datatableInit() {
      if (this.datatable) {
        this.$webix.storage.local.put('originalState', this.datatable.getState());
        const state = this.$webix.storage.local.get('state');
        this.datatable.setState(state);

        console.log(this.$webix.$$);

        this.datatable.attachEvent('onSubViewRender', (item, node) => {
          console.log('A subview is rendered');
        });

        this.datatable.attachEvent('onAfterUpdate', (response, id, object) => {
          // ... some code here ...
          console.log('onAfterUpdate');
        });

        this.datatable.attachEvent('onAfterScroll', () => {
          // your code here
          console.log('onAfterScroll');
        });

        this.datatable.attachEvent('onAfterRender', () => {
          // your code here
          console.log('onAfterRender');
        });

        this.datatable.attachEvent('onSubViewCreate', () => {
          // your code here
          console.log('onSubViewCreate');
        });
      }
    },
  },
  watch: {
    searchFilter() {
      this.filterTable();
    },
  },
  computed: {
    salesData() {
      const { data } = this.$store.state.sales;

      let filteredData = data;

      if (this.onlyFavorites) {
        filteredData = filteredData.filter((item) => item.$_info.favorite);
      }

      return filteredData;
    },
  },
};
</script>

<style lang="scss">
#app {
  margin: 0 10px;
}

.app {
  &__header {
    margin: 20px 0;
  }
}

.q-btn__content {
  color: black;
}

.add-favorites {
  margin-left: 20px;
  height: 50px;
  outline: none;
  background: none;

  &__icon {
    color: #334752;
    font-size: 18px;
  }
}

.webix-table {

  .webix_hcell {
    border-bottom: none !important;
  }

  .webix_sparklines_origin {
    visibility: hidden;
  }

  .link {
    color: #5B98F5;

    &:visited {
      color: #5B98F5;
    }
  }

  border: none;

  .webix_hcell {
    .webix_ss_sort_single {
      position: static;
      line-height: inherit;
      height: auto !important;
      margin-top: 0;
    }
  }

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

  .webix_column.col .webix_cell {
    display: flex;
  }

  .webix_column.col_wrap .webix_cell {
    flex-wrap: wrap;
  }

  .webix_column.col_v-top .webix_cell {
    align-items: flex-start;
  }

  .webix_column.col_v-center .webix_cell {
    align-items: center;
  }

  .webix_column.col_v-bottom .webix_cell {
    align-items: flex-end;
  }

  .webix_column.col_h-start .webix_cell {
    justify-content: flex-start;
  }

  .webix_column.col_h-center .webix_cell {
    justify-content: center;
  }

  .webix_column.col_h-end .webix_cell {
    justify-content: flex-end;
  }

  .webix_ss_header, .webix_hcolumn, .webix_ss_vscroll_header, .webix_dd_drag_column,
  .webix_hs_left, .webix_hs_center, .webix_hs_right {
    background: transparent;
  }
}

.header {
  display: flex;

  &_multiline {
    line-height: 30px !important;
  }

  &_h {
    &-start {
      justify-content: flex-start;
    }

    &-center {
      justify-content: center;
    }

    &-end {
      justify-content: flex-end;
    }
  }

  &_v {
    &-top {
      align-items: flex-start;
    }

    &-center {
      align-items: center;
    }

    &-bottom {
      align-items: flex-end;
    }
  }

  &_multiline {
    line-height: 30px !important;
  }
}

.multiline {
  line-height: 30px !important;
}

.table-settings {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__search {
    display: flex;
  }
}

h5 {

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
