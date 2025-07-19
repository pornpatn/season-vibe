import React from 'react'
import { Box, Typography, IconButton, Chip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
// import ExtensionIcon from '@mui/icons-material/Extension'
import type { InventoryItem } from '../../types/inventory'

interface Props {
    item: InventoryItem
    onClick: () => void
    onEdit: () => void
}

const InventoryItemRow: React.FC<Props> = ({
    item,
    onClick,
    onEdit,
}) => {
    return (
        <Box
            onClick={onClick}
            display="flex"
            flexDirection="column"
            p={1}
            borderBottom="1px solid #eee"
            bgcolor={item.isActive ? 'background.paper' : 'grey.100'}
            sx={{ cursor: 'pointer' }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    {/* {hasPrepForms && <ExtensionIcon fontSize="small" color="action" />} */}
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                        label={item.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={item.isActive ? 'success' : 'default'}
                    />
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            </Box>
            {item.alternateNames && (
                <Typography variant="body2" color="textSecondary">
                    {item.alternateNames}
                </Typography>
            )}
            {(item.inventoryPrepForms.length > 0) && (
                <Typography variant="body2" color="textSecondary">
                    Prep: {item.inventoryPrepForms.map(pf => pf.name).join(', ')}
                </Typography>
            )}
        </Box>
    )
}

export default InventoryItemRow
