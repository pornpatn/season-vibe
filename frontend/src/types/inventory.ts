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
