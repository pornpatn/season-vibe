import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material'

interface Props {
  open: boolean
  status: string
  locationIds: string[]
  onClose: () => void
  onApply: (filters: { status: string; locationIds: string[] }) => void
}

const InventoryFilterDialog: React.FC<Props> = ({
  open,
  status,
  locationIds,
  onClose,
  onApply,
}) => {
  const [localStatus, setLocalStatus] = React.useState(status)
  const [localLocations, setLocalLocations] = React.useState<string[]>(locationIds)

  const handleApply = () => {
    onApply({ status: localStatus, locationIds: localLocations })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Inventory</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={localStatus}
            onChange={(e) => setLocalStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Locations</InputLabel>
          <Select
            multiple
            value={localLocations}
            onChange={(e) => setLocalLocations(e.target.value as string[])}
            input={<OutlinedInput label="Locations" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {/* Replace with dynamic location list */}
            {['Main', 'Warehouse'].map((loc) => (
              <MenuItem key={loc} value={loc}>
                <Checkbox checked={localLocations.includes(loc)} />
                <ListItemText primary={loc} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained">Apply</Button>
      </DialogActions>
    </Dialog>
  )
}

export default InventoryFilterDialog
