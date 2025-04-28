import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Suspense } from 'react'
import { ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import './App.css'
import { routes } from './router'

// Cấu hình theme cho Ant Design
const theme = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorError: '#ff4d4f'
  },
}

// Component con chứa routes
const AppRoutes = () => {
  const appRoutes = useRoutes(routes());
  return appRoutes;
}

function App() {
  return (
    <ConfigProvider locale={viVN} theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Đang tải...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
