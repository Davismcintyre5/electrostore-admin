import { useEffect, useState } from 'react'
import api from '../services/api'
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  ClockIcon, 
  ExclamationTriangleIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline'

const DashboardPage = () => {
  const [stats, setStats] = useState({
    ordersToday: 0,
    revenueToday: 0,
    pendingOrders: 0,
    lowStock: 0,
    totalCustomers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard/stats')
        setStats(res.data)
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { title: 'Orders Today', value: stats.ordersToday, icon: ShoppingCartIcon, bg: 'bg-blue-500' },
    { title: 'Revenue Today', value: `KES ${stats.revenueToday.toLocaleString()}`, icon: CurrencyDollarIcon, bg: 'bg-green-500' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: ClockIcon, bg: 'bg-yellow-500' },
    { title: 'Low Stock Items', value: stats.lowStock, icon: ExclamationTriangleIcon, bg: 'bg-red-500' },
    { title: 'Total Customers', value: stats.totalCustomers, icon: UserGroupIcon, bg: 'bg-purple-500' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${card.bg}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{card.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-900">
                  View details →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage