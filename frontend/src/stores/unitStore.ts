import { create } from 'zustand';
import type { Unit } from '../types/Inventory';
import { fetchUnits } from '../services/inventoryService';

interface UnitStore {
  units: Unit[];
  loading: boolean;
  unitMap: Record<string, Unit>;

  fetchUnits: () => Promise<void>;
}

export const useUnitStore = create<UnitStore>((set) => ({
  units: [],
  loading: false,
  unitMap: {},

  fetchUnits: async () => {
    set({ loading: true });
    try {
      const units = await fetchUnits();
      const unitMap = Object.fromEntries(units.map((u: Unit) => [u.id, u]));
      set({ units, unitMap, loading: false });
    } catch (err) {
      console.error('Error fetching units', err);
      set({ loading: false });
    }
  },
}));