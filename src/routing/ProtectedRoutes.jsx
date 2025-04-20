import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../partials/components/LoadingSpinner';


export const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return <LoadingSpinner />
  return isAuthenticated ? children : <Navigate to="/auth/signin" replace />
};

export const AdminRoute = ({ children }) => {
  const { loading, isAuthenticated, role } = useAuth()
  
  if (loading) return <LoadingSpinner />
  return isAuthenticated && role === 'admin' ? children : <Navigate to="/admin/projects" replace />
};