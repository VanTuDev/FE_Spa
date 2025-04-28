import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          <Link to="/">SPA Service</Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Trang chủ</Link>
          <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">Đăng nhập</Link>
          <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">Đăng ký</Link>
        </div>
      </div>
    </nav>
  )
}

export default Header 