import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useInventoryStore } from '../../stores/inventoryStore'
import MainLayout from '../../layouts/MainLayout';
import { groupAndSortInventoryItems } from './groupAndSortInventoryItems'
import InventoryToolbar from './InventoryToolbar'
import InventoryFilterDialog from './InventoryFilterDialog'
import InventoryGroup from './InventoryGroup'
import InventoryItemRow from './InventoryItemRow'
import InventoryItemDialog from './InventoryItemDialog'
import { type InventoryItemFormValues } from './InventoryItemForm';
import { type StatusFilter } from '../../types/inventory'

const locationOptions = [
  { id: 'loc1', name: 'Main Restaurant' },
  { id: 'loc2', name: 'Warehouse' },
]

const defaultFormValues: InventoryItemFormValues = {
  name: '',
  alternateNames: '',
  description: '',
  status: 'active',
  categoryId: '',
  unitId: '',
  parLevels: {
    Monday: 0, Tuesday: 0, Wednesday: 0,
    Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0,
  },
  locationIds: [],
  prepForms: [],
}

const InventoryListPage: React.FC = () => {
  const navigate = useNavigate()

  const { items, categories, units, loading, load } = useInventoryStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  const [itemDialogOpen, setItemDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<InventoryItemFormValues | null>(null)

  useEffect(() => {
    load()
  }, [load])

  const handleAddClick = () => {
    setEditItem(null)
    setItemDialogOpen(true)
  }

  const handleSubmitItem = (data: InventoryItemFormValues) => {
    console.log('Save item:', data)
    setItemDialogOpen(false)
  }

  const grouped = useMemo(() =>
    groupAndSortInventoryItems(items, { searchQuery, statusFilter }),
    [items, searchQuery, statusFilter]
  )

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
        search={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenFilter={() => setFilterDialogOpen(true)}
      />

      {loading && (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* {error && (
        <Box textAlign="center" mt={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      )} */}

      {!loading && grouped.map((group) => (
        <InventoryGroup key={group.categoryId} title={group.categoryName}>
          {group.items.map((item) => (
            <InventoryItemRow
              key={item.id}
              item={item}
              onClick={() => navigate(`/inventory/${item.id}`)}
              onEdit={() => {
                const data: InventoryItemFormValues = {
                  ...defaultFormValues,
                  name: item.name,
                  alternateNames: item.alternateNames,
                  status: item.isActive ? 'active' : 'inactive',
                  // You would map categoryId, unitId, etc. from item
                }
                setEditItem(data)
                setItemDialogOpen(true)
              }}
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

      <InventoryItemDialog
        open={itemDialogOpen}
        mode={editItem ? 'edit' : 'create'}
        defaultValues={editItem || defaultFormValues}
        categoryOptions={categories}
        unitOptions={units}
        locationOptions={locationOptions}
        onClose={() => setItemDialogOpen(false)}
        onSubmit={handleSubmitItem}
      />
    </MainLayout>
  )
}

export default InventoryListPage
