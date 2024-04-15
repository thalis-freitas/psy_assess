import api from './api'

export const confirmApi = {
  getConfirm: (token) => {
    return api.get(`confirm/${token}`)
  },

  postConfirmData: (id, params) => {
    return api.post(`evaluations/${id}/confirm_data`, params)
  }
}
