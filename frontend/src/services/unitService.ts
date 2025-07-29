import api from './axios';
import type { Unit } from '../types/InventoryTypes';

export async function fetchUnits(): Promise<Unit[]> {
  const res = await api.get('/inventory/units');
  return res.data;
}

export async function createUnit(data: Partial<Unit>) {
  const res = await api.post('/inventory/units', data);
  return res.data;
}

export async function updateUnit(id: string, data: Partial<Unit>) {
  const res = await api.put(`/inventory/units/${id}`, data);
  return res.data;
}

export async function deleteUnit(id: string) {
  await api.delete(`/inventory/units/${id}`);
}
