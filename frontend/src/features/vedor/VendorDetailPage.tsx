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
import { useInventoryItemStore } from '../../stores/inventoryItemStore';
import { useUnitStore } from '../../stores/unitStore';
import VendorDialog from './components/VendorDialog';
import VendorContactList from './components/VendorContactList';
import VendorContactDialog from './components/VendorContactDialog';
import VendorInventoryItemList from './components/VendorInventoryItemList';
import MainLayout from '../../layouts/MainLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { VendorContact, VendorInventoryItemInput } from '../../types/Vendor';
import VendorInventoryItemAssignmentDialog from './components/VendorInventoryItemAssignmentDialog';

export default function VendorDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { vendor, fetchVendorById, assignItems } = useVendorStore();
    const fetchInventory = useInventoryItemStore((s) => s.fetchItems);
    const fetchUnits = useUnitStore((s) => s.fetchUnits);

    const [tab, setTab] = useState(0);

    const [openEdit, setOpenEdit] = useState(false);

    const [editingContact, setEditingContact] = useState<VendorContact | null>(null);
    const [contactDialogOpen, setContactDialogOpen] = useState(false);

    const [editAssignments, setEditAssignments] = useState(false);

    useEffect(() => {
        if (id) fetchVendorById(id);
    }, [id, fetchVendorById]);

    useEffect(() => {
        fetchInventory();
        fetchUnits();
    }, [fetchInventory, fetchUnits]);

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

    const handleSaveAssignments = async (items: VendorInventoryItemInput[]) => {
        await assignItems(vendor.id, items);
        setEditAssignments(false);
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
                            {tab === 1 && (
                                <>
                                    <Box display="flex" justifyContent="flex-end" mb={1}>
                                        <Button onClick={() => setEditAssignments(true)} variant="contained">
                                            Edit Assignments
                                        </Button>
                                    </Box>
                                    <VendorInventoryItemList items={vendor.inventoryVendorItems || []} />
                                </>
                            )}
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
                <VendorInventoryItemAssignmentDialog
                    open={editAssignments}
                    onClose={() => setEditAssignments(false)}
                    assignedItems={vendor.inventoryVendorItems || []}
                    onSave={handleSaveAssignments}
                />
            </Container>
        </MainLayout>
    );
}
