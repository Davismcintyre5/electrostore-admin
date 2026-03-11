import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import { login as apiLogin } from '../services/auth'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

const ALLOWED_ROLES = ['admin', 'manager', 'cashier']

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me')
        const userData = res.data
        if (!ALLOWED_ROLES.includes(userData.role)) {
          throw new Error('Unauthorized role')
        }
        setUser(userData)
      } catch (err) {
        console.error('Failed to fetch user', err)
        logout()
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email, password) => {
    const res = await apiLogin(email, password)
    const { token, user, requiresPasswordChange } = res.data

    // Check role
    if (!ALLOWED_ROLES.includes(user.role)) {
      throw new Error('You are not authorized to access the admin panel')
    }

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