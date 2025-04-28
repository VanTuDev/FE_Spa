import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-bold mt-4 mb-2">Trang không tồn tại</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link 
        to="/" 
        className="bg-primary text-white hover:bg-primary-dark px-6 py-2 rounded-md transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  )
}

export default NotFound 