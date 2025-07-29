import { create } from 'zustand';
import type { InventoryItem } from '../types/InventoryTypes';
import {
  fetchInventoryItems,
  fetchInventoryItem,
  createInventoryItem,
  updateInventoryItem,
} from '../services/inventoryService';

type FilterOptions = {
  search?: string;
};

interface InventoryItemStore {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  loading: boolean;
  filters: FilterOptions;
  filteredItems: InventoryItem[];

  fetchItems: () => Promise<void>;
  fetchItem: (id: string) => Promise<void>;
  createItem: (data: Partial<InventoryItem>) => Promise<InventoryItem>;
  updateItem: (id: string, data: Partial<InventoryItem>) => Promise<InventoryItem>;

  setFilters: (filters: Partial<FilterOptions>) => void;
  clearSelectedItem: () => void;
}

function applyFilters(items: InventoryItem[], filters: FilterOptions): InventoryItem[] {
  const searchLower = filters.search?.toLowerCase() || '';

  return items
    .filter(item => {
      const matchesSearch =
        !filters.search ||
        item.name.toLowerCase().includes(searchLower) ||
        (item.description?.toLowerCase().includes(searchLower)) ||
        (item.note?.toLowerCase().includes(searchLower));

      return matchesSearch;

      // const matchesSearch =
      //   !filters.search ||
      //   item.name.toLowerCase().includes(searchLower) ||
      //   (item.description?.toLowerCase().includes(searchLower)) ||
      //   (item.note?.toLowerCase().includes(searchLower)) ||
      //   (item.alternateNames?.some(name => name.toLowerCase().includes(searchLower)));

      // const matchesCategory = !filters.categoryId || item.categoryId === filters.categoryId;
      // const matchesLocation = !filters.locationId || item.locationId === filters.locationId;
      // const matchesStatus = filters.status === undefined
      //   ? true
      //   : filters.status === 'active'
      //     ? item.isActive
      //     : !item.isActive;

      // return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
    })
    .sort((a, b) => {
      const catOrderA = a.category?.displayOrder ?? 9999;
      const catOrderB = b.category?.displayOrder ?? 9999;
      if (catOrderA !== catOrderB) return catOrderA - catOrderB;

      const catNameA = a.category?.name.toLowerCase() ?? '';
      const catNameB = b.category?.name.toLowerCase() ?? '';
      if (catNameA !== catNameB) return catNameA.localeCompare(catNameB);

      const itemOrderA = a.displayOrder ?? 9999;
      const itemOrderB = b.displayOrder ?? 9999;
      if (itemOrderA !== itemOrderB) return itemOrderA - itemOrderB;

      return a.name.localeCompare(b.name);
    });
}

export const useInventoryItemStore = create<InventoryItemStore>((set, get) => ({
  items: [],
  selectedItem: null,
  loading: false,
  filters: {},
  filteredItems: [],

  fetchItems: async () => {
    set({ loading: true });
    try {
      const items = await fetchInventoryItems();
      const filters = get().filters;
      set({ items, filteredItems: applyFilters(items, filters), loading: false });
    } catch (err) {
      console.error('Error fetching inventory items', err);
      set({ loading: false });
    }
  },

  fetchItem: async (id: string) => {
    set({ loading: true });
    try {
      const item = await fetchInventoryItem(id);
      set({ selectedItem: item, loading: false });
    } catch (err) {
      console.error('Error fetching item', err);
      set({ loading: false });
    }
  },

  createItem: async (data) => {
    const newItem = await createInventoryItem(data);
    const updatedItems = [...get().items, newItem];
    const filters = get().filters;
    set({
      items: updatedItems,
      filteredItems: applyFilters(updatedItems, filters),
    });
    return newItem;
  },

  updateItem: async (id, data) => {
    const updatedItem = await updateInventoryItem(id, data);
    const items = get().items.map(item =>
      item.id === id ? updatedItem : item
    );
    const filters = get().filters;
    set({
      items,
      filteredItems: applyFilters(items, filters),
      selectedItem: id === get().selectedItem?.id ? updatedItem : get().selectedItem,
    });
    return updatedItem;
  },

  setFilters: (newFilters) => {
    const filters = { ...get().filters, ...newFilters };
    set({
      filters,
      filteredItems: applyFilters(get().items, filters),
    });
  },

  clearSelectedItem: () => set({ selectedItem: null }),
}));
