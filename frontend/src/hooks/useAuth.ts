import { useEffect } from 'react'
import { refreshToken } from '../services/authService'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await refreshToken()
        const { accessToken, user } = res.data
        setAuth(accessToken, user)
      } catch (err) {
        // Clear store if refresh fails
        clearAuth()
      }
    }

    initAuth()
  }, [])
}
