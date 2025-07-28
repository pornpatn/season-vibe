import { create } from 'zustand';
import type { Category } from '../types/Category';
import { fetchCategories } from '../services/inventoryService';

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  categoryMap: Record<string, Category>;

  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  categoryMap: {},

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const categories = await fetchCategories();
      const categoryMap = Object.fromEntries(categories.map((cat: Category) => [cat.id, cat]));
      set({ categories, categoryMap, loading: false });
    } catch (err) {
      console.error('Error fetching categories', err);
      set({ loading: false });
    }
  },
}));
