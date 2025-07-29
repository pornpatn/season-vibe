import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Stack,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from '../../layouts/MainLayout';
import { useUnitStore } from '../../stores/unitStore';
import UnitFormDialog from './components/UnitFormDialog';

const UnitListPage = () => {
    const {
        units,
        loading,
        error,
        fetchUnits,
        removeUnit,
    } = useUnitStore();

    const [openDialog, setOpenDialog] = useState(false);
    const [editUnit, setEditUnit] = useState<any | null>(null);

    useEffect(() => {
        fetchUnits();
    }, []);

    const handleAddClick = () => {
        setEditUnit(null);
        setOpenDialog(true);
    }

    const handleEdit = (Unit: any) => {
        setEditUnit(Unit);
        setOpenDialog(true);
    };

    return (
        <MainLayout
            pageTitle="Units"
            actions={(
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
                    New Unit
                </Button>
            )}
        >
            <Box p={3}>
                {loading ? (
                    <Box mt={2}><CircularProgress /></Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : units.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        No units found. Click "New Unit" to create one.
                    </Typography>
                ) : (
                    <List>
                        {units.map((unit) => (
                            <ListItem key={unit.id} divider>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    width="100%"
                                >
                                    <ListItemText primary={unit.name} />

                                    <Stack direction="row" spacing={1}>
                                        <IconButton onClick={() => handleEdit(unit)} size="small">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removeUnit(unit.id)} size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                )}

                <UnitFormDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    initialData={editUnit}
                />
            </Box>
        </MainLayout>
    );
};

export default UnitListPage;
