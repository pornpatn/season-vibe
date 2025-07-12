import api from './axios'
import { useAuthStore } from '../stores/authStore'

// LOGIN
export const login = async (username: string, password: string) => {
  const res = await api.post('/auth/signin', { username, password })
  return res.data
}

// REFRESH TOKEN
export const refreshToken = async () => {
  const res = await api.post('/auth/refresh', {})
  useAuthStore.getState().setAccessToken(res.data.accessToken)
  return res.data.accessToken
}

// LOGOUT
export const logout = async () => {
  await api.post('/auth/logout')
}

// CHECK LOGIN
export const getCurrentUser = async () => {
  const res = await api.get('/auth/me')
  return res.data.user
}
