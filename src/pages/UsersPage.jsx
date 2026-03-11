import { useState, useEffect } from 'react'
import api from '../services/api'
import UserList from '../components/users/UserList'
import UserForm from '../components/users/UserForm'
import { useDebounce } from '../hooks/useDebounce'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users', {
        params: { search: debouncedSearch }
      })
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [debouncedSearch])

  const handleSave = async (userData) => {
    if (editingUser) {
      await api.put(`/admin/users/${editingUser._id}`, userData)
    } else {
      await api.post('/admin/users', userData)
    }
    fetchUsers()
    setShowForm(false)
    setEditingUser(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/admin/users/${id}`)
      fetchUsers()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Staff Users</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add User
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingUser(null)
          }}
        />
      )}

      <UserList
        users={users}
        onEdit={(user) => {
          setEditingUser(user)
          setShowForm(true)
        }}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default UsersPage