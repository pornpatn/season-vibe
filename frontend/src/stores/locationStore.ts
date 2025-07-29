import { create } from 'zustand';
import type { Location } from '../types/InventoryTypes';
import * as service from '../services/locationService';

interface State {
  locations: Location[];
  loading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
  add: (data: Partial<Location>) => Promise<void>;
  update: (id: string, data: Partial<Location>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useLocationStore = create<State>((set) => ({
  locations: [],
  loading: false,
  error: null,

  fetch: async () => {
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
  add: async (data) => {
    await service.createLocation(data);
    await (useLocationStore.getState().fetch());
  },
  update: async (id, data) => {
    await service.updateLocation(id, data);
    await (useLocationStore.getState().fetch());
  },
  remove: async (id) => {
    await service.deleteLocation(id);
    await (useLocationStore.getState().fetch());
  },
}));
