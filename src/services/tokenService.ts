const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Interface cho thông tin người dùng
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  profilePicture?: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Service quản lý token
const tokenService = {
  // Lưu token vào localStorage
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Lấy token từ localStorage
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Xóa token khỏi localStorage
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Lưu thông tin user vào localStorage (dưới dạng JSON)
  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Lấy thông tin user từ localStorage
  getUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Failed to parse user data', error);
        return null;
      }
    }
    return null;
  },

  // Xóa thông tin user khỏi localStorage
  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // Xóa tất cả thông tin xác thực
  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Kiểm tra xem user đã đăng nhập chưa
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Lấy Authorization header
  getAuthHeader: (): { Authorization: string } | Record<string, never> => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export default tokenService; 