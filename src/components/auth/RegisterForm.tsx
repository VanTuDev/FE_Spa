import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, verifyOtp, resendOtp, isLoading, error, successMessage, registeredEmail } = useAuth();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<RegisterFormData>();
  
  const password = watch('password');
  
  // Xử lý đăng ký
  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    
    const success = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password
    });
    
    if (success) {
      setShowOtpForm(true);
    }
  };
  
  // Xử lý xác thực OTP
  const handleVerifyOtp = async () => {
    if (!registeredEmail) return;
    
    const success = await verifyOtp({
      email: registeredEmail,
      otp
    });
    
    if (success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };
  
  // Xử lý gửi lại OTP
  const handleResendOtp = async () => {
    if (!registeredEmail) return;
    await resendOtp(registeredEmail);
  };
  
  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">Đăng ký tài khoản</h2>
      
      {/* Hiển thị thông báo lỗi hoặc thành công */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      {!showOtpForm ? (
        /* Form đăng ký */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block mb-1 font-medium">
              Họ và tên
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Nhập họ và tên"
              {...register('name', { 
                required: 'Họ và tên là bắt buộc',
                minLength: {
                  value: 2,
                  message: 'Họ tên phải có ít nhất 2 ký tự'
                }
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Nhập địa chỉ email"
              {...register('email', { 
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Địa chỉ email không hợp lệ'
                }
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="block mb-1 font-medium">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Nhập mật khẩu"
              {...register('password', { 
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự'
                }
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Nhập lại mật khẩu"
              {...register('confirmPassword', { 
                required: 'Xác nhận mật khẩu là bắt buộc',
                validate: value => value === password || 'Mật khẩu không khớp'
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
            )}
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
          
          <div className="text-center mt-4">
            <p>
              Đã có tài khoản?{' '}
              <a href="/login" className="text-primary hover:underline">
                Đăng nhập
              </a>
            </p>
          </div>
        </form>
      ) : (
        /* Form xác thực OTP */
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Chúng tôi đã gửi mã OTP đến email của bạn. Vui lòng kiểm tra và nhập mã để hoàn tất đăng ký.
          </p>
          
          <div className="form-group">
            <label htmlFor="otp" className="block mb-1 font-medium">
              Mã OTP
            </label>
            <input
              id="otp"
              type="text"
              className="form-input"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>
          
          <button
            onClick={handleVerifyOtp}
            className="btn btn-primary w-full"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Đang xử lý...' : 'Xác thực'}
          </button>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-primary hover:underline"
              disabled={isLoading}
            >
              Gửi lại mã OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm; 