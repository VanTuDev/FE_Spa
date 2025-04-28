import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Chào mừng đến với Dịch vụ Spa
      </h1>
      
      <p className="text-center text-gray-600 mb-8">
        Trải nghiệm dịch vụ chăm sóc sức khỏe và làm đẹp cao cấp
      </p>
      
      <div className="flex justify-center">
        <Link
          to="/register"
          className="bg-primary text-white px-6 py-2 rounded-md"
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  )
}

export default Home