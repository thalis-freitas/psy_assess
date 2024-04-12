import api from './api'

export const evaluatedApi = {
  getAllEvaluated: () => {
    return api.get('evaluated')
  }
}
