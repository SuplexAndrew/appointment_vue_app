<template>
  <v-app id="app">
    <div class="main">
      <template v-if="$store.getters.getLoading">
        <v-sheet
            :color="`grey lighten-4`"
        >
          <v-skeleton-loader
              type="heading,actions, table"
              :style="{marginTop: '3vh'}"
          ></v-skeleton-loader>
        </v-sheet>
      </template>
      <template v-else>
        <div class="panel">
          <SelectWeek/>
          <MakeButton/>
        </div>
        <TableSchedule/>
        <AppointmentsModal/>
        <MakeAppointmentModal/>
      </template>
    </div>
  </v-app>
</template>

<script>
import TableSchedule from "@/components/TableSchedule";
import SelectWeek from "@/components/SelectWeek";
import MakeButton from "@/components/MakeButton";
import AppointmentsModal from "@/components/AppointmentsModal";
import MakeAppointmentModal from "@/components/MakeAppointmentModal";

export default {
  name: 'App',

  components: {
    TableSchedule,
    SelectWeek,
    MakeButton,
    AppointmentsModal,
    MakeAppointmentModal
  },
  mounted() {
    this.$store.dispatch('fetchInit')
  }
};
</script>

<style scoped>
#app {
  background: rgb(2, 0, 36);
  background: radial-gradient(circle, rgba(2, 0, 36, 1) 0%, rgba(121, 9, 79, 1) 70%, rgba(0, 0, 0, 1) 100%);
}

.main {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 5% 10%;
  height: 100%;
  padding: 2% 5%;
  border: 1px black solid;
  border-radius: 1em;
  overflow: hidden;
  background-color: white;
}

.panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px black dashed;
  margin-bottom: 1vh;
}

.panel:last-child {
  align-self: flex-end;
}
</style>
