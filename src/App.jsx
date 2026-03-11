import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import PromosPage from './pages/PromosPage'
import OrdersPage from './pages/OrdersPage'
import TransactionsPage from './pages/TransactionsPage'
import CustomersPage from './pages/CustomersPage'
import UsersPage from './pages/UsersPage'
import SettingsPage from './pages/SettingsPage'
import NotificationsPage from './pages/NotificationsPage'
import ReportsPage from './pages/ReportsPage'
import AccountsPage from './pages/AccountsPage' // new
import ProtectedRoute from './components/common/ProtectedRoute'
import Layout from './components/common/Layout'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/promos" element={<PromosPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/accounts" element={<AccountsPage />} /> {/* new */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App