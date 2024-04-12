import api from './api'

export const authApi = {
  login: (user) => {
    return api.post('login', user)
  }
}
