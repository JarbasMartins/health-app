import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/user.store';

export default function PrivateLayout() {
  const user = useUserStore((s) => s.user);
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}
