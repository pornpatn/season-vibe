// src/stores/vendorStore.ts
import { create } from 'zustand';
import type { Vendor, VendorContact, VendorInventoryItemInput } from '../types/Vendor';
import * as vendorService from '../services/vendorService';

interface VendorState {
    vendors: Vendor[];
    vendor: Vendor | null;
    loading: boolean;
    error: string | null;

    fetchVendors: () => Promise<void>;
    fetchVendorById: (id: string) => Promise<void>;
    createVendor: (data: Partial<Vendor>) => Promise<Vendor>;
    updateVendor: (id: string, data: Partial<Vendor>) => Promise<void>;
    deleteVendor: (id: string) => Promise<void>;
    clearVendors: () => void;
    addContact: (vendorId: string, data: Partial<VendorContact>) => Promise<VendorContact>;
    updateContact: (vendorId: string, contactId: string, data: Partial<VendorContact>) => Promise<VendorContact>;
    deleteContact: (vendorId: string, contactId: string) => Promise<void>;
    assignItems: (vendorId: string, items: VendorInventoryItemInput[]) => Promise<void>;
}

export const useVendorStore = create<VendorState>((set) => ({
    vendors: [],
    vendor: null,
    loading: false,
    error: null,

    fetchVendors: async () => {
        set({ loading: true, error: null });
        try {
            const data = await vendorService.fetchVendors();
            set({ vendors: data, loading: false });
        } catch (err) {
            set({ error: 'Failed to fetch vendors', loading: false });
        }
    },

    fetchVendorById: async (id) => {
        set({ loading: true, error: null });
        try {
            const vendor = await vendorService.fetchVendorById(id);
            set({ vendor, loading: false });
        } catch (err) {
            set({ error: 'Failed to fetch vendor', loading: false });
        }
    },

    createVendor: async (data: Partial<Vendor>) => {
        const newVendor = await vendorService.createVendor(data);
        set((state) => ({
            vendors: [...state.vendors, newVendor],
        }));
        return newVendor;
    },

    updateVendor: async (id: string, data: Partial<Vendor>) => {
        const updated = await vendorService.updateVendor(id, data);
        set((state) => ({
            vendors: state.vendors.map((v) => (v.id === id ? updated : v)),
            vendor: updated,
        }));
    },

    deleteVendor: async (id: string) => {
        await vendorService.deleteVendor(id);
        set((state) => ({
            vendors: state.vendors.filter((v) => (v.id !== id)),
            vendor: null,
        }));
    },

    clearVendors: () => set({ vendors: [] }),

    addContact: async (vendorId, data) => {
        const newContact = await vendorService.createVendorContact(vendorId, data);
        set((state) => {
            const updated = state.vendor
                ? {
                    ...state.vendor,
                    contacts: [...(state.vendor.contacts ?? []), newContact],
                }
                : null;
            return { vendor: updated };
        });
        return newContact;
    },

    updateContact: async (vendorId, contactId, data) => {
        const updatedContact = await vendorService.updateVendorContact(vendorId, contactId, data);
        set((state) => {
            const updated = state.vendor
                ? {
                    ...state.vendor,
                    contacts: state.vendor.contacts?.map((c) =>
                        c.id === contactId ? updatedContact : c
                    ),
                }
                : null;
            return { vendor: updated };
        });
        return updatedContact;
    },

    deleteContact: async (vendorId, contactId) => {
        await vendorService.deleteVendorContact(vendorId, contactId);
        set((state) => {
            const updated = state.vendor
                ? {
                    ...state.vendor,
                    contacts: state.vendor.contacts?.filter((c) => c.id !== contactId),
                }
                : null;
            return { vendor: updated };
        });
    },

    assignItems: async (vendorId, items) => {
        await vendorService.assignVendorItems(vendorId, items);
        const refreshed = await vendorService.fetchVendorById(vendorId);
        set({ vendor: refreshed });
    },
}));
