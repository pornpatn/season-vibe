// src/components/vendors/VendorDialog.tsx
import { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Vendor } from '../../../types/Vendor';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    isShopping: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface VendorDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: FormData) => Promise<void>;
    vendor?: Vendor; // if present, this is edit mode
}

export default function VendorDialog({ open, onClose, onSave, vendor }: VendorDialogProps) {
    const isEdit = !!vendor;

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            isShopping: false,
        },
    });

    useEffect(() => {
        if (vendor) {
            reset({
                name: vendor.name,
                isShopping: vendor.isShopping,
            });
        }
    }, [vendor, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            await onSave(data);
            reset();
            onClose();
        } catch (err) {
            console.error('Failed to save vendor', err);
        }
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
            <DialogTitle>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Vendor Name"
                                fullWidth
                                required
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="isShopping"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox checked={field.value} onChange={field.onChange} />}
                                label="Is Shopping Vendor"
                            />
                        )}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={isSubmitting}>
                    {isEdit ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
