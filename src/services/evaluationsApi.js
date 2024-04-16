import api from './api'

export const evaluationsApi = {
  applyInstrument: (params) => {
    return api.post('evaluations', params)
  },

  getEvaluationById: (id) => {
    return api.get(`evaluations/${id}`)
  },

  getStartEvaluation: (id) => {
    return api.get(`evaluations/${id}/start`)
  },

  submitAnswers: (id, params) => {
    return api.post(`evaluations/${id}/answers`, params)
  }
}
