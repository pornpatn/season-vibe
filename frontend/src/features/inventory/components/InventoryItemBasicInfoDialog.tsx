import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { InventoryItem, Unit, InventoryCategory } from '../../../types/Inventory';

const schema = z.object({
  name: z.string().min(1),
  alternateNames: z.string().optional(),
  description: z.string().optional(),
  note: z.string().optional(),
  categoryId: z.string().min(1),
  unitId: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  mode: 'create' | 'edit'
  open: boolean;
  item: InventoryItem;
  onClose: () => void;
  onSave: (data: FormValues) => void;
  units?: Unit[];
  categories?: InventoryCategory[];
}

const InventoryItemBasicInfoDialog: React.FC<Props> = ({
  mode,
  open,
  item,
  onClose,
  onSave,
  units = [],
  categories = [],
}) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: item.name,
      alternateNames: item.alternateNames || '',
      description: item.description || '',
      note: item.note || '',
      categoryId: item.categoryId,
      unitId: item.unitId || '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'create' ? 'Add Inventory Item' : 'Edit Inventory Item'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField label="Name" required fullWidth {...field} />}
            />
            <Controller
              name="alternateNames"
              control={control}
              render={({ field }) => <TextField label="Alternate Names" fullWidth {...field} />}
            />
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <TextField select label="Category" required fullWidth {...field}>
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="unitId"
              control={control}
              render={({ field }) => (
                <TextField select label="Unit" required fullWidth {...field}>
                  {units.map((u) => (
                    <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextField label="Description" fullWidth multiline rows={2} {...field} />}
            />
            <Controller
              name="note"
              control={control}
              render={({ field }) => <TextField label="Note" fullWidth multiline rows={2} {...field} />}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InventoryItemBasicInfoDialog;