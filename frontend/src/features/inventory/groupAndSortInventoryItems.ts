import type { InventoryItem, GroupedInventoryItems } from '../../types/Inventory'

export interface InventoryFilters {
  searchQuery?: string
  statusFilter?: 'all' | 'active' | 'inactive'
//   categoryIds?: string[]
//   vendorIds?: string[]
//   locationIds?: string[]
}

export function groupAndSortInventoryItems(
  items: InventoryItem[],
): GroupedInventoryItems[] {
  if (!items || items.length === 0) return []

  // Group by category
  const groups = new Map<string, GroupedInventoryItems>()

  for (const item of items) {
    const key = item.category?.id || '9999'
    if (!groups.has(key)) {
      groups.set(key, {
        categoryId: item.category?.id || '9999',
        categoryName: item.category?.name || 'Uncategorized',
        categoryDisplayOrder: item.category?.displayOrder ?? 9999,
        items: [],
      })
    }
    groups.get(key)!.items.push(item)
  }

  // Sort categories
  const sortedGroups = Array.from(groups.values()).sort((a, b) => {
    if (a.categoryDisplayOrder !== b.categoryDisplayOrder) {
      return a.categoryDisplayOrder - b.categoryDisplayOrder
    }
    return a.categoryName.localeCompare(b.categoryName)
  })

  // Sort items inside each group
  for (const group of sortedGroups) {
    group.items.sort((a, b) => {
      const orderA = a.displayOrder ?? 9999
      const orderB = b.displayOrder ?? 9999
      if (orderA !== orderB) return orderA - orderB
      return a.name.localeCompare(b.name)
    })
  }

  return sortedGroups
}
