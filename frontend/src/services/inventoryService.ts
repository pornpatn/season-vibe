import api from './axios'
import type { InventoryItem } from '../types/inventory'

export const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  const response = await api.get('/inventory/items')
  return response.data
}
export const createInventoryItem = (data) => api.post('/items', data)
export const updateInventoryItem = (id, data) => api.put(`/items/${id}`, data)
