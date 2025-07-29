import { create } from 'zustand';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import type { InventoryCategory } from '../types/InventoryTypes';

interface CategoryState {
  categories: InventoryCategory[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (data: Partial<InventoryCategory>) => Promise<void>;
  editCategory: (id: string, data: Partial<InventoryCategory>) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await fetchCategories();
      set({ categories });
    } catch (err) {
      set({ error: 'Failed to load categories' });
    } finally {
      set({ loading: false });
    }
  },

  addCategory: async (data) => {
    const newCategory = await createCategory(data);
    set({ categories: [...get().categories, newCategory] });
  },

  editCategory: async (id, data) => {
    const updated = await updateCategory(id, data);
    set({
      categories: get().categories.map((c) => (c.id === id ? updated : c)),
    });
  },

  removeCategory: async (id) => {
    await deleteCategory(id);
    set({
      categories: get().categories.filter((c) => c.id !== id),
    });
  },
}));
