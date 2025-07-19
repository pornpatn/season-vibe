import api from './axios'
import type { InventoryItem } from '../types/inventory'

export async function fetchInventoryItems() {
  const res = await api.get<InventoryItem[]>('/inventory/items');
  return res.data;
}

export async function fetchInventoryItem(id: string) {
  const res = await api.get<InventoryItem>(`/inventory/items/${id}`);
  return res.data;
}

export async function createInventoryItem(data: Partial<InventoryItem>) {
  const res = await api.post<InventoryItem>('/inventory/items', data);
  return res.data;
}

export async function updateInventoryItem(id: string, data: Partial<InventoryItem>) {
  const res = await api.put<InventoryItem>(`/inventory/items/${id}`, data);
  return res.data;
}

export async function fetchCategories() {
  const res = await api.get('/inventory/categories');
  return res.data;
}

export async function fetchUnits() {
  const res = await api.get('/inventory/units');
  return res.data;
}