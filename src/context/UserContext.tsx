import React, { createContext, useContext, useState } from "react";
import type { LoginType, RegisterType } from "../utils/validators";
import { auth } from "../lib/auth.client";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
}

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
    signUp: (data: RegisterType) => Promise<void>;
    signIn: (data: LoginType) => Promise<void>;
    signOut: () => Promise<void>;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser deve ser usado dentro de um UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const signUp = async (data: RegisterType) => {
        try {
            const response = await auth.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (response.error) {
                throw new Error(response.error.message || "Erro ao cadastrar");
            }

            if (!response.data?.user) {
                throw new Error("Erro ao cadastrar usuário");
            }

            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            throw error;
        }
    };

    const signIn = async (data: LoginType) => {
        try {
            const response = await auth.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: "/",
            });

            if (response.error) {
                throw new Error(response.error.message || "Credenciais inválidas");
            }

            if (!response.data?.user) {
                throw new Error("Erro ao autenticar usuário");
            }

            setUser(response.data.user as User);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Erro ao entrar:", error);
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erro ao sair:", error);
            throw error;
        }
    };

    const value: UserContextType = {
        user,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
