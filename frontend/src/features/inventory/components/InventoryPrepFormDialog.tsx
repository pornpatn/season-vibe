import { useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Stack
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { InventoryPrepForm, Unit } from '../../../types/InventoryTypes';


type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (data: Omit<InventoryPrepForm, 'id' | 'unit'>) => void;
    prepForm?: InventoryPrepForm;
    units?: Unit[]
};

export default function InventoryPrepFormDialog({
    open,
    onClose,
    onSave,
    prepForm,
    units = [],
}: Props) {
    const { control, handleSubmit, reset } = useForm<Omit<InventoryPrepForm, 'id' | 'unit'>>({
        defaultValues: {
            name: '',
            unitId: '',
            conversionRate: 1,
            note: '',
        },
    });

    useEffect(() => {
        if (prepForm) {
            const { id, unit, ...formData } = prepForm;
            reset(formData);
        } else {
            reset({ name: '', unitId: '', conversionRate: 1, note: '' });
        }
    }, [prepForm, reset]);

    const handleFormSubmit = (data: Omit<InventoryPrepForm, 'id' | 'unit'>) => {
        onSave({
            ...data,
            conversionRate: Number(data.conversionRate),
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{prepForm ? 'Edit Prep Form' : 'Add Prep Form'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <TextField label="Name" fullWidth required {...field} />}
                    />
                    <Controller
                        name="unitId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField label="Unit" select fullWidth required {...field}>
                                {units.map(unit => (
                                    <MenuItem key={unit.id} value={unit.id}>
                                        {unit.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name="conversionRate"
                        control={control}
                        rules={{ required: true, min: 0.001 }}
                        render={({ field }) => (
                            <TextField
                                label="Conversion Rate"
                                type="number"
                                fullWidth
                                inputProps={{ step: 'any', min: 0 }}
                                {...field}
                            />
                        )}
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
                <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}
