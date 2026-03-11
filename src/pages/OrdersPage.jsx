import { useState, useEffect } from 'react'
import api from '../services/api'
import OrderList from '../components/orders/OrderList'
import OrderDetails from '../components/orders/OrderDetails'
import { useDebounce } from '../hooks/useDebounce'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const debouncedSearch = useDebounce(search, 500)

  const fetchOrders = async () => {
    try {
      const res = await api.get('/admin/orders', {
        params: { search: debouncedSearch, status: statusFilter, page, limit: 10 }
      })
      setOrders(res.data.orders)
      setTotalPages(res.data.pages)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [debouncedSearch, statusFilter, page])

  const handleStatusChange = async (orderId, newStatus) => {
    await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus })
    fetchOrders()
    if (selectedOrder?._id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus })
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Orders</h1>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="flex-1 px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <OrderList
        orders={orders}
        onView={(order) => {
          setSelectedOrder(order)
          setShowDetails(true)
        }}
      />

      {showDetails && selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setShowDetails(false)}
          onStatusChange={handleStatusChange}
        />
      )}

      <div className="mt-4 flex justify-center space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default OrdersPage