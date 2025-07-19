import api from './axios'

export const getUnits = () => api.get('/units')
