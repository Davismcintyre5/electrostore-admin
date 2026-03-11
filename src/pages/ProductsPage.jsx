import { useState, useEffect } from 'react'
import api from '../services/api'
import ProductList from '../components/products/ProductList'
import ProductForm from '../components/products/ProductForm'
import { useDebounce } from '../hooks/useDebounce'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const debouncedSearch = useDebounce(search, 500)

  const fetchProducts = async () => {
    try {
      const res = await api.get('/admin/products', {
        params: { search: debouncedSearch, page, limit: 10 }
      })
      setProducts(res.data.products)
      setTotalPages(res.data.pages)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [debouncedSearch, page])

  const handleSave = async (productData) => {
    const formData = new FormData()
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        productData.images.forEach(file => formData.append('images', file))
      } else {
        formData.append(key, productData[key])
      }
    })

    if (editingProduct) {
      await api.put(`/admin/products/${editingProduct._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } else {
      await api.post('/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    fetchProducts()
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/admin/products/${id}`)
      fetchProducts()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Product
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}

      <ProductList
        products={products}
        onEdit={(product) => {
          setEditingProduct(product)
          setShowForm(true)
        }}
        onDelete={handleDelete}
      />

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

export default ProductsPage