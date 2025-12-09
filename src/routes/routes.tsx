import { createBrowserRouter } from 'react-router-dom';

import AppHome from '../pages/App';
import LandingPage from '../pages/Landing';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import PrivateLayout from '../layout/PrivateLayout';
import PublicLayout from '../layout/PublicLayout';

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
