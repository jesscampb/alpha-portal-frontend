import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const apiKey = import.meta.env.VITE_DEFAULT_API_KEY
const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const authKeys = {
    apiKey: apiKey,
    adminApiKey: adminApiKey
  }

  return (
    <AuthContext.Provider value={{authKeys, loading, setLoading}}>
        {children}
    </AuthContext.Provider>
  )
}