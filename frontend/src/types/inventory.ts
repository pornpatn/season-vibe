export interface InventoryCategory {
  id: string
  name: string
  displayOrder?: number
}

export interface InventoryPropForm {
  id: string
  inventoryItemId: string
  name: string,
  conversionRate: number,
  unitId: string
}

export interface InventoryItem {
  categoryId: any
  categoryName: string
  categoryDisplayOrder: number
  id: string
  name: string
  alternateNames?: string
  description?: string
  note?: string
  isActive: boolean
  displayOrder?: number
  category: InventoryCategory
  unitId?: string
  parLevels: Record<string, number>
  inventoryPrepForms: InventoryPropForm[]
}

export interface GroupedInventoryItems {
  categoryId: string
  categoryName: string
  categoryDisplayOrder: number
  items: InventoryItem[]
}


export interface Unit {
  id: string
  name: string
}

export type StatusFilter = 'all' | 'active' | 'inactive'
