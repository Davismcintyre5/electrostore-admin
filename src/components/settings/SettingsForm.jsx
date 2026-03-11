import { useState } from 'react'

const SettingsForm = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
        <input
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
        <input
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
        <input
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <input
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">VAT Rate (%)</label>
        <input
          name="vatRate"
          type="number"
          step="0.1"
          value={formData.vatRate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Save Settings
      </button>
    </form>
  )
}

export default SettingsForm