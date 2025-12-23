import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/user.store';
import { LayoutDashboard, Pill, Smile, Droplets, Heart } from 'lucide-react';
import Dashboard from '../components/boards/Dashboard';
import MedicationReminder from '../components/boards/MedicationReminder';
import MoodDiary from '../components/boards/MoodDiary';
import HydrationTracker from '../components/boards/HydrationTracker';

type BoardType = 'dashboard' | 'medication' | 'mood' | 'hydration';

export default function AppHome() {
  const user = useUserStore((s) => s.user);
  const signOut = useUserStore((s) => s.signOut);
  const navigate = useNavigate();
  const firstName = user?.name?.trim().split(' ')[0] ?? 'Usuário';
  const [activeBoard, setActiveBoard] = useState<BoardType>('dashboard');

  const boards: Record<BoardType, React.ReactNode> = {
    dashboard: <Dashboard />,
    medication: <MedicationReminder />,
    mood: <MoodDiary />,
    hydration: <HydrationTracker />,
  };

  const BOARDS_DATA = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Visão Geral' },
    { id: 'medication', icon: Pill, label: 'Medicações' },
    { id: 'mood', icon: Smile, label: 'Humor' },
    { id: 'hydration', icon: Droplets, label: 'Hidratação' },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              HealthTrack
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-slate-600 sm:inline-block">
              Olá, {firstName}.
            </span>

            <button
              onClick={() => {
                signOut();
                navigate('/login');
              }}
              className="rounded-full border border-slate-200 bg-white px-8 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="flex p-1 bg-slate-200/60 rounded-xl overflow-x-auto no-scrollbar">
            {BOARDS_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveBoard(tab.id as BoardType)}
                className={`flex-1 sm:min-w-[100px] flex items-center justify-center gap-2 py-3 sm:py-2.5 px-2 sm:px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeBoard === tab.id
                    ? 'bg-white text-teal-700 shadow-sm ring-1 ring-black/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <tab.icon size={20} />
                <span className="hidden sm:inline whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div>{boards[activeBoard]}</div>
      </main>
    </div>
  );
}
