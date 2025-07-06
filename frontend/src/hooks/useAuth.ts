import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return {
    accessToken,
    isLoggedIn: !!accessToken
  };
}
