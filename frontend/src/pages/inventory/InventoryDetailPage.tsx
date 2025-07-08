import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Chip,
  Paper,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import { useInventoryStore } from '../../stores/inventoryStore'

const InventoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { items } = useInventoryStore()

  const item = items.find(i => i.id === id)

  if (!item) {
    return (
      <Box p={2}>
        <Typography>Item not found.</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{item.name}</Typography>
          <IconButton color="inherit" onClick={() => navigate(`/inventory/${id}/edit`)}>
            <EditIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box p={2}>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2">Category</Typography>
          <Typography>{item.categoryName}</Typography>
        </Paper>

        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2">Status</Typography>
          <Chip label={item.isActive ? 'Active' : 'Inactive'} color={item.isActive ? 'success' : 'default'} size="small" />
        </Paper>

        {item.alternateNames && (
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2">Alternate Names</Typography>
            <Typography>{item.alternateNames}</Typography>
          </Paper>
        )}

        {item.description && (
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2">Description</Typography>
            <Typography>{item.description}</Typography>
          </Paper>
        )}

        {item.note && (
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle2">Note</Typography>
            <Typography>{item.note}</Typography>
          </Paper>
        )}

        <Box mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {/* implement inactivate logic */}}
          >
            Mark as Inactive
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default InventoryDetailPage