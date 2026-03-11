import { useState } from 'react'
import api from '../../services/api'

const OrderDetails = ({ order, onClose, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(order.orderStatus)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentData, setPaymentData] = useState({
    phoneNumber: '',
    receiptNumber: ''
  })

  const handleStatusUpdate = () => {
    onStatusChange(order._id, newStatus)
  }

  const handleConfirmPayment = async () => {
    try {
      const res = await api.post(`/admin/orders/${order._id}/confirm-payment`, paymentData)
      alert('Payment confirmed and order status updated')
      onStatusChange(order._id, 'confirmed')
      setShowPaymentForm(false)
      // Refresh order details
      window.location.reload()
    } catch (err) {
      alert('Failed to confirm payment: ' + (err.response?.data?.message || err.message))
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head><title>Order #${order._id}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .header { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
        </head>
        <body>
          <div class="header">
            <h1>Order Invoice</h1>
            <p>Order ID: ${order._id}</p>
            <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>
            <p>Customer: ${order.user?.name} (${order.user?.email})</p>
            <p>Status: ${order.orderStatus}</p>
            <p>Payment Status: ${order.paymentStatus}</p>
          </div>
          <h2>Items</h2>
          <table>
            <thead>
              <tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.product?.name || 'N/A'}</td>
                  <td>${item.quantity}</td>
                  <td>KES ${item.price}</td>
                  <td>KES ${item.price * item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <h3>Total Amount: KES ${order.totalAmount}</h3>
          <h3>Shipping Address</h3>
          <p>${order.shippingAddress?.addressLine1}, ${order.shippingAddress?.city}, ${order.shippingAddress?.country}</p>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Customer:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Phone:</strong> {order.user?.phone}</p>
          </div>
          <div>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Order Status:</strong> {order.orderStatus}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}</p>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Items</h3>
        <table className="min-w-full mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2">{item.product?.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">KES {item.price}</td>
                <td className="px-4 py-2">KES {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-4">
          <p className="text-xl font-bold">Total: KES {order.totalAmount}</p>
        </div>

        <div className="border-t pt-4 space-y-4">
          {/* Payment Confirmation Section - Show only if not paid */}
          {order.paymentStatus !== 'paid' && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Confirm Payment</h3>
              {!showPaymentForm ? (
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Confirm Payment
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={paymentData.phoneNumber}
                    onChange={(e) => setPaymentData({...paymentData, phoneNumber: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Receipt Number (optional)"
                    value={paymentData.receiptNumber}
                    onChange={(e) => setPaymentData({...paymentData, receiptNumber: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleConfirmPayment}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Confirm & Update
                    </button>
                    <button
                      onClick={() => setShowPaymentForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Status Update Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label htmlFor="status" className="font-medium">Update Status:</label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              >
                Update
              </button>
            </div>
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails