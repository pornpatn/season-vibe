import api from './axios';
import type { InventoryCategory } from '../types/InventoryTypes';

export async function fetchCategories(): Promise<InventoryCategory[]> {
  const res = await api.get('/inventory/categories');
  return res.data;
}

export async function createCategory(data: Partial<InventoryCategory>) {
  const res = await api.post('/inventory/categories', data);
  return res.data;
}

export async function updateCategory(id: string, data: Partial<InventoryCategory>) {
  const res = await api.put(`/inventory/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: string) {
  await api.delete(`/inventory/categories/${id}`);
}
