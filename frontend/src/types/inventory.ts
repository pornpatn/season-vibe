export interface InventoryItem {
  id: string
  name: string
  alternateNames?: string
  description?: string
  note?: string
  categoryId: string
  categoryName: string
  categoryDisplayOrder?: number
  unitId?: string
  isActive: boolean
  displayOrder?: number
  parLevels: Record<string, number>
}

export interface GroupedInventoryItems {
  categoryId: string
  categoryName: string
  categoryDisplayOrder: number
  items: InventoryItem[]
}

export interface InventoryCategory {
  id: string
  name: string
  displayOrder?: number
}

export interface Unit {
  id: string
  name: string
}
