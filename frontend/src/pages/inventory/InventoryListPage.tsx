import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useInventoryStore } from '../../stores/inventoryStore'
import { groupAndSortInventoryItems } from '../../utils/groupAndSortInventoryItems'
import ReactPullToRefresh from 'react-pull-to-refresh'

const InventoryListPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, fetch, updateOrders } = useInventoryStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [vendorFilter, setVendorFilter] = useState<string[]>([])
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  useEffect(() => {
    fetch()
  }, [fetch])

  const groupedItems = groupAndSortInventoryItems(items, { searchQuery: search, status: statusFilter })

  const toggleVendor = (vendor: string) => {
    setVendorFilter(prev =>
      prev.includes(vendor) ? prev.filter(v => v !== vendor) : [...prev, vendor]
    )
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Inventory</Typography>
          <IconButton color="inherit" onClick={() => setFilterDialogOpen(true)}>
            <FilterListIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => fetch()}>
            <RefreshIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/inventory/create')}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box p={2}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <ReactPullToRefresh onRefresh={fetch} style={{ overflow: 'auto' }}>
        {groupedItems.map(group => (
          <Box key={group.categoryId} px={2} py={1}>
            <Typography variant="h6">{group.categoryName}</Typography>
            {group.items.map(item => (
              <Box
                key={item.id}
                onClick={() => navigate(`/inventory/${item.id}`)}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                  bgcolor: '#f9f9f9',
                  borderRadius: 1,
                  my: 0.5,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f0f0f0' },
                }}
              >
                <Box>
                  <Typography>{item.name}</Typography>
                  {item.alternateNames && <Typography variant="body2" color="text.secondary">{item.alternateNames}</Typography>}
                </Box>
                <Chip label={item.isActive ? 'Active' : 'Inactive'} size="small" color={item.isActive ? 'success' : 'default'} />
              </Box>
            ))}
          </Box>
        ))}
      </ReactPullToRefresh>

      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel>Status</FormLabel>
            <RadioGroup
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="active" control={<Radio />} label="Active" />
              <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Vendor</FormLabel>
            <FormGroup>
              {['Vendor A', 'Vendor B', 'Vendor C'].map((vendor) => (
                <FormControlLabel
                  key={vendor}
                  control={
                    <Checkbox
                      checked={vendorFilter.includes(vendor)}
                      onChange={() => toggleVendor(vendor)}
                    />
                  }
                  label={vendor}
                />
              ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default InventoryListPage
