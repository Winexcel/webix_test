<template>
  <div>
    <!--    <webix-ui :config='ui' :value="gridData"/>-->
    <div>Webix Content:</div>
    <div id="testA" style="width:450px; height:600px;"></div>
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
        autoheight: true,
        autowidth: true,
        fixedRowHeight: false,
        rowLineHeight: 25,
        rowHeight: 25,
        resizeColumn: true,
        columns: [
          {
            id: 'title',
            header: {
              text: 'A mul',
              css: 'multiline',
            },
            width: 220,
          },
          {
            id: 'year',
            header: {
              text: 'A muldwq wd qwd',
              css: 'multiline',
            },
            fillspace: true,
            sort: 'int',
          },
          {
            id: 'votes',
            header: {
              text: 'A muw ef efwfe fe wfe wef wfefe fe wfe fl',
              css: 'multiline',
            },
            css: 'test',
            width: 100,
            sort: 'int',
          },
        ],
        data: [{
          id: 'empty',
          title: 'HANKOK HANKOK HANKOK HANKOK HANKOK HANKOK HANKOK HANKOK HANKOKHANKOKHANKOKHANKOKHANKOKHANKOKHANKOK',
          year: 1994,
          votes: 678790,
        }],
        on: {
          onResize: window.webix.once(adjustHeaderHeight, this),
          onAfterLoad() {
            window.webix.delay(function () {
              this.adjustRowHeight('title', true);
              this.render();
            }, this);
          },
          onColumnResize() {
            this.adjustRowHeight('title', true);
            this.render();
          },
        },
      },
    };
  },
  mounted() {
    this.$webix.ready(() => {
      this.$webix.ui(this.config1);
    });
  },
};
</script>

<style>
.webix-table {

}

.test {
  background: red;
}

.multiline {
  line-height: 30px !important;
}
</style>
