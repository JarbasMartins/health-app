import {
  GlassWater,
  Droplet,
  Minus,
  Plus,
  RotateCcw,
  Cog,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { useHydrationStore } from '../../stores/hydration.store';
import { InputField } from '../ui/InputField';
import { useState } from 'react';

export default function HydrationTracker() {
  const hydration = useHydrationStore((s) => s.hydration);
  const meta = useHydrationStore((s) => s.meta);
  const addHydration = useHydrationStore((s) => s.addHydration);
  const resetHydration = useHydrationStore((s) => s.resetHydration);
  const setMeta = useHydrationStore((s) => s.setMeta);
  const progress = useHydrationStore((s) => s.progress);
  const isGoalReached = useHydrationStore((s) => s.isGoalReached);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Rastreador de Hidratação</h2>
          <p className="text-sm opacity-70">
            Acompanhe sua ingestão diária de água
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-white hover:bg-blue-50 border border-gray-300 opacity-50 text-black p-3 rounded-lg"
        >
          <Cog size={22} />
        </button>
      </header>

      <Card title="Hidratação Hoje" icon={GlassWater}>
        <div className="flex flex-col">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <h3 className="font-semibold">
              PROGRESSO:{' '}
              <span className="text-blue-600">{Math.round(progress)}%</span>
            </h3>
            <h3 className="font-semibold">
              {hydration} / {meta} ml
            </h3>
          </div>

          <div className="h-3 sm:h-4 w-full bg-slate-200 rounded-full mt-1">
            <div
              className={`h-full rounded-full transition-all ${
                isGoalReached ? 'bg-green-400' : 'bg-blue-700'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {isGoalReached ? (
            <div className="flex items-center justify-end py-1 text-sm">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-green-500 font-semibold ml-1">
                Meta atingida!
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-end py-1 text-sm">
              <XCircle size={16} className="text-red-500" />
              <span className="text-red-500 font-semibold ml-1">
                Meta não atingida!
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            {[200, 250, 300, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => addHydration(amt)}
                className="flex flex-col items-center justify-center border border-gray-300 rounded-md px-3 py-2 sm:px-6 sm:py-4 hover:bg-blue-200 transition text-sm sm:text-base font-semibold"
              >
                <span className="flex items-center text-blue-600">
                  + <Droplet size={18} className="text-blue-600" />
                </span>
                <span className="opacity-80">{amt}ml</span>
              </button>
            ))}
          </div>

          <div className="w-full flex justify-center items-center gap-2">
            <div className="w-full p-6 bg-blue-50 rounded-lg flex flex-col items-center gap-1">
              <GlassWater size={48} className="text-blue-600" />
              <span className="text-2xl font-semibold">
                {hydration}
                <span className="text-lg text-gray-400">ml</span>
              </span>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <button
                onClick={() => addHydration(-50)}
                className="border border-gray-300 rounded-md p-2.5 hover:bg-blue-50 flex items-center justify-center"
              >
                <Minus size={20} />
              </button>

              <button
                onClick={() => addHydration(50)}
                className="border border-gray-300 rounded-md p-3 hover:bg-blue-50 flex items-center justify-center"
              >
                <Plus size={20} />
              </button>

              <button
                onClick={resetHydration}
                className="border border-gray-300 rounded-md p-3 hover:bg-blue-50 flex items-center justify-center"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="text-center space-y-3">
          <h2 className="text-lg font-semibold">Configurações de Hidratação</h2>

          <InputField
            label="Meta diária (ml)"
            type="number"
            value={meta}
            onChange={(e) => setMeta(Number(e.target.value))}
          />

          <button
            onClick={() => setOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-700 transition"
          >
            Salvar
          </button>

          <p className="text-xs text-slate-500">
            Recomendado: 35ml por kg de peso corporal.
          </p>
        </div>
      </Modal>
    </div>
  );
}
