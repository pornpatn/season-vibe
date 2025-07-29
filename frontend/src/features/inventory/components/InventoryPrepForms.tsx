import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { InventoryPrepForm, Unit } from '../../../types/InventoryTypes';

interface Props {
  prepForms: InventoryPrepForm[];
  units: Unit[];
  onAdd: () => void;
  onEdit: (prepFormId: string) => void;
  onDelete: (prepFormId: string) => void;
}

const InventoryPrepForms: React.FC<Props> = ({ prepForms, units, onAdd, onEdit, onDelete }) => {
  const getUnitName = (unitId: string) => units.find(u => u.id === unitId)?.name || '-';

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Prep Forms</Typography>
          <Button startIcon={<AddIcon />} onClick={onAdd} variant="outlined">Add Prep Form</Button>
        </Stack>

        {prepForms.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No prep forms defined yet.</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Conversion</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prepForms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>{form.conversionRate}</TableCell>
                  <TableCell>{getUnitName(form.unitId)}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit(form.id)}><EditIcon /></IconButton>
                    <IconButton onClick={() => onDelete(form.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryPrepForms;