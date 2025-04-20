import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const apiKey = import.meta.env.VITE_DEFAULT_API_KEY
const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [role, setRole] = useState('admin')
  const auth = {
    apiKey,
    adminApiKey,
    loading,
    setLoading,
    isAuthenticated,
    role
  }

  return (
    <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
  )
}