import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import InventoryItemForm, { type InventoryItemFormValues } from './InventoryItemForm'

interface Props {
  open: boolean
  mode: 'create' | 'edit'
  defaultValues: InventoryItemFormValues
  categoryOptions: { id: string; name: string }[]
  unitOptions: { id: string; name: string }[]
  locationOptions: { id: string; name: string }[]
  onClose: () => void
  onSubmit: (data: InventoryItemFormValues) => void
}

const InventoryItemDialog: React.FC<Props> = ({
  open,
  mode,
  defaultValues,
  categoryOptions,
  unitOptions,
  locationOptions,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{mode === 'create' ? 'Add Inventory Item' : 'Edit Inventory Item'}</DialogTitle>
      <DialogContent>
        <InventoryItemForm
          defaultValues={defaultValues}
          categoryOptions={categoryOptions}
          unitOptions={unitOptions}
          locationOptions={locationOptions}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default InventoryItemDialog
