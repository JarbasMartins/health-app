import { useState } from 'react';
import { medicationSchema } from '../../utils/validators';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer } from '../layout/FormContainer';
import { Pill, Plus } from 'lucide-react';
import type { MedicationType } from '../../utils/validators';
import Modal from '../ui/Modal';
import Card from '../ui/Card';

export default function MedicationReminder() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicationType>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: '',
      quantity: '',
      time: '',
      description: '',
    },
  });

  function onSubmit(data: MedicationType) {
    console.log(data);
    setOpen(false);
  }

  return (
    <div className="w-full h-auto space-y-4">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Lembrete de Medicamentos</h2>
          <p className="text-sm opacity-70">Gerencie seus medicamentos</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-white hover:bg-blue-50 border border-gray-300 opacity-50 text-black p-3 rounded-lg"
        >
          <Plus size={22} />
        </button>
      </header>

      <Card icon={Pill} className="h-auto">
        <div className="flex flex-col items-center text-center justify-center py-8">
          <Pill size={64} className="opacity-40" />
          <h2 className="text-base md:text-lg lg:text-xl font-normal opacity-60">
            Nenhum medicamento cadastrado
          </h2>
          <p className="text-sm md:text-base lg:text-lg opacity-60 px-4">
            Clique em adicionar para cadastrar seu medicamento
          </p>
        </div>
      </Card>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <FormContainer
          title="Adicionar Medicamento"
          onSubmit={handleSubmit(onSubmit)}
          footer={
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              >
                Salvar
              </button>
            </div>
          }
        >
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              {...register('name')}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Ex: Ibuprofeno 600mg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Horário</label>
            <input
              type="datetime-local"
              {...register('time')}
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Quantidade</label>
            <input
              placeholder="Diga a quantidade..."
              {...register('quantity')}
              className="w-full border px-3 py-2 rounded mt-1"
              min={1}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Descrição (opcional)
            </label>
            <textarea
              placeholder="Adicione um descrição..."
              {...register('description')}
              rows={3}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>
        </FormContainer>
      </Modal>
    </div>
  );
}
