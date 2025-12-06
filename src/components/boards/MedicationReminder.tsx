import { useState } from 'react';
import { medicationSchema } from '../../utils/validators';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer } from '../layout/FormContainer';
import { Pill, Plus } from 'lucide-react';
import type { MedicationType } from '../../utils/validators';
import Modal from '../ui/Modal';

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
      <header className="flex items-center justify-between flex-col space-y-2 md:flex-row md:space-y-0">
        <div className="text-center md:text-start">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold">
            Lembrete de Medicamentos
          </h2>
          <p className="text-sm md:text-base lg:text-lg opacity-70">
            Gerencie seus medicamentos e acompanhe sua adesão
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-black flex gap-1 items-center justify-center text-white px-4 py-2 w-full md:w-auto rounded-lg font-bold"
        >
          <Plus size={24} /> Adicionar
        </button>
      </header>

      <div className="w-full h-80 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-col space-y-1 px-8">
        <Pill size={64} className="opacity-40" />
        <h2 className="text-base md:text-lg lg:text-xl font-normal opacity-60">
          Nenhum medicamento cadastrado
        </h2>
        <p className="text-sm md:text-base lg:text-lg opacity-60">
          Clique em adicionar para cadastrar seu medicamento
        </p>
      </div>

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
