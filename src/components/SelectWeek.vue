<template>
  <v-select
      :style="{maxWidth: '25vw'}"
      v-model="select"
      :items="items"
      item-text="text"
      item-value="value"
      @change="$store.dispatch('selectWeek', select)"
  >
  </v-select>
</template>

<script>
export default {
  name: "SelectWeek",
  data() {
    return {
      items: this.$store.getters.getWeeks.items,
      select: this.$store.getters.getWeeks.select
    }
  }
}
</script>

<style scoped>

</style>