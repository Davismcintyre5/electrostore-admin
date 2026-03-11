import { useState, useEffect } from 'react'
import api from '../../services/api'

const TopProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('/admin/reports/top-products').then(res => setProducts(res.data))
  }, [])

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head><title>Top Products</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
        </head>
        <body>
          <h1>Top 10 Products by Sales</h1>
          <table>
            <thead>
              <tr><th>Product</th><th>Total Sold</th></tr>
            </thead>
            <tbody>
              ${products.map(p => `<tr><td>${p.product.name}</td><td>${p.totalSold}</td></tr>`).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div>
      <button onClick={handlePrint} className="mb-4 bg-green-600 text-white px-4 py-2 rounded">Print</button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Product</th>
            <th className="px-4 py-2 border">Total Sold</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td className="px-4 py-2 border">{p.product?.name}</td>
              <td className="px-4 py-2 border">{p.totalSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TopProducts