import api from './axios';
import type { Location } from '../types/InventoryTypes';

export async function fetchLocations(): Promise<Location[]> {
  const res = await api.get('/inventory/locations');
  return res.data;
}

export async function fetchLocation(id: string): Promise<Location> {
  const res = await api.get(`/inventory/locations/${id}`);
  return res.data;
}

export async function createLocation(data: Partial<Location>): Promise<Location> {
  const res = await api.post('/inventory/locations', data);
  return res.data;
}

export async function updateLocation(id: string, data: Partial<Location>): Promise<Location> {
  const res = await api.put(`/inventory/locations/${id}`, data);
  return res.data;
}

export async function deleteLocation(id: string): Promise<void> {
  await api.delete(`/inventory/locations/${id}`);
}
