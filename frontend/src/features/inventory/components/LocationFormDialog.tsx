import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  initialData?: FormData;
  onSave: (data: FormData) => void;
  onClose: () => void;
}

export default function LocationFormDialog({ open, initialData, onSave, onClose }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { name: '' },
  });

  React.useEffect(() => {
    reset(initialData || { name: '' });
  }, [initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullScreen fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Location' : 'New Location'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSave)} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
