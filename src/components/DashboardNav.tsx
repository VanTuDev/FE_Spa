import { Link } from 'react-router-dom'
import tokenService from '../services/tokenService'

const DashboardNav = () => {
  const handleLogout = () => {
    tokenService.clearAuth()
    window.location.href = '/login'
  }

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary">SPA Service</h2>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <span className="mx-4">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <span className="mx-4">Hồ sơ</span>
            </Link>
          </li>
          <li>
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <span className="mx-4">Đăng xuất</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default DashboardNav 