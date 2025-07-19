import api from './axios'

// LOGIN
export const login = async (username: string, password: string) => {
  const res = await api.post('/auth/login',
    { username, password },
    { withCredentials: true },
  )
  return res
}

// REFRESH TOKEN
export const refreshToken = async () => {
  const res = await api.post('/auth/refresh-token',
    {},
    { withCredentials: true },
  )
  return res
}

// LOGOUT
export const logout = async () => {
  await api.post('/auth/logout',
    {},
    { withCredentials: true },
  )
}

// CHECK LOGIN
export const getCurrentUser = async () => {
  const res = await api.get('/auth/me')
  return res
}
