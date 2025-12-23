import { useEffect } from 'react';
import { useUserStore } from './stores/user.store';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const loadSession = useUserStore((s) => s.loadSession);

    useEffect(() => {
        loadSession();
    }, [loadSession]);

    return <>{children}</>;
}
