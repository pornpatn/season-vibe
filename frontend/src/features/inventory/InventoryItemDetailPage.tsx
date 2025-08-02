import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { CircularProgress, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { InventoryItem, InventoryLocationAssignment, InventoryPrepForm } from '../../types/InventoryTypes';
import { useInventoryItemStore } from '../../stores/inventoryItemStore';
import { useCategoryStore } from '../../stores/categoryStore'
import { useUnitStore } from '../../stores/unitStore';
import { useLocationStore } from '../../stores/locationStore';
import InventoryItemBasicInfo from './components/InventoryItemBasicInfo';
import InventoryLocations from './components/InventoryLocations';
import InventoryLocationDialog from './components/InventoryLocationDialog';
import InventoryPrepForms from './components/InventoryPrepForms';
import InventoryPrepFormDialog from './components/InventoryPrepFormDialog';
import MainLayout from '../../layouts/MainLayout';

const InventoryItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    selectedItem,
    loading,
    fetchItem,
    updateItem,
    clearSelectedItem,
    updateParLevels,
    assignLocation,
    deleteLocationAssignment,
    createPrepForm,
    updatePrepForm,
    deletePrepForm,
  } = useInventoryItemStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { units, fetchUnits } = useUnitStore();
  const { locations, fetchLocations } = useLocationStore();

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [editAssignment, setEditAssignment] = useState<InventoryLocationAssignment | undefined>(undefined);

  const [prepFormDialogOpen, setPrepFormDialogOpen] = useState(false);
  const [editingPrepForm, setEditingPrepForm] = useState<InventoryPrepForm | undefined>(undefined);

  useEffect(() => {
    if (id) fetchItem(id);
    fetchCategories();
    fetchUnits();
    fetchLocations()
    return () => clearSelectedItem(); // cleanup when unmounting
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!selectedItem) return <Typography>No item found.</Typography>;

  const assignedIds = new Set(selectedItem.inventoryLocationItems.map(a => a.location.id));
  const unassignedLocations = locations.filter(loc => !assignedIds.has(loc.id));

  const handleEditItem = async (data: Partial<InventoryItem>) => {
    if (!selectedItem) return;
    const updatedItem = await updateItem(selectedItem.id, data);
    return updatedItem;
  }

  const handleToggleItemStatus = async () => {
    if (!selectedItem) return;
    const updatedItem = await updateItem(selectedItem.id, { isActive: !selectedItem.isActive });
    return updatedItem;
  }

  const handleLocationAssignClick = async () => {
    setEditAssignment(undefined);
    setLocationDialogOpen(true);
  }

  const handleLocationEditClick = async (assignment: InventoryLocationAssignment) => {
    setEditAssignment(assignment);
    setLocationDialogOpen(true);
  }

  const handleLocationDelete = async (assignmentId: string) => {
    await deleteLocationAssignment(selectedItem.id, assignmentId);
  }

  const handleLocationSave = async ({
    locationId,
    parLevels,
  }: {
    locationId: string;
    parLevels: { dayOfWeek: number; amount: number }[];
  }) => {
    if (editAssignment) {
      await updateParLevels(selectedItem.id, editAssignment.id, parLevels);
    } else {
      await assignLocation(selectedItem.id, locationId, parLevels);
    }

    setLocationDialogOpen(false);
  }

  const handlePrepFormAddClick = async () => {
    setEditingPrepForm(undefined);
    setPrepFormDialogOpen(true);
  }

  const handlePrepFormEditClick = async (prepForm: InventoryPrepForm) => {
    setEditingPrepForm(prepForm);
    setPrepFormDialogOpen(true);
  }

  const handlePrepFormDelete = async (prepFormId: string) => {
    await deletePrepForm(selectedItem.id, prepFormId);
  }

  const handlePrepFormSave = async (data: Omit<InventoryPrepForm, 'id' | 'unit'>) => {
    if (editingPrepForm) {
      await updatePrepForm(selectedItem.id, editingPrepForm.id, data);
    } else {
      await createPrepForm(selectedItem.id, data);
    }

    setPrepFormDialogOpen(false);
  }

  return (
    <MainLayout
      pageTitle="Inventory Item Details"
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/inventory"
          variant="outlined"
        >
          Back to List
        </Button>
        <Typography variant="h5" gutterBottom>
          {selectedItem.name}
        </Typography>
        <InventoryItemBasicInfo
          item={selectedItem}
          onItemUpdate={handleEditItem}
          onItemToggleStatus={handleToggleItemStatus}
          categories={categories}
          units={units}
        />
        <InventoryLocations
          item={selectedItem}
          unassignedLocations={unassignedLocations}
          onAssign={handleLocationAssignClick}
          onEdit={handleLocationEditClick}
          onDelete={handleLocationDelete}
        />
        <InventoryLocationDialog
          open={locationDialogOpen}
          onClose={() => setLocationDialogOpen(false)}
          assignment={editAssignment}
          availableLocations={unassignedLocations}
          onSave={handleLocationSave}
        />
        <InventoryPrepForms
          item={selectedItem}
          onAdd={handlePrepFormAddClick}
          onEdit={handlePrepFormEditClick}
          onDelete={handlePrepFormDelete}
        />
        <InventoryPrepFormDialog
          open={prepFormDialogOpen}
          onClose={() => setPrepFormDialogOpen(false)}
          onSave={handlePrepFormSave}
          prepForm={editingPrepForm}
          units={units}
        />
      </Container>
    </MainLayout>
  );
};

export default InventoryItemDetailPage