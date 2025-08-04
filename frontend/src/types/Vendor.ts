import type { InventoryItem, Unit } from './InventoryTypes';

export interface VendorInventoryItem {
  id: string;
  vendorId: string;
  inventoryItemId: string;
  vendorName?: string | null;
  vendorNote?: string | null;
  unitId?: string | null;
  inventoryItem?: InventoryItem;
  unit?: Unit;
}

export interface VendorInventoryItemInput {
  inventoryItemId: string;
  vendorName?: string;
  vendorNote?: string;
  unitId?: string | null;
}

export interface VendorContact {
  id: string;
  vendorId: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface Vendor {
  id: string;
  name: string;
  isShopping: boolean;
  contacts?: VendorContact[];
  inventoryVendorItems?: VendorInventoryItem[];
}
