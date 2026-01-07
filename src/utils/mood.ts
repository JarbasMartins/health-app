import { Meh, Smile, Frown, Angry, Briefcase, BookOpen, Heart, Users, Activity, Ellipsis, type LucideIcon } from 'lucide-react';

export const moodsOptions = [
    { label: 'Feliz', icon: Smile, color: 'text-yellow-500' },
    { label: 'Neutro', icon: Meh, color: 'text-neutral-600' },
    { label: 'Triste', icon: Frown, color: 'text-purple-600' },
    { label: 'Irritado', icon: Angry, color: 'text-red-600' },
];

export const tagsOptions = [
    { label: 'Trabalho', icon: Briefcase },
    { label: 'Estudos', icon: BookOpen },
    { label: 'Saúde', icon: Activity },
    { label: 'Amigos', icon: Users },
    { label: 'Parceiro(a)', icon: Heart },
    { label: 'Outros', icon: Ellipsis },
];

export type MoodProps = {
    label: string;
    icon: LucideIcon;
    color: string;
};

const DEFAULT_MOOD: MoodProps = {
    label: 'Indefinido',
    icon: Meh,
    color: 'text-slate-400 bg-slate-50 border-slate-200',
};

export function getMoodProps(label?: string | null): MoodProps {
    if (!label) return DEFAULT_MOOD;
    return moodsOptions.find((m) => m.label === label) ?? DEFAULT_MOOD;
}
