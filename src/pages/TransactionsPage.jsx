import { useState, useEffect } from 'react'
import api from '../services/api'
import TransactionList from '../components/transactions/TransactionList'
import TransactionForm from '../components/transactions/TransactionForm'
import { useDebounce } from '../hooks/useDebounce'

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const debouncedSearch = useDebounce(search, 500)

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/admin/transactions', {
        params: { search: debouncedSearch, page, limit: 10 }
      })
      setTransactions(res.data.transactions)
      setTotalPages(res.data.pages)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [debouncedSearch, page])

  const handleAddTransaction = async (transactionData) => {
    try {
      await api.post('/admin/transactions', transactionData)
      fetchTransactions()
      setShowForm(false)
    } catch (err) {
      alert('Failed to add transaction: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Transaction
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by M-Pesa receipt or order ID..."
          className="w-full px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <TransactionForm
          onSave={handleAddTransaction}
          onCancel={() => setShowForm(false)}
        />
      )}

      <TransactionList transactions={transactions} />

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

export default TransactionsPage