import { createBrowserRouter } from 'react-router-dom';

import AppHome from './pages/app';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import PrivateLayout from './layout/private-layout';
import PublicLayout from './layout/public-layout';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [{ path: '/app', element: <AppHome /> }],
  },
]);
