import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import MainLayout from '../layouts/MainLayout';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h4">Welcome to Season-Vibe!</Typography>
          <Typography variant="body1">
            Manage your restaurant's inventory, checklists, and vendor orders in one place.
          </Typography>
        </Stack>
      </Box>
    </MainLayout>
  )
}

export default HomePage
