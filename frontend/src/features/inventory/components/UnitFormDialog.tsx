import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUnitStore } from '../../../stores/unitStore';

const unitSchema = z.object({
  name: z.string().min(1, 'Unit name is required'),
});
type UnitFormValues = z.infer<typeof unitSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: { id: string; name: string };
}

const UnitFormDialog: React.FC<Props> = ({ open, onClose, initialData }) => {
  const isEdit = !!initialData;
  const { addUnit, editUnit } = useUnitStore();

  const { control, handleSubmit, reset } = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: initialData?.name || '',
    },
  });

  React.useEffect(() => {
    reset({ name: initialData?.name || '' });
  }, [initialData, reset]);

  const onSubmit = async (values: UnitFormValues) => {
    if (isEdit) {
      await editUnit(initialData!.id, values);
    } else {
      await addUnit(values);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Unit' : 'Add Unit'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Unit Name"
                fullWidth
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnitFormDialog;
