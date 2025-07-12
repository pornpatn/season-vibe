import { create } from 'zustand'

type Role = 'owner' | 'admin' | 'manager' | 'staff'

export interface User {
  id: string
  name: string
  role: Role
  email?: string
  isTemporaryPassword?: boolean
}

interface AuthState {
  user: User | null
  accessToken: string | null
  login: (user: User, token: string) => void
  logout: () => void
  setUser: (user: User) => void
  setAccessToken: (token: string) => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  accessToken: null,

  login: (user, token) => {
    set({ user, accessToken: token })
  },

  logout: () => {
    set({ user: null, accessToken: null })
  },

  setUser: (user) => set({ user }),

  setAccessToken: (token) => {
    set({ accessToken: token })
  },
}))
