// src/components/AppInitializer.tsx
import { useEffect, useState } from 'react'
import { refreshToken, getCurrentUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useAuthStore } from '../stores/authStore'

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      try {
        const { accessToken, setAccessToken, setUser } = useAuthStore.getState();
        if (!accessToken) {
        const token = await refreshToken()
        const user = await getCurrentUser()
        setAccessToken(token);
        setUser(user);
        }
      } catch {
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [navigate])

  if (loading) {    
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <div>Loading...</div>
        </Box>
    )
  }

  return <>{children}</>
}

export default AppInitializer
