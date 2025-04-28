import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import tokenService, { User as TokenUser } from './tokenService'

const API_URL = 'http://localhost:3000/api'

// Tạo instance Axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

// Thêm interceptor để tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor xử lý response
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Kiểm tra lỗi 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Xóa thông tin xác thực nếu token hết hạn hoặc không hợp lệ
      tokenService.clearAuth()
      
      // Chuyển hướng đến trang đăng nhập
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

// Interface định nghĩa dữ liệu User
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interface cho tin nhắn
export interface Message {
  id: string;
  content: string;
  sender: User;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

// Interface cho cuộc trò chuyện
export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  updatedAt: string;
  createdAt: string;
}

// Interface cho thông báo
export interface Notification {
  id: string;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface cho response API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Interface cho các tham số phân trang
export interface PaginationParams extends Record<string, unknown> {
  page?: number;
  limit?: number;
}

// Hàm helper để gọi API
export const apiClient = {
  // GET request
  get: async <T>(path: string, params?: Record<string, unknown>): Promise<T> => {
    try {
      const response = await api.get<ApiResponse<T>>(path, { params })
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch data')
      }
      return response.data.data as T
    } catch (error: unknown) {
      console.error(`GET ${path} error:`, error)
      throw error
    }
  },

  // POST request
  post: async <T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse = await api.post(url, data, config)
      // Trả về toàn bộ response data thay vì chỉ lấy data field
      return response.data as T
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`POST ${url} error: Status ${error.response.status}`, error.response.data)
        // Ném lỗi với message từ server
        const errorMessage = error.response.data?.error || error.response.data?.message || 'Đã có lỗi xảy ra'
        throw new Error(errorMessage)
      }
      throw error
    }
  },

  // PUT request
  put: async <T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await api.put(url, data, config)
      if (response.data.success) {
        return response.data.data as T
      }
      throw new Error(response.data.error || 'Lỗi không xác định')
    } catch (error: unknown) {
      console.error(`PUT ${url} error:`, error)
      throw error
    }
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await api.delete(url, config)
      if (response.data.success) {
        return response.data.data as T
      }
      throw new Error(response.data.error || 'Lỗi không xác định')
    } catch (error: unknown) {
      console.error(`DELETE ${url} error:`, error)
      throw error
    }
  },
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiClient.post<{
      success: boolean,
      token: string,
      data: {
        id: string,
        name: string,
        email: string,
        role: string
      }
    }>('/auth/login', { email, password })
  },
  
  register: async (userData: {
    name: string
    email: string
    password: string
    phoneNumber: string
  }) => {
    return apiClient.post<{ message: string }>('/auth/register', userData)
  },
  
  verifyOTP: async (email: string, otp: string) => {
    return apiClient.post<{ token: string; user: TokenUser }>('/auth/verify-otp', { email, otp })
  },
  
  resendOTP: async (email: string) => {
    return apiClient.post<{ message: string }>('/auth/resend-otp', { email })
  },
  
  forgotPassword: async (email: string) => {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email })
  },
  
  resetPassword: async (email: string, otp: string, newPassword: string) => {
    return apiClient.post<{ message: string }>('/auth/reset-password', { 
      email, 
      otp, 
      newPassword 
    })
  },
  
  logout: () => {
    tokenService.clearAuth()
  },
}

// User API
export const userAPI = {
  getProfile: async () => {
    return apiClient.get<User>('/users/profile')
  },
  
  updateProfile: async (userData: Partial<User>) => {
    return apiClient.put<User>('/users/profile', userData)
  },
  
  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiClient.put<{ message: string }>('/users/change-password', { currentPassword, newPassword })
  },
}

// Message API
export const messageAPI = {
  getMessages: async (conversationId: string, page = 1, limit = 20) => {
    return apiClient.get<Message[]>(`/messages/${conversationId}`, { 
      page, 
      limit 
    } as PaginationParams)
  },
  
  sendMessage: async (conversationId: string, content: string) => {
    return apiClient.post<Message>(`/messages/${conversationId}`, { content })
  },
  
  getConversations: async (page = 1, limit = 20) => {
    return apiClient.get<Conversation[]>('/conversations', { 
      page, 
      limit 
    } as PaginationParams)
  },
  
  createConversation: async (userId: string) => {
    return apiClient.post<Conversation>(`/conversations`, { userId })
  },
}

// Notification API
export const notificationAPI = {
  getNotifications: async (page = 1, limit = 20) => {
    return apiClient.get<Notification[]>('/notifications', { 
      page, 
      limit 
    } as PaginationParams)
  },
  
  markAsRead: async (notificationId: string) => {
    return apiClient.put<{ message: string }>(`/notifications/${notificationId}/read`)
  },
  
  markAllAsRead: async () => {
    return apiClient.put<{ message: string }>('/notifications/read-all')
  },
}

export default api 