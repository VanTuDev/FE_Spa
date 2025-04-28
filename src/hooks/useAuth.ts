import { useState } from 'react';
import authService, { 
  RegisterData, 
  VerifyOtpData
} from '../services/authService';

interface ApiError {
  message: string;
  [key: string]: unknown;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  // Xóa thông báo
  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  // Đăng ký người dùng
  const register = async (data: RegisterData): Promise<boolean> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const response = await authService.register(data);
      setSuccessMessage(response.message || 'Đăng ký thành công. Vui lòng kiểm tra email để lấy mã OTP.');
      setRegisteredEmail(response.email);
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      setIsLoading(false);
      return false;
    }
  };

  // Xác thực OTP
  const verifyOtp = async (data: VerifyOtpData): Promise<boolean> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      await authService.verifyOtp(data);
      setSuccessMessage('Xác thực OTP thành công.');
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Xác thực OTP thất bại. Vui lòng thử lại.');
      setIsLoading(false);
      return false;
    }
  };

  // Gửi lại OTP
  const resendOtp = async (email: string): Promise<boolean> => {
    clearMessages();
    setIsLoading(true);
    
    try {
      const response = await authService.resendOtp(email);
      setSuccessMessage(response.message || 'Mã OTP mới đã được gửi đến email của bạn.');
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Không thể gửi lại OTP. Vui lòng thử lại.');
      setIsLoading(false);
      return false;
    }
  };

  return {
    isLoading,
    error,
    successMessage,
    registeredEmail,
    register,
    verifyOtp,
    resendOtp,
    clearMessages
  };
}; 