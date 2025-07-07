export interface InventoryItem {
  id: string
  name: string
  alternateNames?: string[]
  categoryId: string
  categoryName: string
  isActive: boolean
  parLevels: { [day: string]: number }
}

export interface InventoryCategory {
  id: string
  name: string
  displayOrder: number
}
