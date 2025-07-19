import { create } from 'zustand'
import type { InventoryItem } from '../types/inventory'
import {
  fetchInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  fetchCategories,
  fetchUnits
} from '../services/inventoryService';

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  categories: { id: string; name: string }[];
  units: { id: string; name: string }[];
  load: () => Promise<void>;
  create: (data: Partial<InventoryItem>) => Promise<void>;
  update: (id: string, data: Partial<InventoryItem>) => Promise<void>;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [],
  loading: false,
  categories: [],
  units: [],
  load: async () => {
    set({ loading: true });
    const [items, categories, units] = await Promise.all([
      fetchInventoryItems(),
      fetchCategories(),
      fetchUnits(),
    ]);
    set({ items, categories, units, loading: false });
  },
  create: async (data) => {
    const newItem = await createInventoryItem(data);
    set({ items: [...get().items, newItem] });
  },
  update: async (id, data) => {
    const updated = await updateInventoryItem(id, data);
    set({
      items: get().items.map((item) => (item.id === id ? updated : item)),
    });
  },
}))
