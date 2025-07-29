export interface InventoryCategory {
  id: string;
  name: string;
  displayOrder?: number;
}

export interface Unit {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface InventoryPrepForm {
  id: string;
  inventoryItemId: string;
  name: string;
  conversionRate: number;
  unitId: string;
  unit?: Unit;
}

export interface InventoryParLevel {
  id: string;
  inventoryLocationItemId: string;
  dayOfWeek: number; // 0 = Sunday
  amount: number;
}

export interface InventoryLocationAssignment {
  id: string;
  locationId: string;
  locationName?: string;
  parLevels: InventoryParLevel[];
  parSummary?: string; // optional summary (e.g., "10" or "8–12")
}

export interface InventoryItem {
  id: string;
  name: string;
  alternateNames?: string;
  description?: string;
  note?: string;
  isActive: boolean;
  displayOrder?: number;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
    displayOrder?: number;
  };
  unitId?: string;
  unit?: {
    id: string;
    name: string;
  },
  inventoryPrepForms: InventoryPrepForm[];
  locationAssignments: InventoryLocationAssignment[];
}

export interface GroupedInventoryItems {
  categoryId: string
  categoryName: string
  categoryDisplayOrder: number
  items: InventoryItem[]
}

export type StatusFilter = 'all' | 'active' | 'inactive'
