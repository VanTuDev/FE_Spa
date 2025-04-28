import { Outlet } from 'react-router-dom'
import DashboardNav from '../components/DashboardNav'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav />

      {/* Main content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout 