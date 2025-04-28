import { io, Socket } from 'socket.io-client'

// Định nghĩa kiểu cho callback
type SocketCallback = (...args: unknown[]) => void;

class SocketService {
  private socket: Socket | null = null
  private listeners: { [event: string]: SocketCallback[] } = {}

  // Kết nối đến server socket
  connect() {
    if (this.socket) return

    const token = localStorage.getItem('token')
    
    if (!token) {
      console.error('Không thể kết nối socket: Token không tồn tại')
      return
    }

    this.socket = io('http://localhost:5000', {
      auth: {
        token
      },
      transports: ['websocket']
    })

    // Xử lý sự kiện kết nối
    this.socket.on('connect', () => {
      console.log('Socket đã kết nối với ID: ' + this.socket?.id)
    })

    // Xử lý sự kiện lỗi kết nối
    this.socket.on('connect_error', (error: Error) => {
      console.error('Lỗi kết nối socket:', error)
    })

    // Xử lý sự kiện ngắt kết nối
    this.socket.on('disconnect', (reason: string) => {
      console.log('Socket đã ngắt kết nối:', reason)
    })

    // Đăng ký các trình xử lý sự kiện đã được thêm trước khi kết nối
    Object.keys(this.listeners).forEach(event => {
      this.listeners[event].forEach(callback => {
        this.socket?.on(event, callback)
      })
    })
  }

  // Ngắt kết nối socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Đăng ký lắng nghe một sự kiện
  on(event: string, callback: SocketCallback) {
    // Thêm callback vào danh sách listener
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)

    // Nếu socket đã kết nối, đăng ký lắng nghe sự kiện
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  // Hủy đăng ký lắng nghe một sự kiện
  off(event: string, callback?: SocketCallback) {
    if (callback) {
      // Xóa callback cụ thể
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
      }
      if (this.socket) {
        this.socket.off(event, callback)
      }
    } else {
      // Xóa tất cả callback cho sự kiện
      delete this.listeners[event]
      if (this.socket) {
        this.socket.off(event)
      }
    }
  }

  // Gửi một sự kiện
  emit<T>(event: string, data: T) {
    if (this.socket) {
      this.socket.emit(event, data)
    } else {
      console.error('Socket chưa được kết nối')
    }
  }

  // Kiểm tra trạng thái kết nối
  isConnected(): boolean {
    return this.socket?.connected || false
  }
}

// Tạo instance singleton
export const socketService = new SocketService()

export default socketService 