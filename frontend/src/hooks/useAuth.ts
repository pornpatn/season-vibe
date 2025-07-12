import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return {
    accessToken,
    isLoggedIn: !!accessToken
  };
}
