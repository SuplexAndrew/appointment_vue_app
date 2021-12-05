import api from '../api/index'

export default {
  state: {
    date: new Date().toISOString().substr(0, 10),
    time: 0,
    modal: false,
    modalMake: false,
    selectedAppointments: [],
    selectedWeek: 0,
    schedule: [],
    loading: true,
    ticketTypes: [],
    selectedTicketTypes: 0,
  },
  mutations: {
    setSchedule(state, payload) {
      state.schedule = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    selectCell(state, payload) {
      state.selectedAppointments = payload
    },
    selectTicketTypes(state, payload) {
      state.ticketTypes = payload
    },
    setTicketType(state, payload) {
      state.selectedTicketTypes = payload
    },
    setDate(state, payload) {
      if (typeof payload === 'number') {
        state.date = state.schedule[state.selectedWeek].dates[payload].date
      } else {
        const parsed = new Date(payload)
        state.date = !Number.isNaN(parsed) ? payload :
          new Date().toISOString().substr(0, 10)
      }
    },
    setTime(state, payload) {
      state.time = payload
    },
    openModal(state) {
      state.modal = true
    },
    closeModal(state) {
      state.modal = false
    },
    openModalMake(state) {
      state.modalMake = true
    },
    closeModalMake(state) {
      state.modalMake = false
    },
  },
  getters: {
    getDate(state) {
      return state.date
    },
    getLoading(state) {
      return state.loading
    },
    getWeeks(state) {
      const items = state.schedule.map(({range}, i) => {
        return {text: range, value: i}
      })
      return {select: items[0], items}
    },
    getTimes(state) {
      const set = new Set()
      state.schedule[state.selectedWeek].dates
        .forEach(({records}) => records.forEach(({time}) => set.add(time)))
      return [...set].sort()
    },
    getTimesSelect(state) {
      const set = new Set()
      state.schedule[state.selectedWeek].dates.find(({date}) => state.date === date).records
        .filter(({size, appointments}) => size > appointments.length)
        .forEach(({time}) => set.add(time))
      const items = [...set].sort()
      return {select: state.time, items}
    },
    getDates(state) {
      const set = new Set()
      state.schedule[state.selectedWeek].dates
        .forEach(({date}) => set.add(date))
      return [...set]
    },
    getAllowedDates(state) {
      const set = new Set()
      state.schedule.forEach(({dates}) => dates
        .forEach(({date}) => set.add(date)))
      return [...set]
    },
    getRows(state, getters) {
      const times = getters.getTimes
      return times
        .map((time) => {
          const row = state.schedule[state.selectedWeek].dates
            .map(({records}) => records.find((record) => record.time === time)?.appointments)
          return {
            time, appointments: [...row, ...Array(7 - row.length)]
          }
        })
    },
    getTicketTypes(state) {
      const items = state.ticketTypes.map(({id, name}) => {
        return {value: id, text: name}
      })

      return {select: items[0], items}
    }
  },
  actions: {
    selectWeek({state, commit}, payload) {
      state.selectedWeek = payload
      commit('setDate', state.schedule[payload].dates[0].date)
    },
    async postAppointments({state, getters, dispatch}, payload) {
      const item = {
        date: getters.getDate,
        time: state.time,
        ...payload
      }
      console.log(item)
      try {
        await api.postAppointments(item)
        await dispatch('getAppointments')
      } catch (err) {
        alert('Не удалось добавить запись')
      }
    },
    async getAppointments({commit}) {
      const appointments = await api.getAppointments()
      const schedule = appointments.map((row) => {
        return {range: row.range, dates: JSON.parse(row.dates)}
      })
      commit('setSchedule', schedule)
    },
    async fetchInit({state, commit, dispatch}) {
      await dispatch('getAppointments')
      commit('setDate', state.schedule[state.selectedWeek].dates[0].date)
      commit('setTime', state.schedule[state.selectedWeek].dates[0].records[0].time)
      commit('setLoading')
    },
    async fetchTicketTypes({commit}) {
      const tickets = await api.fetchTicketTypes()
      commit('selectTicketTypes', tickets)
    },
    async deleteAppointment({state, dispatch, commit}, id) {
      await api.deleteAppointment(id)
      await dispatch('getAppointments')
      await commit('selectCell', state.selectedAppointments)
    }
  }
}