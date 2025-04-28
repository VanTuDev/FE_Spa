import { apiClient } from './api';
import tokenService from './tokenService';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

const authService = {
  // Đăng nhập
  login: async (email: string, password: string) => {
    const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
    if (response.token) {
      tokenService.setToken(response.token);
      tokenService.setUser(response.user);
    }
    return response;
  },
  
  // Đăng ký
  register: async (userData: RegisterData) => {
    return apiClient.post<{ message: string }>('/auth/register', userData);
  },
  
  // Xác thực OTP
  verifyOTP: async (email: string, otp: string) => {
    const response = await apiClient.post<LoginResponse>('/auth/verify-otp', { email, otp });
    if (response.token) {
      tokenService.setToken(response.token);
      tokenService.setUser(response.user);
    }
    return response;
  },
  
  // Gửi lại OTP
  resendOTP: async (email: string) => {
    return apiClient.post<{ message: string }>('/auth/resend-otp', { email });
  },
  
  // Quên mật khẩu
  forgotPassword: async (email: string) => {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  },
  
  // Đặt lại mật khẩu
  resetPassword: async (email: string, otp: string, newPassword: string) => {
    return apiClient.post<{ message: string }>('/auth/reset-password', { 
      email, 
      otp, 
      newPassword 
    });
  },
  
  // Đổi mật khẩu
  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiClient.put<{ message: string }>('/users/change-password', { 
      currentPassword, 
      newPassword 
    });
  },
  
  // Đăng xuất
  logout: () => {
    tokenService.clearAuth();
  },
  
  // Kiểm tra đã đăng nhập chưa
  isAuthenticated: () => {
    return !!tokenService.getToken();
  },
  
  // Lấy thông tin người dùng hiện tại
  getCurrentUser: () => {
    return tokenService.getUser();
  }
};

export default authService; 