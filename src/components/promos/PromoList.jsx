const PromoList = ({ promos = [], onEdit, onDelete }) => {
  if (!promos || promos.length === 0) {
    return <p className="text-gray-500 text-center py-8">No promos found.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {promos.map(promo => (
            <tr key={promo._id}>
              <td className="px-6 py-4 whitespace-nowrap font-mono">{promo.code}</td>
              <td className="px-6 py-4 whitespace-nowrap">{promo.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `KES ${promo.discountValue}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(promo.validUntil).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button onClick={() => onEdit(promo)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => onDelete(promo._id)} className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PromoList