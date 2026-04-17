const axios = require('axios')

const MS_LISTA_URL = process.env.MS_LISTA_URL || 'http://localhost:8081'

module.exports = {
  listarTodos: () =>
    axios.get(`${MS_LISTA_URL}/api/v1/waitlist`),

  obtenerPorId: (id) =>
    axios.get(`${MS_LISTA_URL}/api/v1/waitlist/${id}`),

  listarPorPrioridad: () =>
    axios.get(`${MS_LISTA_URL}/api/v1/waitlist/prioridad`),

  registrar: (data) =>
    axios.post(`${MS_LISTA_URL}/api/v1/waitlist`, data),

  cancelar: (id) =>
    axios.patch(`${MS_LISTA_URL}/api/v1/waitlist/${id}/cancelar`),

  contarEnEspera: () =>
    axios.get(`${MS_LISTA_URL}/api/v1/waitlist/count`)
}