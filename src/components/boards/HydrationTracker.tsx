import { useEffect, useState } from 'react';
import { GlassWater, Droplet, Plus, RotateCcw, Cog, CheckCircle, XCircle } from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import InputField from '../ui/Input';
import { useHydrationStore } from '../../stores/hydration.store';

export default function HydrationTracker() {
    const { hydration, meta, progress, isGoalReached, loading, addHydration, setMeta, resetHydration, fetchHydrationDaily } = useHydrationStore();
    const [open, setOpen] = useState(false);
    const [tempMeta, setTempMeta] = useState(meta);

    useEffect(() => {
        fetchHydrationDaily();
    }, [fetchHydrationDaily]);

    const quickAmounts = [200, 250, 300, 500];

    return (
        <div className="flex flex-col space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Rastreador de Hidratação</h2>
                    <p className="text-sm opacity-70">Acompanhe sua ingestão diária de água</p>
                </div>

                <button onClick={() => setOpen(true)} className="bg-white hover:bg-blue-50 border border-gray-300 opacity-50 text-black p-3 rounded-lg">
                    <Cog size={22} />
                </button>
            </header>

            <Card title="Como está sua hidratação?" icon={GlassWater}>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                        <h3 className="font-semibold italic">
                            PROGRESSO: <span className="text-blue-600">{Math.round(progress)}%</span>
                        </h3>
                        <h3 className="font-semibold">
                            {hydration} / {meta} <span className="text-xs opacity-50">ml</span>
                        </h3>
                    </div>

                    <div className="h-3 sm:h-4 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full transition-all duration-500 ease-out ${isGoalReached ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${progress}%` }} />
                    </div>

                    <div className="flex items-center justify-end py-2 text-sm min-h-8">
                        {isGoalReached ? (
                            <div className="flex items-center text-green-600 font-bold">
                                <CheckCircle size={16} className="mr-1" />
                                Meta atingida!
                            </div>
                        ) : (
                            <div className="flex items-center text-slate-400 font-medium">
                                <XCircle size={16} className="mr-1" />
                                Ainda não atingiu a meta
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                        {quickAmounts.map((amt) => (
                            <button
                                key={amt}
                                disabled={loading}
                                onClick={() => addHydration(amt)}
                                className="flex flex-col items-center justify-center border border-slate-200 rounded-xl py-3 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
                            >
                                <span className="flex items-center text-blue-600 font-bold mb-1">
                                    + <Droplet size={14} className="ml-0.5 fill-blue-600" />
                                </span>
                                <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700">{amt}ml</span>
                            </button>
                        ))}
                    </div>

                    <div className="w-full flex items-center gap-4">
                        <div className="flex-1 p-6 bg-blue-50 rounded-xs flex flex-col items-center border border-blue-200">
                            <GlassWater size={40} className="text-blue-600 mb-1" />
                            <span className="text-3xl font-bold text-slate-800">
                                {hydration}
                                <span className="text-sm text-slate-400 ml-1 font-normal">ml</span>
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                disabled={loading || hydration <= 0}
                                onClick={() => resetHydration()}
                                className="p-3 border border-slate-200 rounded-xl hover:bg-red-50 hover:text-red-600 disabled:opacity-30 transition-colors"
                            >
                                <RotateCcw size={24} />
                            </button>
                            <button
                                disabled={loading}
                                onClick={() => addHydration(50)}
                                className="p-3 border border-slate-200 rounded-xl hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 transition-colors"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className="space-y-4">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-slate-800">Ajustar Meta</h2>
                        <p className="text-sm text-slate-500">Defina seu objetivo de consumo diário</p>
                    </div>

                    <InputField
                        label="Meta diária em mililitros"
                        placeholder="Ex: 2000"
                        type="number"
                        onChange={(e) => setTempMeta(Number(e.target.value))}
                        className="text-center text-lg font-semibold"
                    />

                    <button
                        onClick={() => {
                            setOpen(false);
                            setMeta(tempMeta);
                        }}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700  shadow-blue-200 transition-colors"
                    >
                        Confirmar Alteração
                    </button>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                        <p className="text-xs text-slate-500">Dica: O consumo ideal médio é de 35ml por cada kg do seu peso.</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
