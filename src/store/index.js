import Vue from 'vue'
import Vuex from 'vuex'
import appointmentModule from "@/store/appointmentModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appointmentModule
  }
})
