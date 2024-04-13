import api from './api'

export const instrumentsApi = {
  getAllInstruments: () => {
    return api.get('instruments')
  },

  getInstrumentById: (id) => {
    return api.get(`instruments/${id}`)
  },
}
