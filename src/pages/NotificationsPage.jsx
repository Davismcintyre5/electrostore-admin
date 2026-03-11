import { useState, useEffect } from 'react'
import api from '../services/api'
import NotificationList from '../components/notifications/NotificationList'

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications')
      setNotifications(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const markAsRead = async (ids) => {
    await api.patch('/notifications/mark-read', { ids })
    fetchNotifications()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Notifications</h1>
      <NotificationList notifications={notifications} onMarkRead={markAsRead} />
    </div>
  )
}

export default NotificationsPage