import api from './axios'
import type { InventoryItem, InventoryParLevelInput, InventoryPrepForm } from '../types/InventoryTypes'

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

// Location Assignments
export async function assignLocation(itemId: string, locationId: string, parLevels: InventoryParLevelInput[]) {
  return api.post(`/inventory/items/${itemId}/locations`, { locationId, parLevels });
}

export async function updateParLevels(itemId: string, assignmentId: string, parLevels: InventoryParLevelInput[]) {
  return api.put(`/inventory/items/${itemId}/locations/${assignmentId}`, { parLevels });
}

export async function deleteLocationAssignment(itemId: string, assignmentId: string) {
  return api.delete(`/inventory/items/${itemId}/locations/${assignmentId}`);
}

// Prep Forms
export async function fetchPrepForms(itemId: string) {
  const res = await api.get<InventoryPrepForm[]>(`/inventory/items/${itemId}/prep-forms`);
  return res.data;
}

export async function createPrepForm(itemId: string, data: Partial<InventoryPrepForm>) {
  const res = await api.post<InventoryPrepForm>(`/inventory/items/${itemId}/prep-forms`, data);
  return res.data;
}

export async function updatePrepForm(id: string, data: Partial<InventoryPrepForm>) {
  const res = await api.put<InventoryPrepForm>(`/inventory/items/prep-forms/${id}`, data);
  return res.data;
}

export async function deletePrepForm(id: string) {
  const res = await api.delete(`/inventory/items/prep-forms/${id}`);
  return res.data;
}