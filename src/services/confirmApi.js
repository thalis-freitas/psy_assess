import api from './api'

export const confirmApi = {
  getConfirm: (token) => {
    return api.get(`confirm/${token}`)
  }
}
