import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MainLayout from '../../layouts/MainLayout';
import { useInventoryItemStore } from '../../stores/inventoryItemStore'
import { useCategoryStore } from '../../stores/categoryStore';
import { useUnitStore } from '../../stores/unitStore';
import InventoryToolbar from './components/InventoryToolbar'
import InventoryFilterDialog from './components/InventoryFilterDialog'
import InventoryGroup from './components/InventoryGroup'
import InventoryItemRow from './components/InventoryItemRow'
import InventoryItemBasicInfoDialog from './components/InventoryItemBasicInfoDialog'
import { groupAndSortInventoryItems } from './groupAndSortInventoryItems';
import type { InventoryItem } from '../../types/InventoryTypes';
import { type StatusFilter } from '../../types/InventoryTypes'

const defaultFormValues: InventoryItem = {
  name: '',
  alternateNames: '',
  description: '',
  note: '',
  isActive: true,
  categoryId: '',
  unitId: '',
  id: '',
  inventoryPrepForms: [],
  locationAssignments: [],
}

const InventoryListPage: React.FC = () => {
  const navigate = useNavigate()

  const {
    filteredItems,
    fetchItems,
    loading,
    filters,
    setFilters,
    createItem,
  } = useInventoryItemStore();

  const { categories, fetchCategories } = useCategoryStore();
  const { units, fetchUnits } = useUnitStore();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  const [itemDialogOpen, setItemDialogOpen] = useState(false)

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchUnits();
  }, []);

  const handleAddClick = () => {
    setItemDialogOpen(true)
  }

  const handleCreateItem = async (data: Partial<InventoryItem>) => {
    try {
      const newItem = await createItem(data);
      navigate(`/inventory/${newItem.id}`);
      return newItem;
    } catch (err) {
      console.error('Failed to create item:', err);
      // optionally show a snackbar or error message
    }
    setItemDialogOpen(false)
  }

  const groupedItems = useMemo(() => groupAndSortInventoryItems(filteredItems), [filteredItems]);

  return (
    <MainLayout
      pageTitle="Inventory"
      actions={(
        <IconButton color="inherit" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
      )}
    >
      <InventoryToolbar
        search={filters.search ?? ''}
        onSearchChange={(query) => {
          setFilters({ search: query })
        }}
        onOpenFilter={() => setFilterDialogOpen(true)}
      />

      {loading && (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {!loading && groupedItems.map((group) => (
        <InventoryGroup key={group.categoryId} title={group.categoryName}>
          {group.items.map((item) => (
            <InventoryItemRow
              key={item.id}
              item={item}
              onClick={() => navigate(`/inventory/${item.id}`)}
            />
          ))}
        </InventoryGroup>
      ))}

      <InventoryFilterDialog
        open={filterDialogOpen}
        status={statusFilter}
        locationIds={[]}
        onClose={() => setFilterDialogOpen(false)}
        onApply={(filters) => {
          console.log('Apply filters', filters)

          const normalizedStatus = (['all', 'active', 'inactive'].includes(filters.status)
            ? filters.status
            : 'all') as StatusFilter

          setStatusFilter(normalizedStatus)
        }}
      />

      <InventoryItemBasicInfoDialog
        mode={'create'}
        open={itemDialogOpen}
        item={defaultFormValues}
        onClose={() => setItemDialogOpen(false)}
        onSave={handleCreateItem}
        categories={categories}
        units={units}
      />
    </MainLayout>
  )
}

export default InventoryListPage
