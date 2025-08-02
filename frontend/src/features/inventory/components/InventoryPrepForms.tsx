import { useState } from 'react';
import {
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { InventoryItem, InventoryPrepForm } from '../../../types/InventoryTypes';
import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

interface Props {
  item: InventoryItem;
  onAdd: () => void;
  onEdit: (prepForm: InventoryPrepForm) => void;
  onDelete: (prepFormId: string) => void;
}

export default function InventoryPrepForms({ item, onAdd, onEdit, onDelete }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPrepFormId, setSelectedPrepFormId] = useState<string | null>(null);

  const handleDeleteClick = (assignmentId: string) => {
    setSelectedPrepFormId(assignmentId);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (selectedPrepFormId) {
      onDelete(selectedPrepFormId);
    }
    setConfirmOpen(false);
    setSelectedPrepFormId(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setSelectedPrepFormId(null);
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Prep Forms</Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Form
          </Button>
        </Box>

        {item.inventoryPrepForms.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No prep forms defined.
          </Typography>
        ) : (
          item.inventoryPrepForms.map(form => (
            <Box key={form.id} sx={{ mb: 1, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle1">{form.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unit: {form.unit?.name} | Conversion: {form.conversionRate}
                    {form.note && ` | Note: ${form.note}`}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={() => onEdit(form)}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteClick(form.id)}><Delete fontSize="small" /></IconButton>
                </Stack>
              </Stack>
            </Box>
          ))
        )}
      </CardContent>

      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>Remove Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this prep form?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}