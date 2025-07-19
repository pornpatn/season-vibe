import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore()

  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default ProtectedRoute
