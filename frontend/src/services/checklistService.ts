import api from './axios'

export const getChecklistDashboard = (params) => api.get('/checklists/dashboard', { params })
export const startChecklist = (locationId) => api.post(`/checklists/start`, { locationId })
export const updateChecklistItem = (itemId, data) => api.put(`/checklists/items/${itemId}`, data)
