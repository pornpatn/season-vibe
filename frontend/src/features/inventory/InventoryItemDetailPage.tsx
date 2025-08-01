import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { CircularProgress, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { InventoryItem, InventoryLocationAssignment } from '../../types/InventoryTypes';
import { useInventoryItemStore } from '../../stores/inventoryItemStore';
import { useCategoryStore } from '../../stores/categoryStore'
import { useUnitStore } from '../../stores/unitStore';
import { useLocationStore } from '../../stores/locationStore';
import InventoryItemBasicInfo from './components/InventoryItemBasicInfo';
// import InventoryPrepForms from './components/InventoryPrepForms';
import InventoryLocations from './components/InventoryLocations';
import InventoryLocationDialog from './components/InventoryLocationDialog';
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
   } = useInventoryItemStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { units, fetchUnits } = useUnitStore();
  const { locations, fetchLocations } = useLocationStore();

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [editAssignment, setEditAssignment] = useState<InventoryLocationAssignment | null>(null);

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
    setEditAssignment(null);
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
        {/* <InventoryPrepForms
          prepForms={item.inventoryPrepForms}
          units={units}
          onAdd={() => addPrepForm(item.id)}
          onEdit={(prepFormId) => editPrepForm(item.id, prepFormId)}
          onDelete={(prepFormId) => deletePrepForm(item.id, prepFormId)}
        /> */}
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
          assignment={editAssignment ?? undefined}
          availableLocations={unassignedLocations}
          onSave={handleLocationSave}
        />
      </Container>
    </MainLayout>
  );
};

export default InventoryItemDetailPage