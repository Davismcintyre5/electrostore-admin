import { useAuth } from '../../hooks/useAuth'
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline' // ✅ Use Bars3Icon

const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          className="lg:hidden text-gray-500 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" /> {/* ✅ Changed from MenuIcon to Bars3Icon */}
        </button>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="text-sm">
            <span className="text-gray-700">{user?.name}</span>
            <button onClick={logout} className="ml-2 text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header