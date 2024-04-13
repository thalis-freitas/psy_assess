import api from './api'

export const evaluatedApi = {
  getAllEvaluated: () => {
    return api.get('evaluated')
  },

  createEvaluated: (params) => {
    return api.post('evaluated', params)
  },

  getEvaluatedById: (id) => {
    return api.get(`evaluated/${id}`)
  },

  updateEvaluated: (id, params) => {
    return api.put(`evaluated/${id}`, params)
  }
}
