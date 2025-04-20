import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const apiKey = import.meta.env.VITE_DEFAULT_API_KEY
const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Styr om man är inloggad (true) eller inte (false)
  const [role, setRole] = useState(null) // Styr om man kan se bara projects (null) eller allt ('admin')
  
  const authData = {
    apiKey,
    adminApiKey,
    isAuthenticated,
    role
  }

  return (
    <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
  )
}