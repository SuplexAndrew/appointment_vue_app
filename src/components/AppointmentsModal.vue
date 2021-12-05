<template>
  <v-dialog
      v-model="modal"
      @click:outside="$store.commit('closeModal')"
      width="66vw"
  >

    <v-card>
      <v-card-title class="text-h5 amber lighten-3">
        {{ `${date} - ${time}` }}
      </v-card-title>

      <v-card-text>
        <table>
          <thead>
          <tr>
            <td v-for="(column, i) in headers" :key="i">{{ column }}</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(appointment, i) in appointments"
              :key="i">
              <td>{{ appointment.company }}</td>
              <td>{{ appointment.contacts }}</td>
              <td>{{ appointment.ticketType }}</td>
              <td>{{ appointment.countSI }}</td>
              <td>{{ appointment.accountNumbers }}</td>
              <td>
                <button @click="deleteAppointment(appointment.id)">Удалить</button>
              </td>
          </tr>
          </tbody>
        </table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            :disabled="appointments.length > 2"
            @click="openModalMake"
        >
          Записаться
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AppointmentsModal",
  data() {
    return {
      headers: ['Компания', 'Контакты', 'Вид заявки', 'Количество СИ', 'Номера счетов', ''],
    }
  },
  methods: {
    openModalMake() {
      this.$store.commit('closeModal')
      this.$store.commit('openModalMake')
    },
    deleteAppointment(id) {
      this.$store.dispatch('deleteAppointment', id)
    }
  },
  computed: {
    ...mapState({
      time: state => state.appointmentModule.time,
      date: state => state.appointmentModule.date,
      modal: state => state.appointmentModule.modal,
      appointments: state => state.appointmentModule.selectedAppointments,
    })
  }
}
</script>

<style scoped>
table {
  margin-top: 2%;
  height: 100%;
  width: 100%;
  border: 1px solid black;
  text-align: center;
}

td {
  border: 1px solid black;
}

button {
  background-color: red;
  color: white;
  width: 100%;
}
</style>