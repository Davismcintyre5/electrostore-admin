import { useState, useEffect } from 'react'
import api from '../services/api'
import PromoList from '../components/promos/PromoList'
import PromoForm from '../components/promos/PromoForm'
import { useDebounce } from '../hooks/useDebounce'

const PromosPage = () => {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPromo, setEditingPromo] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const debouncedSearch = useDebounce(search, 500)

  const fetchPromos = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/promos', {
        params: { search: debouncedSearch, page, limit: 10 }
      })
      setPromos(res.data.promos || [])
      setTotalPages(res.data.pages || 1)
    } catch (err) {
      console.error('Failed to fetch promos', err)
      alert('Error loading promos. Check console.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPromos()
  }, [debouncedSearch, page])

  const handleSave = async (promoData) => {
    try {
      if (editingPromo) {
        await api.put(`/admin/promos/${editingPromo._id}`, promoData)
      } else {
        await api.post('/admin/promos', promoData)
      }
      fetchPromos()
      setShowForm(false)
      setEditingPromo(null)
    } catch (err) {
      console.error('Failed to save promo', err.response?.data || err.message)
      alert('Failed to save promo. See console.')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/admin/promos/${id}`)
        fetchPromos()
      } catch (err) {
        console.error('Failed to delete promo', err)
        alert('Delete failed.')
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Promotions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Promo
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search promos..."
          className="w-full px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <PromoForm
          promo={editingPromo}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingPromo(null)
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <PromoList
          promos={promos}
          onEdit={(promo) => {
            setEditingPromo(promo)
            setShowForm(true)
          }}
          onDelete={handleDelete}
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

export default PromosPage