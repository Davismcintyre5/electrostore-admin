import { useState } from 'react'
import api from '../../services/api'

const PromoForm = ({ promo, onSave, onCancel }) => {
  const [formData, setFormData] = useState(promo || {
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    validFrom: '',
    validUntil: '',
    usageLimit: '',
    isActive: true
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Convert empty strings to undefined to avoid validation errors
      const data = {
        ...formData,
        discountValue: formData.discountValue ? parseFloat(formData.discountValue) : undefined,
        minOrderAmount: formData.minOrderAmount ? parseFloat(formData.minOrderAmount) : undefined,
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
        validFrom: formData.validFrom ? new Date(formData.validFrom) : undefined,
        validUntil: formData.validUntil ? new Date(formData.validUntil) : undefined,
      }
      await onSave(data)
    } catch (err) {
      console.error('Failed to save promo:', err)
      alert('Error saving promo. Check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-xl mb-4">{promo ? 'Edit' : 'Add'} Promo</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="code"
            placeholder="Promo Code"
            value={formData.code}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            rows="2"
          />
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
          <input
            name="discountValue"
            type="number"
            step="0.01"
            placeholder="Discount Value"
            value={formData.discountValue}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            name="minOrderAmount"
            type="number"
            step="0.01"
            placeholder="Minimum Order Amount (optional)"
            value={formData.minOrderAmount}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="validFrom"
            type="datetime-local"
            placeholder="Valid From"
            value={formData.validFrom}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="validUntil"
            type="datetime-local"
            placeholder="Valid Until"
            value={formData.validUntil}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="usageLimit"
            type="number"
            placeholder="Usage Limit (optional)"
            value={formData.usageLimit}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <label className="flex items-center mb-4">
            <input
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            Active
          </label>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PromoForm