import { create } from 'zustand'
import type { InventoryItem } from '../types/inventory'
import { fetchInventoryItems } from '../services/inventoryService'

interface InventoryState {
  items: InventoryItem[]
  loading: boolean
  error: string | null
  loadItems: () => Promise<void>
}

export const useInventoryStore = create<InventoryState>(set => ({
  items: [],
  loading: false,
  error: null,
  loadItems: async () => {
    set({ loading: true, error: null })
    try {
      const items = await fetchInventoryItems()
      set({ items, loading: false })
    } catch (err: any) {
      set({ error: err.message || 'Failed to load', loading: false })
    }
  },
}))
