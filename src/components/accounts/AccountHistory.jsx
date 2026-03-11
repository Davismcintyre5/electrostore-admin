const AccountHistory = ({ entries }) => {
  const typeColors = {
    income: 'bg-green-100 text-green-800',
    expense: 'bg-red-100 text-red-800',
    withdrawal: 'bg-yellow-100 text-yellow-800'
  };

  const typeLabels = {
    income: 'Income',
    expense: 'Expense',
    withdrawal: 'Withdrawal'
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-lg font-medium p-4 border-b">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Added By</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No transactions yet.
                </td>
              </tr>
            ) : (
              entries.map(entry => (
                <tr key={entry._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[entry.type]}`}>
                      {typeLabels[entry.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.reference || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">
                    {entry.type === 'income' ? '+' : '-'} KES {entry.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.createdBy?.name || 'System'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountHistory;