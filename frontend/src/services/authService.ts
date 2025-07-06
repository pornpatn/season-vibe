import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_BASE = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true
});

export async function login(username: string, password: string) {
  const res = await api.post('/auth/signin', { username, password });
  console.log(res.data);
  useAuthStore.getState().setToken(res.data.accessToken);
}

export async function refreshAccessToken() {
  const res = await api.post('/auth/refresh');
  useAuthStore.getState().setToken(res.data.accessToken);
}

export function logout() {
  useAuthStore.getState().setToken(null);
}

export { api };

