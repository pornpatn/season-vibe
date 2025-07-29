import { create } from 'zustand';
import type { Unit } from '../types/InventoryTypes';
import { fetchUnits, createUnit, updateUnit, deleteUnit } from '../services/unitService';

interface UnitState {
  units: Unit[];
  loading: boolean;
  error: string | null;
  fetchUnits: () => Promise<void>;
  addUnit: (data: Partial<Unit>) => Promise<void>;
  editUnit: (id: string, data: Partial<Unit>) => Promise<void>;
  removeUnit: (id: string) => Promise<void>;
}

export const useUnitStore = create<UnitState>((set, get) => ({
  units: [],
  loading: false,
  error: null,

  fetchUnits: async () => {
    set({ loading: true, error: null });
    try {
      const units = await fetchUnits();
      set({ units });
    } catch (err) {
      set({ error: 'Failed to load units' });
    } finally {
      set({ loading: false });
    }
  },

  addUnit: async (data) => {
    const newUnit = await createUnit(data);
    set({ units: [...get().units, newUnit] });
  },

  editUnit: async (id, data) => {
    const updated = await updateUnit(id, data);
    set({
      units: get().units.map((u) => (u.id === id ? updated : u)),
    });
  },

  removeUnit: async (id) => {
    await deleteUnit(id);
    set({
      units: get().units.filter((u) => u.id !== id),
    });
  },
}));