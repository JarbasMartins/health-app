import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/user.store';

export default function PublicLayout() {
  const user = useUserStore((s) => s.user);
  if (user) return <Navigate to="/app" replace />;
  return <Outlet />;
}
