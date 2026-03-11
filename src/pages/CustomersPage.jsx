import { useState, useEffect } from 'react'
import api from '../services/api'
import CustomerList from '../components/customers/CustomerList'
import { useDebounce } from '../hooks/useDebounce'

const CustomersPage = () => {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const debouncedSearch = useDebounce(search, 500)

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/admin/customers', {
        params: { search: debouncedSearch, page, limit: 10 }
      })
      setCustomers(res.data.customers)
      setTotalPages(res.data.pages)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [debouncedSearch, page])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Customers</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CustomerList customers={customers} />

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

export default CustomersPage