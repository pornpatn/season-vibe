import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    Tabs,
    Tab,
    Paper,
    Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useVendorStore } from '../../stores/vendorStore';
import VendorDialog from './components/VendorDialog';
import VendorContactList from './components/VendorContactList';
import VendorContactDialog from './components/VendorContactDialog';
// import VendorAssignedItemList from '../../components/vendors/VendorAssignedItemList';
import MainLayout from '../../layouts/MainLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { VendorContact } from '../../types/Vendor';

export default function VendorDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { fetchVendorById, vendor } = useVendorStore();
    const [tab, setTab] = useState(0);

    const [openEdit, setOpenEdit] = useState(false);

    const [contactDialogOpen, setContactDialogOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<VendorContact | null>(null);

    useEffect(() => {
        if (id) fetchVendorById(id);
    }, [id, fetchVendorById]);

    if (!vendor) return <Typography>Loading vendor...</Typography>;

    const handleAddContact = () => {
        setEditingContact(null);
        setContactDialogOpen(true);
    };

    const handleEditContact = (contact: VendorContact) => {
        setEditingContact(contact);
        setContactDialogOpen(true);
    };

    const handleDeleteContact = async (contact: VendorContact) => {
        if (!window.confirm(`Delete contact "${contact.name}"?`)) return;
        await useVendorStore.getState().deleteContact(vendor.id, contact.id);
    };

    return (
        <MainLayout
            pageTitle="Vendor Detail"
        >
            <Container maxWidth="md">
                <Button
                    startIcon={<ArrowBackIcon />}
                    component={RouterLink}
                    to="/vendor"
                    variant="outlined"
                >
                    Back to List
                </Button>


                <Box my={4}>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                {vendor.name}
                            </Typography>
                            {vendor.isShopping && (
                                <Typography variant="body2" color="text.secondary">
                                    Shopping List
                                </Typography>
                            )}
                        </Box>
                        <Button onClick={() => setOpenEdit(true)} variant="outlined">
                            Edit Info
                        </Button>
                    </Stack>

                    <Paper>
                        <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)}>
                            <Tab label="Contacts" />
                            <Tab label="Assigned Items" />
                        </Tabs>

                        <Box p={2}>
                            {tab === 0 && (
                                <VendorContactList
                                    contacts={vendor.contacts || []}
                                    onAdd={handleAddContact}
                                    onEdit={handleEditContact}
                                    onDelete={handleDeleteContact}
                                />
                            )}
                            {/* {tab === 1 && <VendorAssignedItemList vendor={vendor} />} */}
                        </Box>
                    </Paper>
                </Box>

                <VendorDialog
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    vendor={vendor}
                    onSave={async (data: any) => {
                        await useVendorStore.getState().updateVendor(vendor.id, data);
                        setOpenEdit(false);
                    }}
                />
                <VendorContactDialog
                    open={contactDialogOpen}
                    onClose={() => setContactDialogOpen(false)}
                    vendorId={vendor.id}
                    contact={editingContact}
                    onSave={async (data: any) => {
                        const store = useVendorStore.getState();
                        if (editingContact) {
                            await store.updateContact(vendor.id, editingContact.id, data);
                        } else {
                            await store.addContact(vendor.id, data);
                        }
                        setContactDialogOpen(false);
                    }}
                />
            </Container>
        </MainLayout>
    );
}
