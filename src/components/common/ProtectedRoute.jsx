import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ALLOWED_ROLES = ['admin', 'manager', 'cashier']

const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  // Check if user exists and has allowed role
  if (!user || !ALLOWED_ROLES.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute