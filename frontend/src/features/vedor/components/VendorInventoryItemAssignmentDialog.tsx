import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Checkbox,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Box,
    Stack,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {
    VendorInventoryItemInput,
    VendorInventoryItem,
} from '../../../types/Vendor';
import type { InventoryItem } from '../../../types/InventoryTypes';
import { useInventoryItemStore } from '../../../stores/inventoryItemStore';
import { useUnitStore } from '../../../stores/unitStore';

interface Props {
    open: boolean;
    onClose: () => void;
    assignedItems: VendorInventoryItem[];
    onSave: (items: VendorInventoryItemInput[]) => void;
}

interface ItemState {
    inventoryItemId: string;
    checked: boolean;
    vendorName?: string;
    vendorNote?: string;
    unitId?: string | null;
}

export default function VendorInventoryItemAssignmentDialog({
    open,
    onClose,
    assignedItems,
    onSave,
}: Props) {
    const inventoryItems = useInventoryItemStore((s) => s.items);
    const units = useUnitStore((s) => s.units);

    const [form, setForm] = useState<Record<string, ItemState>>({});

    useEffect(() => {
        // Initialize form from all inventory items
        const initial: Record<string, ItemState> = {};
        for (const item of inventoryItems) {
            const existing = assignedItems.find((v) => v.inventoryItemId === item.id);
            initial[item.id] = {
                inventoryItemId: item.id,
                checked: !!existing,
                vendorName: existing?.vendorName ?? '',
                vendorNote: existing?.vendorNote ?? '',
                unitId: existing?.unitId ?? '',
            };
        }
        setForm(initial);
    }, [inventoryItems, assignedItems]);

    const handleToggle = (id: string) => {
        setForm((prev) => ({
            ...prev,
            [id]: { ...prev[id], checked: !prev[id].checked },
        }));
    };

    const handleChange = (id: string, field: keyof ItemState, value: string) => {
        setForm((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };

    const handleSubmit = () => {
        const selected = Object.values(form)
            .filter((f) => f.checked)
            .map(({ inventoryItemId, vendorName, vendorNote, unitId }) => ({
                inventoryItemId,
                vendorName: vendorName?.trim() || undefined,
                vendorNote: vendorNote?.trim() || undefined,
                unitId: unitId || null,
            }));
        onSave(selected);
    };

    const grouped = groupByCategory(inventoryItems);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>Edit Vendor Assignments</DialogTitle>
            <DialogContent dividers>
                {Object.entries(grouped).map(([category, items]) => (
                    <Accordion key={category} defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">{category}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                {items.map((item) => {
                                    const state = form[item.id];
                                    return (
                                        <Box key={item.id}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Checkbox
                                                    checked={state?.checked ?? false}
                                                    onChange={() => handleToggle(item.id)}
                                                />
                                                <Typography>{item.name}</Typography>
                                            </Stack>
                                            {state?.checked && (
                                                <Stack direction="row" spacing={2} mt={1} ml={4}>
                                                    <TextField
                                                        label="Vendor Name"
                                                        value={state.vendorName}
                                                        onChange={(e) =>
                                                            handleChange(item.id, 'vendorName', e.target.value)
                                                        }
                                                        size="small"
                                                    />
                                                    <TextField
                                                        label="Note"
                                                        value={state.vendorNote}
                                                        onChange={(e) =>
                                                            handleChange(item.id, 'vendorNote', e.target.value)
                                                        }
                                                        size="small"
                                                    />
                                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                                        <InputLabel>Unit</InputLabel>
                                                        <Select
                                                            value={state.unitId ?? ''}
                                                            label="Unit"
                                                            onChange={(e) =>
                                                                handleChange(item.id, 'unitId', e.target.value)
                                                            }
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {units.map((u) => (
                                                                <MenuItem key={u.id} value={u.id}>
                                                                    {u.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Save Assignments
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function groupByCategory(items: InventoryItem[]) {
    const result: Record<string, InventoryItem[]> = {};
    for (const item of items) {
        const category = item.category?.name || 'Uncategorized';
        if (!result[category]) result[category] = [];
        result[category].push(item);
    }
    return result;
}
