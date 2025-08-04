// src/components/vendors/VendorInventoryItemList.tsx
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import type { VendorInventoryItem } from '../../../types/Vendor';

interface Props {
  items: VendorInventoryItem[];
}

export default function VendorInventoryItemList({ items }: Props) {
  const grouped = groupByCategory(items);

  if (items.length === 0) {
    return <Typography>No items assigned.</Typography>;
  }

  return (
    <Box>
      {Object.entries(grouped).map(([category, group]) => (
        <Box key={category} mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            {category}
          </Typography>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell>Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.inventoryItem?.name}</TableCell>
                    <TableCell>{item.vendorName || '-'}</TableCell>
                    <TableCell>{item.vendorNote || '-'}</TableCell>
                    <TableCell>{item.unit?.name || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}

function groupByCategory(items: VendorInventoryItem[]) {
  const result: Record<string, VendorInventoryItem[]> = {};
  for (const item of items) {
    const category = item.inventoryItem?.category?.name || 'Uncategorized';
    if (!result[category]) result[category] = [];
    result[category].push(item);
  }
  return result;
}
