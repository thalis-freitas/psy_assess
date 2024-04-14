import api from './api'

export const evaluationsApi = {
  applyInstrument: (params) => {
    return api.post('evaluations', params)
  },
}
