// Format currency
export const formatCurrency = (amount) => {
  return `KES ${amount.toLocaleString()}`
}

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Truncate string
export const truncate = (str, length) => {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}