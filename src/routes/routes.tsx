import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/Register';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';

export const router = createBrowserRouter([
  {
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);
