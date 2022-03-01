<template>
  <q-checkbox
    style="margin-left: 20px" :value="onlyFavorites" @input="$emit('update:only-favorites', $event)"
    label="Только избранное"/>
</template>

<script>
export default {
  name: 'TableFavorites',
  props: {
    onlyFavorites: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<style scoped>

</style>
