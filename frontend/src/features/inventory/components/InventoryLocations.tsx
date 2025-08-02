import { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Box,
    DialogTitle,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import type { InventoryItem, InventoryLocationAssignment } from '../../../types/InventoryTypes'

type Props = {
    item: InventoryItem;
    unassignedLocations: { id: string; name: string }[];
    onAssign: () => void;
    onEdit: (assignment: InventoryLocationAssignment) => void;
    onDelete: (assignmentId: string) => void;
};

function getParSummary(assignment: InventoryLocationAssignment): string {
    if (assignment.parSummary) return assignment.parSummary;

    const amounts = assignment.parLevels.map(p => p.amount);
    if (amounts.length === 0) return '-';

    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    return min === max ? `${min}` : `${min}–${max}`;
}

export default function InventoryLocations({
    item,
    unassignedLocations,
    onAssign,
    onEdit,
    onDelete,
}: Props) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    const handleDeleteClick = (assignmentId: string) => {
        setSelectedAssignmentId(assignmentId);
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        if (selectedAssignmentId) {
            onDelete(selectedAssignmentId);
        }
        setConfirmOpen(false);
        setSelectedAssignmentId(null);
    };

    const handleCancel = () => {
        setConfirmOpen(false);
        setSelectedAssignmentId(null);
    };

    const rows = item.inventoryLocationItems || [];
    const hasAvailable = unassignedLocations.length > 0;

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">Par Levels by Location</Typography>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAssign}
                        disabled={!hasAvailable}
                    >
                        Location
                    </Button>
                </Box>

                {rows.length === 0 ? (
                    <Typography>No location data available.</Typography>
                ) : (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Location</TableCell>
                                <TableCell>Par Level (Summary)</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((assignment) => (
                                <TableRow key={assignment.id}>
                                    <TableCell>{assignment.location.name || 'Unknown'}</TableCell>
                                    <TableCell>{getParSummary(assignment)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => onEdit(assignment)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDeleteClick(assignment.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>

            <Dialog open={confirmOpen} onClose={handleCancel}>
                <DialogTitle>Remove Assignment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this location assignment? All associated par levels will be deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
