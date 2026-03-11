const TransactionList = ({ transactions }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  }

  const handlePrint = (transaction) => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head><title>Transaction Receipt</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .receipt { border: 1px solid #ddd; padding: 20px; max-width: 400px; margin: 0 auto; }
          .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .label { font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
        </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h2>Transaction Receipt</h2>
              <p>ElectroStore</p>
            </div>
            <div class="row">
              <span class="label">Receipt No:</span>
              <span>${transaction.mpesaReceiptNumber || 'N/A'}</span>
            </div>
            <div class="row">
              <span class="label">Date:</span>
              <span>${new Date(transaction.createdAt).toLocaleString()}</span>
            </div>
            <div class="row">
              <span class="label">Order ID:</span>
              <span>${transaction.order?._id || 'N/A'}</span>
            </div>
            <div class="row">
              <span class="label">Customer:</span>
              <span>${transaction.user?.name || 'N/A'}</span>
            </div>
            <div class="row">
              <span class="label">Phone:</span>
              <span>${transaction.phoneNumber || 'N/A'}</span>
            </div>
            <div class="row">
              <span class="label">Amount:</span>
              <span>KES ${transaction.amount}</span>
            </div>
            <div class="row">
              <span class="label">Status:</span>
              <span>${transaction.status}</span>
            </div>
            <div class="footer">
              <p>Thank you for shopping with ElectroStore!</p>
            </div>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td className="px-6 py-4 whitespace-nowrap font-mono">{tx.mpesaReceiptNumber || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tx.order?._id?.slice(-8)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tx.user?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">KES {tx.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tx.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[tx.status]}`}>
                  {tx.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(tx.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handlePrint(tx)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Print Receipt"
                >
                  🖨️ Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList