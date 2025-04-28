import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../services/api'
import tokenService from '../../services/tokenService'
import axios from 'axios'

interface LoginForm {
  email: string
  password: string
}

// interface LoginResponse {
//   token: string
//   user: {
//     id: string
//     name: string
//     email: string
//     role: string
//   }
// }

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { email, password } = formData
      const response = await authAPI.login(email, password)
      console.log('Login response:', response) // Log để debug
      
      if (response.success && response.token) {
        // Lưu token
        tokenService.setToken(response.token)
        // Lưu thông tin user
        tokenService.setUser(response.data)
        
        // Log để kiểm tra
        console.log('Token đã được lưu:', tokenService.getToken())
        console.log('User đã được lưu:', tokenService.getUser())
        
        // Chuyển hướng sau khi lưu thành công
        navigate('/dashboard')
      } else {
        setError('Thông tin đăng nhập không chính xác')
      }
    } catch (error) {
      console.error('Login error:', error) // Log để debug
      
      if (axios.isAxiosError(error)) {
        // Xử lý lỗi từ API
        const message = error.response?.data?.error || error.response?.data?.message
        setError(message || 'Lỗi kết nối đến server')
      } else {
        setError('Đã có lỗi xảy ra khi đăng nhập')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login