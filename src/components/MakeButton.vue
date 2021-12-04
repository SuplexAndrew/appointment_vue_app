<template>
      <v-btn
          color="rgba(121,9,79,1)"
          dark
          @click="click"
      >
        Записаться на прием
      </v-btn>
</template>

<script>

export default {
  name: "MakeButton",
  methods: {
    click() {
      this.$store.commit('openModalMake')
    }
  }
}
</script>

<style scoped>

</style>