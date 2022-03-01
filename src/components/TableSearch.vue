<template>
  <q-input
    :value="search" @input="$emit('update:search', $event)" style="width: 300px" dense outlined
    label="Поиск">
    <template v-slot:append>
      <i style="font-size:15px" class="fa-solid fa-magnifying-glass"></i>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'TableSearch',
  props: {
    search: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped>

</style>
