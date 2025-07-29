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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from '../../layouts/MainLayout';
import { useCategoryStore } from '../../stores/categoryStore';
import CategoryFormDialog from './components/CategoryFormDialog';

const CategoryListPage = () => {
    const {
        categories,
        loading,
        error,
        fetchCategories,
        removeCategory,
    } = useCategoryStore();

    const [openDialog, setOpenDialog] = useState(false);
    const [editCategory, setEditCategory] = useState<any | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddClick = () => {
        setEditCategory(null);
        setOpenDialog(true);
    }

    const handleEdit = (category: any) => {
        setEditCategory(category);
        setOpenDialog(true);
    };

    return (
        <MainLayout
            pageTitle="Categories"
            actions={(
                <IconButton color="inherit" onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            )}
        >
            <Box p={3}>
                {loading ? (
                    <Box mt={2}><CircularProgress /></Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <List>
                        {categories.map((cat) => (
                            <ListItem key={cat.id} divider>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    width="100%"
                                >
                                    <ListItemText primary={cat.name} />

                                    <Stack direction="row" spacing={1}>
                                        <IconButton onClick={() => handleEdit(cat)} size="small">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removeCategory(cat.id)} size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                )}

                <CategoryFormDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    initialData={editCategory}
                />
            </Box>
        </MainLayout>
    );
};

export default CategoryListPage;
