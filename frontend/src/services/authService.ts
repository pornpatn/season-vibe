import api from './axios'
import { useAuthStore } from '../stores/useAuthStore'

// LOGIN
export const login = async (username: string, password: string) => {
  const res = await api.post('/auth/signin', { username, password })
  useAuthStore.getState().setAccessToken(res.data.accessToken)
}

// REFRESH TOKEN
export const refreshToken = async () => {
  const res = await api.post('/auth/refresh', {})
  useAuthStore.getState().setAccessToken(res.data.accessToken)
  return res.data
}

// LOGOUT
export const logout = async () => {
  await api.post('/auth/logout')
  useAuthStore.getState().clearAccessToken()
}

// CHECK LOGIN
export const checkLoginStatus = async () => {
  try {
    await refreshToken()
    return true
  } catch {
    return false
  }
}

