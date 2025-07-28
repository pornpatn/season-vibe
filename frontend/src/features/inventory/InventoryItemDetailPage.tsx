import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { CircularProgress, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { InventoryItem } from '../../types/Inventory';
import { useInventoryItemStore } from '../../stores/inventoryItemStore';
import { useCategoryStore } from '../../stores/categoryStore'
import { useUnitStore } from '../../stores/unitStore';
import InventoryItemBasicInfo from './components/InventoryItemBasicInfo';
// import InventoryPrepForms from './components/InventoryPrepForms';
// import InventoryLocationAssignments from '../components/InventoryLocationAssignments';
import MainLayout from '../../layouts/MainLayout';

const InventoryItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { selectedItem, fetchItem, updateItem, loading, clearSelectedItem } = useInventoryItemStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { units, fetchUnits } = useUnitStore();

  useEffect(() => {
    if (id) fetchItem(id);
    fetchCategories();
    fetchUnits();
    return () => clearSelectedItem(); // cleanup when unmounting
  }, [id]);

  const handleEditItem = async (data: Partial<InventoryItem>) => {
    if (!selectedItem) return;
    const updatedItem = await updateItem(selectedItem.id, data);
    return updatedItem;
  }

  const handleToggleItemStatus = async () => {
    if (!selectedItem) return;
    const updatedItem = await updateItem(selectedItem.id, { isActive: !selectedItem.isActive});
    return updatedItem;
  }

  if (loading) return <CircularProgress />;

  if (!selectedItem) return <Typography>No item found.</Typography>;

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

        {/* <InventoryLocationAssignments
        itemId={item.id}
        locations={item.locationAssignments}
        onAssignClick={() => assignLocation(item.id)}
        onDeleteClick={(assignmentId) => deleteLocationAssignment(item.id, assignmentId)}
      /> */}
      </Container>
    </MainLayout>
  );
};

export default InventoryItemDetailPage