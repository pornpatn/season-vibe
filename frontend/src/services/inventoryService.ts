import api from '../axios';
import type { InventoryItem } from '../types/inventory'

export const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  const response = await api.get('/inventory-items')
  return response.data
}
