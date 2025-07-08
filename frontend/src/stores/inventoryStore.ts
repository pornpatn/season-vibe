import { create } from 'zustand'
import api from '../services/axios'
import type { InventoryItem } from '../types/inventory'

interface InventoryState {
  items: InventoryItem[]
  loading: boolean
  fetch: () => Promise<void>
  updateOrders: (items: InventoryItem[]) => Promise<void>
}

export const useInventoryStore = create<InventoryState>(set => ({
  items: [],
  loading: false,
  fetch: async () => {
    set({ loading: true })
    const { data } = await api.get<InventoryItem[]>('/inventory-items')
    set({ items: data, loading: false })
  },
  updateOrders: async items => {
    await api.put('/inventory-items/reorder', { items: items.map(i => ({ id: i.id, displayOrder: i.displayOrder, categoryId: i.categoryId })) })
    set({ items })
  }
}))
