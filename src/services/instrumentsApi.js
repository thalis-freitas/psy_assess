import api from './api'

export const instrumentsApi = {
  getAllInstruments: () => {
    return api.get('instruments')
  },
}
