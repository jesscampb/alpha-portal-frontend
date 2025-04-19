import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_DEFAULT_API_KEY
const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY

export const AuthProvider = ({ children }) => {
    const apiEndpoint = `${apiUrl}/projects`
    const defaultValues = { accessToken: null, role: "admin", isAuthenticated: true, loading: false }
    const [auth, setAuth] = useState(defaultValues)

    const fetchAuthData = async () => {
      setAuth({ ...defaultValues, loading: false })
    
        try {
          const res = await fetch(apiEndpoint, {
            headers: {
              "X-API-KEY": apiKey,
              "X-ADM-API-KEY": adminApiKey
            },
            method: "GET",

          })

          if (res.ok) {
            const data = await res.json();
            setAuth({ accessToken: data.accessToken, role: data.role, isAuthenticated: true, loading: false });
            console.log(data)
          }  

        } catch (error) {
          setAuth(defaultValues)
        }
    }
  
    useEffect(() => {
        fetchAuthData()
    }, [])

    return (
        <AuthContext.Provider value={{auth}}>
            {children}
        </AuthContext.Provider>
    )
}