<template>
  <q-dialog :value="show" @input="$emit('update:show', $event)">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Поля таблицы</div>
        <q-space/>

        <q-btn flat round dense v-close-popup>
          <i style="font-size: 15px" class="fa-solid fa-xmark"></i>
        </q-btn>
      </q-card-section>

      <q-card-section>
        <div>
          <div>
            <q-checkbox
              :key="column.id"
              v-for="column in columnsState"
              @input="toggleColumn(column, !column.isShowing)"
              :value="column.isShowing"
              :label="column.text"/>
          </div>

          <q-btn
            outline
            color="grey-5"
            class="reset-button"
            @click="resetSettings">Сбросить настройки
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>
export default {
  name: 'TableColumns',
  props: {
    show: {
      required: true,
      type: Boolean,
    },
    columns: {
      required: true,
      type: Array,
    },
    datatable: {
      type: Object,
    },
  },
  methods: {
    resetSettings() {
      this.datatable.setState(this.$webix.storage.local.get('originalState'));
      this.$webix.storage.local.put('state', null);
    },
    toggleColumn(column, isShowing) {
      if (isShowing) {
        this.datatable.showColumn(column.id);
      } else {
        this.datatable.hideColumn(column.id);
      }

      this.$webix.storage.local.put('state', this.datatable.getState());
    },
  },
  computed: {
    columnsState() {
      if (!this.datatable) {
        return [];
      }

      const tableColumnsState = this.datatable.getState().ids;
      return this.columns.map((column) => ({
        id: column.id,
        text: Array.isArray(column.header) ? column.header[0].text : column.header.text,
        isShowing: !!tableColumnsState.find((item) => item === column.id),
      }));
    },
  },
};
</script>

<style scoped>
.reset-button {
  margin-top: 10px;
}

</style>
