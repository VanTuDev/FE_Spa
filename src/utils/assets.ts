// Đường dẫn tĩnh cho các tài nguyên
export const ASSETS = {
  CAROUSEL: {
    IMAGE1: '/imgs/carosel1.png',
    IMAGE2: '/imgs/carosel2.png',
    IMAGE3: '/imgs/carosel3.png',
    IMAGE4: '/imgs/carosel4.png',
  },
  LOGO: {
    MAIN: '/logo/logoYumiSpa.png',
  },
  FLAGS: {
    VN: '/flags/vn.svg',
    EN: '/flags/us.svg',
    CN: '/flags/cn.svg',
    KR: '/flags/kr.svg',
  }
}

// Helper function để lấy đường dẫn tuyệt đối
export const getAssetPath = (path: string): string => {
  // Trong môi trường development
  if (import.meta.env?.DEV) {
    return path;
  }
  
  // Trong môi trường production, thêm base URL nếu cần
  const baseUrl = import.meta.env?.BASE_URL || '/';
  return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
} 