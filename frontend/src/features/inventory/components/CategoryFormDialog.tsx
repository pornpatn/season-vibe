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
import { useCategoryStore } from '../../../stores/categoryStore';

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});
type CategoryFormValues = z.infer<typeof categorySchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: { id: string; name: string };
}

const CategoryFormDialog: React.FC<Props> = ({ open, onClose, initialData }) => {
  const isEdit = !!initialData;
  const { addCategory, editCategory } = useCategoryStore();

  const { control, handleSubmit, reset } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || '',
    },
  });

  React.useEffect(() => {
    reset({ name: initialData?.name || '' });
  }, [initialData, reset]);

  const onSubmit = async (values: CategoryFormValues) => {
    if (isEdit) {
      await editCategory(initialData!.id, values);
    } else {
      await addCategory(values);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Category Name"
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

export default CategoryFormDialog;
