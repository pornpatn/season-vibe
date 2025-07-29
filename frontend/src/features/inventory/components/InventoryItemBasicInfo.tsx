import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InventoryItemBasicInfoDialog from './InventoryItemBasicInfoDialog';
import type { InventoryItem, Unit, InventoryCategory } from '../../../types/InventoryTypes';

interface InventoryItemBasicInfoProps {
  item: InventoryItem;
  onItemUpdate: (data: Partial<InventoryItem>) => void;
  onItemToggleStatus: () => void;
  units?: Unit[];
  categories?: InventoryCategory[];
}

const InventoryItemBasicInfo: React.FC<InventoryItemBasicInfoProps> = ({
  item,
  onItemUpdate,
  onItemToggleStatus,
  units = [],
  categories = [],
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleStatus = async () => {
    if (!item) return;
    try {
      onItemToggleStatus();
    } catch (err) {
      console.error('Failed to update status', err);
      // Optionally show a snackbar or error message
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Basic Information</Typography>
          <Button startIcon={<EditIcon />} onClick={() => setOpen(true)}>
            Edit
          </Button>
        </Stack>

        <Stack spacing={1}>
          <Typography><strong>Name:</strong> {item.name}</Typography>
          <Typography><strong>Category:</strong> {item.category?.name || '-'}</Typography>
          <Typography><strong>Alternate Names:</strong> {item.alternateNames || '-'}</Typography>
          <Typography><strong>Unit:</strong> {item.unit?.name || '-'}</Typography>
          <Typography><strong>Description:</strong> {item.description || '-'}</Typography>
          <Typography><strong>Note:</strong> {item.note || '-'}</Typography>

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography><strong>Status:</strong></Typography>
            <Chip
              label={item.isActive ? 'Active' : 'Inactive'}
              color={item.isActive ? 'success' : 'default'}
              onClick={handleToggleStatus}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </CardContent>

      <InventoryItemBasicInfoDialog
        mode={'edit'}
        open={open}
        item={item}
        onClose={() => setOpen(false)}
        onSave={(data) => {
          onItemUpdate(data);
          setOpen(false);
        }}
        categories={categories}
        units={units}
      />
    </Card>
  );
};

export default InventoryItemBasicInfo;