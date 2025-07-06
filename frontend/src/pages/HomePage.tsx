// src/pages/HomePage.tsx
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Typography } from '@mui/material'

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Welcome to Season Vibe
      </Typography>
      <Typography>
        This is your home dashboard. Add widgets or content here.
      </Typography>
    </MainLayout>
  )
}

export default HomePage
