<template>
  <td @click="cellClick" :style="getCellColor(cell)">{{getCellValue(cell)}}</td>
</template>

<script>
export default {
  name: "AppointmentCell",
  props: {
    cell: Array || undefined,
    time: String,
    column: Number
  },
  methods: {
    getCellValue(cell) {
      if (!cell) {
        return ''
      }
      if (cell.length > 3) {
        return cell.length
      }
      return `${cell.length || ''} +`

    },
    getCellColor(cell) {
      if (!cell) {
        return {backgroundColor: '#b4b4b4'}
      }
      if (cell.length > 2) {
        return {backgroundColor: '#af3535'}
      }
      return {backgroundColor: '#35af58'}
    },
    cellClick() {
      if (!this.cell) return;
      this.$store.commit('selectCell', this.cell)
      this.$store.commit('setDate', this.column)
      this.$store.commit('setTime', this.time)
      this.$store.commit('openModal')
    },
  }
}
</script>

<style scoped>

</style>