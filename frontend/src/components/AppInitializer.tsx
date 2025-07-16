// src/components/AppInitializer.tsx
import { Box } from '@mui/material'
import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../stores/authStore'

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useAuthStore((s) => s.isLoading)
  useAuth()

  if (isLoading) {    
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <div>Loading...</div>
        </Box>
    )
  }

  return <>{children}</>
}

export default AppInitializer
