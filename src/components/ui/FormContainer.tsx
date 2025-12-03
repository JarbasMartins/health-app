import React from "react";

interface FormContainerProps {
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function FormContainer({ title, children, footer, onSubmit }: FormContainerProps) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={onSubmit} className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6">
                <h1 className="text-2xl font-semibold text-center text-gray-800">{title}</h1>
                <div className="space-y-4">{children}</div>
                {footer}
            </form>
        </div>
    );
}
