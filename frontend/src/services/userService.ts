import api from './axios'

export const getUsers = () => api.get('/users')
export const createUser = (data) => api.post('/users', data)
export const updateUser = (id: string, data) => api.put(`/users/${id}`, data)
export const deactivateUser = (id: string) => api.delete(`/users/${id}`)
