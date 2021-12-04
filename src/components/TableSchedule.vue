<template>
  <table>
    <thead>
    <tr>
      <td></td>
      <td v-for="(column, i) in headers" :key="column">{{column}} <br> {{week[i]}}</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, i) in $store.getters.getRows" :key="i">
      <td :style="getColor(row)">{{row.time}}</td>
      <AppointmentCell v-for="(cell, i) in row.appointments" :key="i" :time="row.time" :cell="cell" :column="i"/>
    </tr>
    </tbody>
  </table>
</template>

<script>
import AppointmentCell from "@/components/AppointmentCell";

export default {
  name: "TableSchedule",
  components: {
    AppointmentCell
  },
  data() {
    return {
      headers: [
          'Понедельник',
          'Вторник',
          'Среда',
          'Четверг',
          'Пятница',
          'Суббота',
          'Воскресенье',
      ],
    }
  },
  computed: {
    week() {
      return this.$store.getters.getDates
    }
  },
  methods: {
    getColor(row) {
      if (row.appointments.some((cell) => cell?.length <= 3)) {
        return {backgroundColor: '#35af58'}
      }
      return {backgroundColor: '#af3535'}
    }
  }
}
</script>

<style scoped>
  table {
    table-layout: fixed;
    width: 100%;
    border: 1px solid black;
  }
  td {
    border: 1px solid black;
    overflow: hidden;
  }
</style>