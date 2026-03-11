import api from './api';

export const getBalance = () => api.get('/admin/accounts/balance');
export const getEntries = (params) => api.get('/admin/accounts', { params });
export const addExpense = (data) => api.post('/admin/accounts/expense', data);
export const addWithdrawal = (data) => api.post('/admin/accounts/withdrawal', data);
export const addIncome = (data) => api.post('/admin/accounts/income', data);