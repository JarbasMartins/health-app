'use client';

import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUserStore } from '../stores/user.store';
import { FormContainer } from '../components/ui/form';
import { InputField } from '../components/ui/input';

type LoginType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const signIn = useUserStore((s) => s.signIn);
  const loading = useUserStore((s) => s.loading);
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<LoginType>();
  const [showPassword, setShowPassword] = useState({ password: false });

  const onSubmit = async (data: LoginType) => {
    setFormError(null);
    try {
      await signIn(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro ao fazer login';
      setFormError(message);
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <FormContainer
        title="Entrar na Conta"
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        footer={
          <p className="text-center text-sm text-gray-600 mt-4">
            Ainda não possui conta?{' '}
            <a href="/register" className="text-indigo-600 hover:underline">
              Criar conta
            </a>
          </p>
        }
      >
        {formError && (
          <p className="text-red-500 bg-red-50 border border-red-200 p-2 rounded-lg text-sm">
            {formError}
          </p>
        )}
        <InputField
          label="E-mail"
          placeholder="email@email.com"
          icon={<Mail className="w-5 h-5" />}
          type="email"
          {...register('email', { required: true })}
        />
        <InputField
          label="Senha"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5" />}
          type={showPassword.password ? 'text' : 'password'}
          {...register('password', { required: true })}
          rightIcon={
            showPassword.password ? (
              <EyeOff
                onClick={() =>
                  setShowPassword({ ...showPassword, password: false })
                }
                className="w-5 h-5 cursor-pointer hover:text-black"
              />
            ) : (
              <Eye
                onClick={() =>
                  setShowPassword({ ...showPassword, password: true })
                }
                className="w-5 h-5 cursor-pointer hover:text-black"
              />
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </FormContainer>
    </div>
  );
}
