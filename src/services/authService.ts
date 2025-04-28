import { apiClient } from './api';
import tokenService, { User } from './tokenService';

// Interfaces
export interface RegisterData extends Record<string, unknown> {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface VerifyOtpData extends Record<string, unknown> {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
  user?: User;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

export interface LoginData extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Service xử lý đăng ký
const authService = {
  // Đăng ký tài khoản mới - Bước 1
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', data);
      return response;
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      throw error;
    }
  },

  // Xác thực OTP - Bước 2
  verifyOtp: async (data: VerifyOtpData): Promise<VerifyOtpResponse> => {
    try {
      const response = await apiClient.post<VerifyOtpResponse>('/auth/verify-otp', data);
      
      // Nếu xác thực thành công và có token, lưu vào localStorage
      if (response && response.token) {
        tokenService.setToken(response.token);
        if (response.user) {
          tokenService.setUser(response.user);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      throw error;
    }
  },

  // Gửi lại mã OTP
  resendOtp: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>('/auth/resend-otp', { email });
      return response;
    } catch (error) {
      console.error('Lỗi gửi lại OTP:', error);
      throw error;
    }
  },

  // Đăng nhập
  login: async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', data);
      
      if (response && response.token) {
        tokenService.setToken(response.token);
        tokenService.setUser(response.user);
      }
      
      return response;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      throw error;
    }
  },

  // Đăng xuất
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
      tokenService.clearAuth();
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      tokenService.clearAuth(); // Vẫn xóa token local ngay cả khi API lỗi
      throw error;
    }
  },

  // Kiểm tra trạng thái đăng nhập
  checkAuthStatus: async (): Promise<User | null> => {
    try {
      if (!tokenService.getToken()) {
        return null;
      }
      const response = await apiClient.get<User>('/auth/me');
      return response;
    } catch (error) {
      console.error('Lỗi kiểm tra trạng thái đăng nhập:', error);
      tokenService.clearAuth();
      return null;
    }
  }
};

export default authService; 