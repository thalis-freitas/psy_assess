import api from './api'

export const evaluatedApi = {
  getAllEvaluated: () => {
    return api.get('evaluated')
  },

  createEvaluated: (params) => {
    return api.post('evaluated', params)
  }
}
