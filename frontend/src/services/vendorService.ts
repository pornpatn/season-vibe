// src/services/vendorService.ts
import api from './axios';
import type { Vendor, VendorContact, VendorInventoryItemInput } from '../types/Vendor';

export async function fetchVendors(): Promise<Vendor[]> {
  const res = await api.get('/vendors');
  return res.data;
}

export async function fetchVendorById(id: string): Promise<Vendor> {
  const res = await api.get(`/vendors/${id}`);
  return res.data;
}

export async function createVendor(data: Partial<Vendor>): Promise<Vendor> {
  const res = await api.post('/vendors', data);
  return res.data;
}

export async function updateVendor(id: string, data: Partial<Vendor>): Promise<Vendor> {
  const res = await api.put(`/vendors/${id}`, data);
  return res.data;
}

export async function deleteVendor(id: string): Promise<void> {
  await api.delete(`/vendors/${id}`);
}

export async function createVendorContact(
  vendorId: string,
  data: Partial<VendorContact>
): Promise<VendorContact> {
  const res = await api.post(`/vendors/${vendorId}/contacts`, data);
  return res.data;
}

export async function updateVendorContact(
  vendorId: string,
  contactId: string,
  data: Partial<VendorContact>
): Promise<VendorContact> {
  const res = await api.put(`/vendors/${vendorId}/contacts/${contactId}`, data);
  return res.data;
}

export async function deleteVendorContact(
  vendorId: string,
  contactId: string
): Promise<void> {
  await api.delete(`/vendors/${vendorId}/contacts/${contactId}`);
}

export async function assignVendorItems(
  vendorId: string,
  items: VendorInventoryItemInput[]
): Promise<void> {
  await api.post(`/vendors/${vendorId}/items`, items);
}