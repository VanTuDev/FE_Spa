import { RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';

// Định nghĩa các routes của ứng dụng
export const routes = (): RouteObject[] => [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]; 