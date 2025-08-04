import { useEffect, useState } from 'react';
import {
    Button,
    Typography,
    Paper,
    Stack,
    Box,
    CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { useVendorStore } from '../../stores/vendorStore';
import MainLayout from '../../layouts/MainLayout';
import VendorDialog from './components/VendorDialog';

export default function VendorListPage() {
    const navigate = useNavigate();
    const { vendors, loading, error, fetchVendors, createVendor } = useVendorStore();

    const [openDialog, setOpenDialog] = useState(false);

    const handleAddClick = () => {
        setOpenDialog(true);
    }

    const handleCreateVendor = async (data: any) => {
        const newVendor = await createVendor(data);
        navigate(`/vendor/${newVendor.id}`);
    };

    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    return (
        <MainLayout
            pageTitle="Vendors"
            actions={(
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
                    New Vendor
                </Button>
            )}
        >
            <Box p={2}>
                {loading ? (
                    <Box mt={2}><CircularProgress /></Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : vendors.length === 0 ? (
                    <Typography>No vendors found.</Typography>
                ) : (
                    <Stack spacing={2}>
                        {vendors.map((vendor) => (
                            <Paper key={vendor.id} sx={{ overflow: 'hidden' }}>
                                <Box
                                    onClick={() => navigate(`/vendor/${vendor.id}`)}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'action.hover' },
                                    }}
                                >
                                    <Box>
                                        <Typography>{vendor.name}</Typography>
                                        {vendor.isShopping && (
                                            <Typography variant="body2" color="text.secondary">
                                                Shopping List
                                            </Typography>
                                        )}
                                    </Box>
                                    <ArrowForwardIosIcon fontSize="small" />
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                )}
            </Box>

            <VendorDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleCreateVendor}
            />

        </MainLayout>
    );
}
