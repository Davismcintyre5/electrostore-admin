import { useState } from 'react'

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: []
  })
  const [imageFiles, setImageFiles] = useState([])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...formData, images: imageFiles })
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-xl mb-4">{product ? 'Edit' : 'Add'} Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
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
            rows="3"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-4 p-2 border rounded"
          />
          {product?.images?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">Existing images:</p>
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <img key={idx} src={img} alt="product" className="h-12 w-12 object-cover rounded" />
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm