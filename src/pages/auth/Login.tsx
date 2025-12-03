"use client";

import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { FormContainer } from "../../components/ui/FormContainer";
import { InputField } from "../../components/ui/InputField";

type LoginType = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useUser();
    const [formError, setFormError] = useState<string | null>(null);
    const { register, handleSubmit } = useForm<LoginType>();

    const onSubmit = async (data: LoginType) => {
        setFormError(null);
        setIsLoading(true);
        try {
            await signIn(data);
        } catch (error: any) {
            setFormError(error.message || "Erro ao fazer login");
            console.error("Erro no login:", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer
            title="Entrar na Conta"
            onSubmit={handleSubmit(onSubmit)}
            footer={
                <p className="text-center text-sm text-gray-600 mt-4">
                    Ainda não possui conta?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline">
                        Criar conta
                    </a>
                </p>
            }
        >
            {formError && (
                <p className="text-red-500 bg-red-50 border border-red-200 p-2 rounded-lg text-sm">{formError}</p>
            )}
            <InputField
                label="E-mail"
                placeholder="email@email.com"
                icon={<Mail className="w-5 h-5" />}
                type="email"
                {...register("email", { required: true })}
            />
            <InputField
                label="Senha"
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
                type="password"
                {...register("password", { required: true })}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
                {isLoading ? "Entrando..." : "Entrar"}
            </button>
        </FormContainer>
    );
}
