import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Check if current route is dashboard
  const isDashboard = location.pathname === '/dashboard'

  // Dashboard: #0000FF with white text; other pages: grey with default text
  const bgColor = isDashboard ? '#0000FF' : '#f3f4f6'
  const textColor = isDashboard ? 'white' : 'inherit'

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main 
          className="flex-1 overflow-x-hidden overflow-y-auto p-4 transition-colors duration-200"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout