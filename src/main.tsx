import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'keen-slider/keen-slider.min.css'
import './index.css'
import App from './App.tsx'
import './i18n'

// Render ứng dụng
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
