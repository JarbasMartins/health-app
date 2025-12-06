import { Pill, GlassWaterIcon, Smile } from 'lucide-react';
import Card from '../ui/Card';
import { useHydrationStore } from '../../stores/hydration.store';

export default function Dashboard() {
  const hydration = useHydrationStore((s) => s.hydration);
  const meta = useHydrationStore((s) => s.meta);
  const progress = useHydrationStore((s) => s.progress);
  const isGoalReached = useHydrationStore((s) => s.isGoalReached);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Medicações " icon={Pill}>
        <span className="text-lg md:text-2xl opacity-70 text-blue-800">0%</span>
        <p className="text-gray-600">0 medicamento(s) cadastrado(s)</p>
      </Card>
      <Card title="Hidratação " icon={GlassWaterIcon}>
        <span className="text-lg md:text-2xl opacity-70 text-blue-800">
          {Math.round(progress)}%
        </span>
        <div className="h-4 w-full bg-slate-200 rounded-full">
          <div
            className={`h-full rounded-full transition-all duration-75 ${
              isGoalReached ? 'bg-green-400' : 'bg-blue-700'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-600">
          {hydration} ml / {meta} ml
        </p>
      </Card>
      <Card title="Humor" icon={Smile}>
        <p className="text-gray-600">Nenhum registro </p>
      </Card>
    </div>
  );
}
