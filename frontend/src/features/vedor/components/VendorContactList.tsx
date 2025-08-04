// src/components/vendors/VendorContactList.tsx
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Stack,
} from '@mui/material';
import type { VendorContact } from '../../../types/Vendor';

interface Props {
    contacts: VendorContact[];
    onAdd: () => void;
    onEdit: (contact: VendorContact) => void;
    onDelete: (contact: VendorContact) => void;
}

export default function VendorContactList({ contacts, onAdd, onEdit, onDelete }: Props) {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Contacts</Typography>
                <Button onClick={onAdd} variant="contained">
                    Add Contact
                </Button>
            </Stack>

            {contacts.length === 0 ? (
                <Typography>No contacts found.</Typography>
            ) : (
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.role}</TableCell>
                                    <TableCell>{c.phone || '-'}</TableCell>
                                    <TableCell>{c.email || '-'}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" onClick={() => onEdit(c)}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="error" onClick={() => onDelete(c)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Box>
    );
}
