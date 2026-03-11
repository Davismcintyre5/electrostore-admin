import { useState, useEffect } from 'react'
import api from '../../services/api'

const TransactionForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    amount: '',
    phoneNumber: '',
    receiptNumber: '',
    notes: ''
  })
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch unpaid orders for selection
    const fetchOrders = async () => {
      try {
        const res = await api.get('/admin/orders?status=pending')
        setOrders(res.data.orders)
      } catch (err) {
        console.error('Failed to fetch orders', err)
      }
    }
    fetchOrders()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onSave(formData)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Manual Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Order</label>
            <select
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Order</option>
              {orders.map(order => (
                <option key={order._id} value={order._id}>
                  {order._id.slice(-8)} - KES {order.totalAmount} - {order.user?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Receipt Number</label>
            <input
              name="receiptNumber"
              value={formData.receiptNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Optional - auto-generated if empty"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm