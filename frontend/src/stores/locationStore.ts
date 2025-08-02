import { create } from 'zustand';
import type { Location } from '../types/InventoryTypes';
import * as service from '../services/locationService';

interface State {
  locations: Location[];
  loading: boolean;
  error: string | null;
  fetchLocations: () => Promise<void>;
  addLocation: (data: Partial<Location>) => Promise<void>;
  updateLocation: (id: string, data: Partial<Location>) => Promise<void>;
  removeLocation: (id: string) => Promise<void>;
}

export const useLocationStore = create<State>((set) => ({
  locations: [],
  loading: false,
  error: null,

  fetchLocations: async () => {
    set({ loading: true, error: null });
    try {
      const locations = await service.fetchLocations();
      set({ locations });
    } catch (err) {
      set({ error: 'Failed to load locations' });
    } finally {
      set({ loading: false });
    }
  },
  addLocation: async (data) => {
    await service.createLocation(data);
    await (useLocationStore.getState().fetchLocations());
  },
  updateLocation: async (id, data) => {
    await service.updateLocation(id, data);
    await (useLocationStore.getState().fetchLocations());
  },
  removeLocation: async (id) => {
    await service.deleteLocation(id);
    await (useLocationStore.getState().fetchLocations());
  },
}));
