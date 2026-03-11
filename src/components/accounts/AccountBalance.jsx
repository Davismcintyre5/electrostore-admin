const AccountBalance = ({ balance }) => {
  const isPositive = balance >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-2">Current Balance</h2>
      <div className={`text-4xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        KES {balance.toLocaleString()}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {isPositive ? 'Positive balance' : 'Negative balance'}
      </p>
    </div>
  );
};

export default AccountBalance;