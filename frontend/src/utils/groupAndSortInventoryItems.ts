import type { InventoryItem, GroupedInventoryItems } from '../types/inventory'

export interface InventoryFilters {
  searchQuery?: string
  status?: 'all' | 'active' | 'inactive'
//   categoryIds?: string[]
//   vendorIds?: string[]
//   locationIds?: string[]
}

export function groupAndSortInventoryItems(
  items: InventoryItem[],
  filters: InventoryFilters = {}
): GroupedInventoryItems[] {
  if (!items || items.length === 0) return []

  const {
    searchQuery = '',
    status = 'all',
    // categoryIds,
    // vendorIds,
    // locationIds
} = filters

  // Step 1: Filter by status
  let filtered = items.filter(item => {
    if (status === 'active') return item.isActive
    if (status === 'inactive') return !item.isActive
    return true
  })

  // Step 2: Search query match
  const q = searchQuery.trim().toLowerCase()
  if (q) {
    filtered = filtered.filter(item => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.alternateNames?.toLowerCase().includes(q)
      )
    })
  }

  // Step 3: Filter by category (if any selected)
//   if (categoryIds && categoryIds.length > 0) {
//     filtered = filtered.filter(item => categoryIds.includes(item.categoryId))
//   }

  // Future filters like vendorIds/locationIds could be handled similarly when related fields exist

  // Step 4: Group by category
  const groups = new Map<string, GroupedInventoryItems>()

  for (const item of filtered) {
    const key = item.categoryId
    if (!groups.has(key)) {
      groups.set(key, {
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        categoryDisplayOrder: item.categoryDisplayOrder ?? 9999,
        items: [],
      })
    }
    groups.get(key)!.items.push(item)
  }

  // Step 5: Sort categories
  const sortedGroups = Array.from(groups.values()).sort((a, b) => {
    if (a.categoryDisplayOrder !== b.categoryDisplayOrder) {
      return a.categoryDisplayOrder - b.categoryDisplayOrder
    }
    return a.categoryName.localeCompare(b.categoryName)
  })

  // Step 6: Sort items inside each group
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
