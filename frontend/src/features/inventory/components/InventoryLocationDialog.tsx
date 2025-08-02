import { useEffect, useState } from 'react';
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
    TextField,
    FormControlLabel,
    Switch,
    Grid,
    Typography,
} from '@mui/material';
import type { InventoryLocationAssignment } from '../../../types/InventoryTypes';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type ParLevel = { dayOfWeek: number; amount: number };

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (data: {
        locationId: string;
        parLevels: ParLevel[];
    }) => void;
    availableLocations?: { id: string; name: string }[];
    assignment?: InventoryLocationAssignment;
};

export default function InventoryLocationDialog({
    open,
    onClose,
    onSave,
    availableLocations = [],
    assignment,
}: Props) {
    const isEditMode = !!assignment;

    const [locationId, setLocationId] = useState('');
    const [isFixed, setIsFixed] = useState(true);
    const [fixedPar, setFixedPar] = useState<number | ''>('');
    const [dailyPar, setDailyPar] = useState<(number | '')[]>(Array(7).fill(''));

    // Setup initial values
    useEffect(() => {
        if (isEditMode && assignment) {
            setLocationId(assignment.location.id);
            const values = assignment.parLevels.map(p => p.amount);
            const isSame = values.every(val => val === values[0]);
            setIsFixed(isSame);
            if (isSame) {
                setFixedPar(values[0]);
            } else {
                setDailyPar(values);
            }
        } else {
            setLocationId('');
            setIsFixed(true);
            setFixedPar('');
            setDailyPar(Array(7).fill(''));
        }
    }, [open, isEditMode, assignment]);

    const handleSubmit = () => {
        const parLevels: ParLevel[] = isFixed
            ? Array(7).fill(null).map((_, i) => ({ dayOfWeek: i, amount: Number(fixedPar) }))
            : dailyPar.map((val, i) => ({ dayOfWeek: i, amount: Number(val) }));

        onSave({ locationId, parLevels });
    };

    const canSubmit = locationId && (isFixed
        ? fixedPar !== '' && !isNaN(Number(fixedPar))
        : dailyPar.every(v => v !== '' && !isNaN(Number(v)))
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{isEditMode ? 'Edit Par Levels' : 'Assign Location'}</DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
                {isEditMode && assignment ? (
                    <Typography variant="subtitle2" gutterBottom>
                        📍 {assignment.location.name}
                    </Typography>
                ) : (
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="location-label">Location</InputLabel>
                        <Select
                            labelId="location-label"
                            value={locationId}
                            onChange={(e) => setLocationId(e.target.value)}
                            label="Location"
                        >
                            {availableLocations.map(loc => (
                                <MenuItem key={loc.id} value={loc.id}>
                                    {loc.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <FormControlLabel
                    control={
                        <Switch
                            checked={!isFixed}
                            onChange={() => setIsFixed(prev => !prev)}
                            color="primary"
                        />
                    }
                    label={isFixed ? 'Same par level every day' : 'Different par levels by day'}
                    sx={{ mt: 2 }}
                />

                {isFixed ? (
                    <TextField
                        type="number"
                        label="Par Level"
                        value={fixedPar}
                        onChange={(e) => setFixedPar(Number(e.target.value))}
                        fullWidth
                        margin="dense"
                    />
                ) : (
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        {dayNames.map((day, idx) => (
                            <Grid size={{ xs: 6 }} key={idx}>
                                <TextField
                                    type="number"
                                    label={day}
                                    value={dailyPar[idx]}
                                    onChange={(e) => {
                                        const updated = [...dailyPar];
                                        updated[idx] = Number(e.target.value);
                                        setDailyPar(updated);
                                    }}
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!canSubmit} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
