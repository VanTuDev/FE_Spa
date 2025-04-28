import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [otp, setOtp] = useState('')
  const [showOtpForm, setShowOtpForm] = useState(false)
  
  const navigate = useNavigate()
  const { register, verifyOtp, resendOtp, isLoading, error, successMessage, registeredEmail, clearMessages } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearMessages()

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      return
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })

    if (success) {
      setShowOtpForm(true)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!registeredEmail) return

    const success = await verifyOtp({
      email: registeredEmail,
      otp
    })

    if (success) {
      // Hiển thị thông báo thành công
      setTimeout(() => {
        // Chuyển hướng về trang chủ sau khi xác thực thành công
        navigate('/')
      }, 2000)
    }
  }

  const handleResendOtp = async () => {
    if (!registeredEmail) return
    await resendOtp(registeredEmail)
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          {showOtpForm ? 'Xác thực OTP' : 'Đăng ký tài khoản'}
        </h2>
        
        {error && (
          <div className="bg-red-100 text-error px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-100 text-success px-4 py-3 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        
        {!showOtpForm ? (
          // Form đăng ký
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                minLength={2}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                minLength={6}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                minLength={6}
              />
              {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                <p className="text-error text-sm mt-1">Mật khẩu xác nhận không khớp</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>
        ) : (
          // Form xác thực OTP
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">
                Nhập mã OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                placeholder="Nhập mã 6 chữ số"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                Mã OTP đã được gửi đến email của bạn
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Xác thực'}
              </button>
              
              <button 
                type="button"
                onClick={handleResendOtp}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Gửi lại OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Register 