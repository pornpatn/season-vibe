import { create } from 'zustand'
import type { User } from '../types/User';
// import type { Permission } from '../types/Permission';

interface AuthState {
  accessToken: string | null
  user: User | null
  isLoading: boolean
  setAuth: (accessToken: string, user: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  permissions: [],
  isLoading: true,
  setAuth: (token, user) =>
    set({ accessToken: token, user, isLoading: false }),
  clearAuth: () =>
    set({ accessToken: null, user: null, isLoading: false }),
}))
