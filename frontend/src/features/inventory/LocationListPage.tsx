import React from 'react';
import {
    Box, IconButton, Stack, Typography, Paper, CircularProgress,
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocationStore } from '../../stores/locationStore';
import MainLayout from '../../layouts/MainLayout';
import LocationFormDialog from './components/LocationFormDialog';

export default function LocationListPage() {
    const { locations, loading, error, fetchLocations, addLocation, updateLocation, removeLocation } = useLocationStore();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<any>(null);

    React.useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    const handleAddClick = () => {
        setEditing(null);
        setDialogOpen(true);
    }

    const handleSave = async (data: any) => {
        if (editing) {
            await updateLocation(editing.id, data);
        } else {
            await addLocation(data);
        }
        setDialogOpen(false);
        setEditing(null);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setEditing(null);
    };

    return (
        <MainLayout
            pageTitle="Locations"
            actions={(
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
                    New Location
                </Button>
            )}
        >
            <Box p={2}>
                {loading ? (
                    <Box mt={2}><CircularProgress /></Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : locations.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        No locations found. Click "New Location" to create one.
                    </Typography>
                ) : (
                    <Stack spacing={2}>
                        {locations.map((loc) => (
                            <Paper key={loc.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{loc.name}</Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton onClick={() => { setEditing(loc); setDialogOpen(true); }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => removeLocation(loc.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}

                <LocationFormDialog
                    open={dialogOpen}
                    initialData={editing}
                    onSave={handleSave}
                    onClose={handleClose}
                />
            </Box>
        </MainLayout>
    );
}
