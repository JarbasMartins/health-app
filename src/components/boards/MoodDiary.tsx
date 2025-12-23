import {
  Smile,
  Meh,
  Frown,
  Angry,
  Plus,
  Briefcase,
  BookOpen,
  Heart,
  Users,
  Activity,
  Ellipsis,
} from 'lucide-react';
import Card from '../ui/card';
import Modal from '../ui/modal';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface MoodOption {
  label: string;
  icon: LucideIcon;
}

export default function MoodDiary() {
  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function toggleTag(label: string) {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  }

  const moods: MoodOption[] = [
    { label: 'Feliz', icon: Smile },
    { label: 'Neutro', icon: Meh },
    { label: 'Triste', icon: Frown },
    { label: 'Irritado', icon: Angry },
  ];

  const tags: MoodOption[] = [
    { label: 'Trabalho', icon: Briefcase },
    { label: 'Estudos', icon: BookOpen },
    { label: 'Saúde', icon: Activity },
    { label: 'Amigos', icon: Users },
    { label: 'Parceiro(a)', icon: Heart },
    { label: 'Outros', icon: Ellipsis },
  ];

  return (
    <div className="flex flex-col space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Diário de Humor</h2>
          <p className="text-sm opacity-70">
            Registre e acompanhe suas emoções
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-white hover:bg-blue-50 border border-gray-300 opacity-50 text-black p-3 rounded-lg"
        >
          <Plus size={22} />
        </button>
      </header>

      <Card icon={Smile} className="h-auto">
        <div className="flex flex-col text-center items-center justify-center py-8">
          <Smile size={64} className="opacity-40" />
          <h2 className="text-base md:text-lg lg:text-xl font-normal opacity-60">
            Nenhuma emoção registrada
          </h2>
          <p className="text-sm md:text-base lg:text-lg opacity-60 px-4">
            Clique em adicionar para registrar sua emoção diária
          </p>
        </div>
      </Card>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold">
            Como você está se sentindo hoje?
          </h2>
          <div className="flex flex-col space-y-4 w-full h-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moods.map((mood) => {
                const isSelected = selectedMood === mood.label;

                return (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    className={`bg-white flex items-center justify-center flex-col border border-gray-300 p-2 rounded-lg transition
                      ${
                        isSelected
                          ? 'text-blue-600 opacity-100 ring border-none ring-blue-400'
                          : 'text-black opacity-50 hover:bg-blue-50'
                      }
                    `}
                  >
                    <mood.icon size={24} />
                    <p className="text-sm font-semibold">{mood.label}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col items-center justify-center">
              <h4 className="text-lg font-semibold mb-2">Tags</h4>
              <div className="grid grid-cols-2 gap-2 w-full">
                {tags.map((tag) => {
                  const isActive = selectedTags.includes(tag.label);

                  return (
                    <button
                      key={tag.label}
                      onClick={() => toggleTag(tag.label)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-full border transition-all
                        ${
                          isActive
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'
                        }
                      `}
                    >
                      <tag.icon size={18} />
                      <span className="text-sm font-medium">{tag.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">
                Deixe um comentário
              </h4>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                rows={3}
                placeholder="Digite seu comentário aqui..."
              />
            </div>

            <button
              onClick={() => setOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-700 transition"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
