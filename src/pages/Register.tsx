'use client';

import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormContainer } from '../components/layout/FormContainer';
import { InputField } from '../components/ui/InputField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterType } from '../utils/validators';
import { useState } from 'react';
import { useUserStore } from '../stores/user.store';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const signUp = useUserStore((s) => s.signUp);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterType) => {
    setFormError(null);
    setIsLoading(true);
    try {
      await signUp(data);
      navigate('/login');
    } catch (error: unknown) {
      setFormError(error.message || 'Erro ao fazer login');
      console.error('Erro no login:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6"
        title="Criar Conta"
        footer={
          <p className="text-center text-sm text-gray-600 mt-4">
            Já tem conta?{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              Entrar
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
          label="Nome completo"
          placeholder="Seu nome completo"
          icon={<User className="w-5 h-5" />}
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="E-mail"
          placeholder="email@email.com"
          icon={<Mail className="w-5 h-5" />}
          {...register('email')}
          error={errors.email?.message}
        />
        <InputField
          label="Senha"
          placeholder="••••••••"
          type={showPassword.password ? 'text' : 'password'}
          icon={<Lock className="w-5 h-5" />}
          {...register('password')}
          error={errors.password?.message}
          rightIcon={
            showPassword.password ? (
              <EyeOff
                className="w-5 h-5 cursor-pointer hover:text-black"
                onClick={() =>
                  setShowPassword({ ...showPassword, password: false })
                }
              />
            ) : (
              <Eye
                className="w-5 h-5 cursor-pointer hover:text-black"
                onClick={() =>
                  setShowPassword({ ...showPassword, password: true })
                }
              />
            )
          }
        />
        <InputField
          label="Confirmar senha"
          placeholder="••••••••"
          type={showPassword.confirmPassword ? 'text' : 'password'}
          icon={<Lock className="w-5 h-5" />}
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          rightIcon={
            showPassword.confirmPassword ? (
              <EyeOff
                onClick={() =>
                  setShowPassword({ ...showPassword, confirmPassword: false })
                }
                className="h-5 w-5 cursor-pointer hover:text-black"
              />
            ) : (
              <Eye
                onClick={() =>
                  setShowPassword({ ...showPassword, confirmPassword: true })
                }
                className="h-5 w-5 cursor-pointer hover:text-black"
              />
            )
          }
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-medium text-white transition
              ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </FormContainer>
    </div>
  );
}
