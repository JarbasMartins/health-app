import Card from '../ui/Card';
import { useEffect } from 'react';
import { Pill, GlassWater, Activity, Smile } from 'lucide-react';
import { useHydrationStore } from '../../stores/hydration.store';
import { getMoodProps } from '../../utils/mood';
import { useMoodStore } from '../../stores/mood.store';

export default function Dashboard() {
    const { hydration, meta, progress, isGoalReached, fetchHydrationDaily } = useHydrationStore();
    const { mood, fetchDailyMood } = useMoodStore();

    useEffect(() => {
        fetchHydrationDaily();
        fetchDailyMood();
    }, [fetchHydrationDaily, fetchDailyMood]);

    const { label: MoodLabel, icon: MoodIcon, color: MoodColor } = getMoodProps(mood);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="text-blue-600" />
                Painel de Saúde
            </h1>

            <div className="flex flex-col lg:flex-row-reverse gap-6 w-full">
                <div className="w-full lg:w-2/3 flex flex-col">
                    <Card title="Medicações " icon={Pill} className="w-full h-full">
                        <span className="text-lg md:text-2xl opacity-70 text-blue-800">0%</span>
                        <p className="text-gray-600">0 medicamento(s) cadastrado(s)</p>
                    </Card>
                </div>

                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    <Card title="Hidratação " icon={GlassWater}>
                        <div className="flex flex-col my-auto">
                            <span className="text-lg md:text-2xl opacity-70 text-blue-800">{Math.round(progress)}%</span>
                            <div className="h-4 w-full bg-slate-200 rounded-full">
                                <div
                                    className={`h-full rounded-full transition-all duration-75 ${isGoalReached ? 'bg-green-400' : 'bg-blue-700'}`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-gray-600">
                                {hydration} ml / {meta} ml
                            </p>
                        </div>
                    </Card>

                    <Card title="Humor" icon={Smile}>
                        <div className={`px-6 py-3 bg-blue-50 rounded-xs flex items-center justify-center gap-2 border border-blue-200 ${MoodColor}`}>
                            <MoodIcon size={48} />
                            <h2 className="text-xl font-extrabold uppercase">{MoodLabel}</h2>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
