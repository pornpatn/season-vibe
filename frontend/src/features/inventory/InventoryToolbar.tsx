import React from 'react'
import { Box, TextField, IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

interface Props {
  search: string
  onSearchChange: (value: string) => void
  onOpenFilter: () => void
}

const InventoryToolbar: React.FC<Props> = ({
  search,
  onSearchChange,
  onOpenFilter,
}) => {
  return (
    <Box display="flex" alignItems="center" padding={1} gap={1}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Search inventory..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <IconButton onClick={onOpenFilter}>
        <FilterListIcon />
      </IconButton>
    </Box>
  )
}

export default InventoryToolbar
