import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Pill,
  Smile,
  Droplets,
  ArrowRight,
  Activity,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans selection:bg-teal-100">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              HealthTrack
            </span>
          </div>

          <div className="hidden md:flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate('/register')}
              className="rounded-full bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="flex flex-col">
          <section className="relative overflow-hidden pt-8 pb-10 lg:pt-12 lg:pb-16">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Seu bem-estar,{' '}
                  <span className="text-teal-600">simplificado</span>.
                </h1>
                <p className="mt-6 text-lg text-slate-600 leading-8">
                  Gerencie suas medicações, monitore seu humor e acompanhe sua
                  hidratação em um único lugar. Simples, intuitivo e feito para
                  você.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-base font-semibold text-slate-900 hover:text-teal-600 transition-colors"
                  >
                    Já tenho conta
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="group flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-base font-semibold text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700 hover:shadow-teal-600/30 transition-all"
                  >
                    Criar conta grátis
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Pill size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Controle de Medicação
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Nunca mais esqueça seus remédios. Receba lembretes e
                    mantenha um histórico completo.
                  </p>
                </div>

                <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                    <Smile size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Diário de Humor
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Entenda seus padrões emocionais registrando como você se
                    sente ao longo dos dias.
                  </p>
                </div>

                <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                    <Droplets size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Rastreador de Hidratação
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Defina metas diárias de água e acompanhe seu progresso para
                    uma vida mais saudável.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-8 sm:py-12 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-teal-50 p-3 mb-4">
                    <ShieldCheck className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                    Privacidade Total
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-xs">
                    Seus dados de saúde são apenas seus. Segurança e
                    criptografia de ponta a ponta.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-teal-50 p-3 mb-4">
                    <Activity className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                    Insights Diários
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-xs">
                    Visualize seu progresso com gráficos simples e intuitivos no
                    seu dashboard.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-teal-50 p-3 mb-4">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                    Tempo Real
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-xs">
                    Atualizações instantâneas para que você esteja sempre no
                    controle da sua rotina.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
