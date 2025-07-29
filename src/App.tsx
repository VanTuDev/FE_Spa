import { Suspense } from 'react'
import { ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import './App.css'
import Home from './pages/Home'
import 'keen-slider/keen-slider.min.css'
// Cấu hình theme cho Ant Design
const theme = {
  token: {
    colorPrimary: '#1890ff',
  },
}

function App() {
  return (
    <ConfigProvider locale={viVN} theme={theme}>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Đang tải...</div>}>
        <Home />
      </Suspense>
    </ConfigProvider>
  )
}

export default App
