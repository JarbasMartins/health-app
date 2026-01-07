import React from 'react';

interface FormContainerProps {
    title: string;
    className?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormContainer({ title, children, footer, className, onSubmit }: FormContainerProps) {
    return (
        <form onSubmit={onSubmit} className={`${className ?? ''}`}>
            <h1 className="text-lg md:text-xl font-semibold text-center text-gray-800">{title}</h1>
            <div className="space-y-4">{children}</div>
            {footer}
        </form>
    );
}
