<template>
  <v-dialog
      v-model="modalMake"
      @click:outside="$store.commit('closeModalMake')"
      width="60vw"
  >
    <v-card>
      <v-card-title class="text-h5 amber lighten-3">
        Записаться на -
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Дата"
                readonly
                v-bind="attrs"
                v-on="on"
                :style="{maxWidth: '15vw', marginLeft: '1vw'}"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              @input="menu = false"
              @change="$store.commit('setDate', date)"
              :allowed-dates="getAllowedDates"
              color="rgba(121,9,79,1)"
              locale="ru"
              :first-day-of-week="1"
          ></v-date-picker>
        </v-menu>
        <v-select
            :style="{maxWidth: '10vw', marginLeft: '1vw'}"
            v-model="time.select"
            :items="time.items"
            @change="$store.commit('setTime', time.select)"
        >
        </v-select>
      </v-card-title>

      <v-card-text :style="{marginTop: '2vh'}">
        <v-text-field
            v-model="company"
            label="Компания"
            solo
        ></v-text-field>
        <v-text-field
            v-model="contacts"
            label="Контакты"
            solo
        ></v-text-field>
        <v-text-field
            v-model="countSI"
            label="Количество СИ"
            solo
        ></v-text-field>
        <v-text-field
            v-model="accountNumber"
            label="Номер счета"
            solo
        ></v-text-field>
        <v-select
            v-model="ticketType.select"
            :items="ticketType.items"
            @change="$store.commit('setTicketType', time.select)"
            solo
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            :disabled="!enableButton()"
            @click="postAppointments"
        >
          Отправить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "MakeAppointmentModal",
  data() {
    return {
      menu: false,
      company: '',
      contacts: '',
      countSI: '',
      accountNumber: '',
    }
  },
  computed: {
    ...mapState({
      modalMake: state => state.appointmentModule.modalMake,
    }),
    date: {
      get() {
        return this.$store.getters.getDate
      },
      set(value) {
        this.$store.commit('setDate', value)
      }
    },
    time: {
      get() {
        return this.$store.getters.getTimesSelect
      },
      set(value) {
        this.$store.commit('setTime', value)
      }
    },
    ticketType: {
      get() {
        return this.$store.getters.getTicketTypes
      },
      set(value) {
        this.$store.commit('setTicketType', value)
      }
    }
  },
  methods: {
    postAppointments() {
      const appointment = {
        company: this.company,
        contacts: [this.contacts],
        countSI: this.countSI,
        accountNumbers: [this.accountNumber],
        ticketType: this.ticketType.select.value
      }
      this.$store.dispatch('postAppointments', appointment)
      this.$store.commit('closeModalMake')
    },
    getAllowedDates(value) {
      return this.$store.getters.getAllowedDates.includes(value);
    },
    enableButton() {
      return Boolean(this.company && this.contacts && this.countSI && this.accountNumber)
    }
  },
  created() {
    this.$store.dispatch('fetchTicketTypes')
  }
}
</script>

<style scoped>

</style>