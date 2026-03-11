import { useState, useEffect } from 'react'
import api from '../../services/api'

const SalesReport = () => {
  const [data, setData] = useState([])
  const [groupBy, setGroupBy] = useState('day')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchReport = async () => {
    try {
      const res = await api.get('/admin/reports/sales', {
        params: { groupBy, startDate, endDate }
      })
      setData(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchReport()
  }, [groupBy])

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head><title>Sales Report</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
        </head>
        <body>
          <h1>Sales Report (${groupBy})</h1>
          <table>
            <thead>
              <tr><th>Period</th><th>Total Sales</th><th>Order Count</th></tr>
            </thead>
            <tbody>
              ${data.map(row => `<tr><td>${row._id}</td><td>KES ${row.totalSales}</td><td>${row.count}</td></tr>`).join('')}
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
      <div className="mb-4 flex gap-4">
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="border p-2 rounded">
          <option value="day">Daily</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded" />
        <button onClick={fetchReport} className="bg-indigo-600 text-white px-4 py-2 rounded">Apply</button>
        <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded">Print</button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Period</th>
            <th className="px-4 py-2 border">Total Sales</th>
            <th className="px-4 py-2 border">Order Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row._id}>
              <td className="px-4 py-2 border">{row._id}</td>
              <td className="px-4 py-2 border">KES {row.totalSales}</td>
              <td className="px-4 py-2 border">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesReport