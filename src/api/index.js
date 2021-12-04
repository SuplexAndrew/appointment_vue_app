import axios from "axios";

class Api {
  path = 'http://localhost:8000'
  async getAppointments() {
    try {
      const res = await axios.get(`${this.path}/api/get`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  async fetchTicketTypes() {
    try {
      const res = await axios.get(`${this.path}/api/getticketypes`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  async postAppointments(item) {
    try {
      const res = await axios.post(`${this.path}/api/add`, {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  async deleteAppointment(id) {
    try {
      const res = await axios.delete(`${this.path}/api/delete/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
}

export default new Api()