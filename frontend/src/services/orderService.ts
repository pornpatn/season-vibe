import api from './axios'

export const createOrder = (data) => api.post('/orders', data)
export const getOrdersByChecklist = (checklistId) => api.get(`/orders?checklistId=${checklistId}`)
