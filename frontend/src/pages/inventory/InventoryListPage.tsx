import React, { useEffect } from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Chip,
  Toolbar,
  TextField,
  Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useInventoryStore } from '../../stores/inventoryStore'

const InventoryListPage = () => {
  const { items, loading, error, loadItems } = useInventoryStore()

  useEffect(() => {
    loadItems()
  }, [loadItems])

  console.log('items: ', items);
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!item.isActive) return acc // Skip inactive by default
    const key = item.categoryName || 'Uncategorized'
    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})
  console.log('groups: ', grouped);

  return (
    <>
      <Toolbar sx={{ gap: 2 }}>
        <TextField size="small" label="Search" />
        <Button variant="outlined">Filter</Button>
        <Button variant="contained" color="primary">Add Item</Button>
      </Toolbar>

      {loading && (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box textAlign="center" mt={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {!loading && !error && Object.entries(grouped).map(([category, items]) => (
        <Box key={category} mb={3}>
          <Typography variant="h6" gutterBottom>{category}</Typography>
          <List>
            {items.map(item => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end">
                      <EditIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={item.alternateNames?.join(', ')}
                  />
                  <Chip
                    label={item.isActive ? 'Active' : 'Inactive'}
                    color={item.isActive ? 'success' : 'default'}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      ))}
    </>
  )
}

export default InventoryListPage
