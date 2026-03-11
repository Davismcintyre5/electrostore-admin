import api from './api'

export const login = (email, password) => {
  return api.post('/auth/login', { email, password, as: 'admin' })
}

export const changePassword = (currentPassword, newPassword) => {
  return api.patch('/auth/change-password', { currentPassword, newPassword })
}