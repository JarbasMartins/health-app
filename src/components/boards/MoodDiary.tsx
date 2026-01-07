import Card from '../ui/Card';
import Modal from '../ui/Modal';
import FormContainer from '../ui/Form';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { moodSchema, type MoodType } from '../../utils/validators';
import { Plus, Quote, Edit2, Calendar, Activity } from 'lucide-react';
import { useMoodStore } from '../../stores/mood.store';
import { tagsOptions, moodsOptions } from '../../utils/mood';
import { getMoodProps } from '../../utils/mood';

export default function MoodDiary() {
    const [open, setOpen] = useState(false);
    const { mood, tags, saveMood, comment, fetchDailyMood } = useMoodStore();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<MoodType>({
        resolver: zodResolver(moodSchema),
        defaultValues: {
            mood: '',
            tags: [],
            comment: '',
        },
    });

    useEffect(() => {
        fetchDailyMood();
    }, [fetchDailyMood]);

    useEffect(() => {
        if (open && mood) {
            setValue('mood', mood);
            setValue('tags', tags);
            setValue('comment', comment);
        }
        if (open && !mood) reset();
    }, [open, mood, tags, comment, setValue, reset]);

    const onSubmit = async (data: MoodType) => {
        try {
            const sucess = await saveMood(data);
            if (!sucess) return;
            setOpen(false);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const { label: MoodLabel, icon: MoodIcon, color: MoodColor } = getMoodProps(mood);

    return (
        <div className="flex flex-col space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Diário de Humor</h2>
                    <p className="text-sm opacity-70">Registre e acompanhe suas emoções</p>
                </div>

                <button onClick={() => setOpen(true)} className="bg-white hover:bg-blue-50 border border-gray-300 opacity-50 text-black p-3 rounded-lg">
                    {!mood ? <Plus size={22} /> : <Edit2 size={22} />}
                </button>
            </header>

            <Card title="Como você está hoje?" icon={Calendar} className="h-auto">
                {!mood ? (
                    <div className="flex flex-col text-center items-center justify-center py-8">
                        <MoodIcon size={64} className={MoodColor} />
                        <h2 className="text-base md:text-lg lg:text-xl font-normal opacity-60">Nenhuma emoção registrada</h2>
                        <p className="text-sm md:text-base lg:text-lg opacity-60 px-4">Clique em adicionar para registrar sua emoção diária</p>
                    </div>
                ) : (
                    <div className="flex flex-col w-full h-full space-y-4">
                        <div className={`flex-1 p-6 bg-blue-50 rounded-xs flex flex-col items-center space-y-1 border border-blue-200 ${MoodColor}`}>
                            <MoodIcon size={64} />
                            <h2 className="text-xl font-extrabold uppercase">{MoodLabel}</h2>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Atividades e Contexto</h4>
                                    <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                                        {tags.map((tag) => {
                                            const TagIcon = tagsOptions.find((t) => t.label === tag)?.icon || Activity;
                                            return (
                                                <div
                                                    key={tag}
                                                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 shadow-sm"
                                                >
                                                    <TagIcon size={14} className="text-slate-400" />
                                                    {tag}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {comment && (
                            <div className="flex flex-col space-y-2">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Comentário</h4>
                                <div className="bg-blue-50 border relative border-blue-200 opacity-60 rounded-xs flex gap-2 p-4 items-center justify-start">
                                    <Quote size={16} className="absolute right-0.5 top-0.5" />
                                    <p className="text-sm md:text-base">{comment}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Card>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <FormContainer onSubmit={handleSubmit(onSubmit)} title="Como você está se sentindo hoje?">
                    <div className="text-center space-y-4 mt-4">
                        <div className="flex flex-col space-y-4 w-full h-full justify-center">
                            <Controller
                                name="mood"
                                rules={{ required: 'Selecione um humor.' }}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-4 gap-4">
                                            {moodsOptions.map((m) => (
                                                <button
                                                    key={m.label}
                                                    type="button"
                                                    onClick={() => {
                                                        field.onChange(m.label);
                                                    }}
                                                    className={`${
                                                        field.value === m.label ? 'text-white bg-blue-600 ring-blue-600' : 'text-gray-600 hover:bg-blue-50 bg-white ring-gray-600'
                                                    } flex items-center justify-center flex-col p-2 md:p-4 rounded-lg transition-colors ring`}
                                                >
                                                    <m.icon size={28} />
                                                    <p className="text-sm font-semibold">{m.label}</p>
                                                </button>
                                            ))}
                                        </div>
                                        {fieldState.error && <p className="text-red-500 bg-red-50 border border-red-200 p-2 rounded-lg text-sm">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />

                            <Controller
                                name="tags"
                                control={control}
                                rules={{
                                    validate: (value) => value.length > 0 || 'Selecione pelo menos uma tag',
                                }}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-semibold mb-2">Tags</h4>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            {tagsOptions.map((tag) => {
                                                const currentValue = field.value || [];
                                                const isSelected = field.value.includes(tag.label);
                                                return (
                                                    <button
                                                        key={tag.label}
                                                        type="button"
                                                        onClick={() => {
                                                            const newValue = isSelected ? currentValue.filter((v) => v !== tag.label) : [...currentValue, tag.label];
                                                            field.onChange(newValue);
                                                        }}
                                                        className={` ${
                                                            isSelected ? 'bg-blue-600 text-white' : ' bg-white text-gray-600 hover:bg-blue-50'
                                                        } flex items-center justify-center gap-2 px-3 py-2 rounded-full border  transition-all border-gray-30`}
                                                    >
                                                        <tag.icon size={18} />
                                                        <span className="text-sm font-medium">{tag.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {fieldState.error && <p className="text-red-500 bg-red-50 border border-red-200 p-2 rounded-lg text-sm">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />

                            <div>
                                <h4 className="text-lg font-semibold mb-2">Deixe um comentário</h4>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                                    rows={3}
                                    placeholder="Digite seu comentário aqui..."
                                    {...register('comment')}
                                />
                                {errors.comment && <p className="text-red-500 bg-red-50 border border-red-200 p-2 rounded-lg text-sm">{errors.comment?.message}</p>}
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700  shadow-blue-200 transition-colors">
                                Salvar
                            </button>
                        </div>
                    </div>
                </FormContainer>
            </Modal>
        </div>
    );
}
