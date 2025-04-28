const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-gray-600 mb-4">
            &copy; {new Date().getFullYear()} SPA Service. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex space-x-6">
            <a href="/terms" className="text-gray-600 hover:text-primary transition-colors">
              Điều khoản dịch vụ
            </a>
            <a href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
              Chính sách bảo mật
            </a>
            <a href="/contact" className="text-gray-600 hover:text-primary transition-colors">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 