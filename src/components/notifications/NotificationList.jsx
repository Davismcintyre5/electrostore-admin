const NotificationList = ({ notifications, onMarkRead }) => {
  const unreadIds = notifications.filter(n => !n.isRead).map(n => n._id)

  return (
    <div>
      {unreadIds.length > 0 && (
        <button
          onClick={() => onMarkRead(unreadIds)}
          className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Mark all as read
        </button>
      )}
      <div className="space-y-2">
        {notifications.map(notification => (
          <div
            key={notification._id}
            className={`p-4 border rounded ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{notification.title}</h3>
              <span className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-gray-700">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationList