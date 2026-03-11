import { useState, useEffect } from 'react';
import { getBalance, getEntries } from '../services/account';
import AccountBalance from '../components/accounts/AccountBalance';
import AccountHistory from '../components/accounts/AccountHistory';
import AddTransactionForm from '../components/accounts/AddTransactionForm';

const AccountsPage = () => {
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [balanceRes, entriesRes] = await Promise.all([
        getBalance(),
        getEntries({ limit: 50 })
      ]);
      setBalance(balanceRes.data.balance);
      setEntries(entriesRes.data.entries);
    } catch (err) {
      console.error('Failed to fetch account data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransactionAdded = () => {
    fetchData();
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Transaction
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <AccountBalance balance={balance} />
          <AccountHistory entries={entries} />
        </>
      )}

      {showForm && (
        <AddTransactionForm
          onSuccess={handleTransactionAdded}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AccountsPage;