import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Khởi tạo kết nối Socket sau khi người dùng đăng nhập
// import { socketService } from './services/socketService.ts'

// Kiểm tra nếu người dùng đã đăng nhập thì kết nối socket
// const isAuthenticated = tokenService.isAuthenticated()
// if (isAuthenticated) {
//   socketService.connect()
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
