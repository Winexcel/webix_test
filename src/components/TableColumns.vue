<template>
  <div>
    <q-checkbox
      :key="column.id"
      v-for="column in columns"
      v-model="column.isShowing"
      @input="$emit('toggle-column', column)"
      :label="column.header.text"/>
  </div>
</template>

<script>
export default {
  name: 'TableColumns',
  props: {
    columns: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
