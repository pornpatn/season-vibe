// src/components/AppInitializer.tsx
import { useEffect, useState } from 'react'
import { refreshToken } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      try {
        await refreshToken()
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
