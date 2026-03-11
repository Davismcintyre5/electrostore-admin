import { useState } from 'react'
import SalesReport from '../components/reports/SalesReport'
import TopProducts from '../components/reports/TopProducts'

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('sales')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Reports</h1>

      <div className="border-b mb-4">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('sales')}
            className={`pb-2 px-1 ${activeTab === 'sales' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
          >
            Sales Report
          </button>
          <button
            onClick={() => setActiveTab('top')}
            className={`pb-2 px-1 ${activeTab === 'top' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
          >
            Top Products
          </button>
        </nav>
      </div>

      {activeTab === 'sales' && <SalesReport />}
      {activeTab === 'top' && <TopProducts />}
    </div>
  )
}

export default ReportsPage