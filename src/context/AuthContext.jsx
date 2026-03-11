import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import { login as apiLogin } from '../services/auth'

// Export AuthContext so it can be imported in useAuth.js
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await apiLogin(email, password)
    const { token, user, requiresPasswordChange } = res.data
    localStorage.setItem('token', token)
    api.defaults.headers.Authorization = `Bearer ${token}`
    setUser(user)
    return { requiresPasswordChange }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.Authorization
    setUser(null)
  }

  const value = { user, login, logout, loading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}