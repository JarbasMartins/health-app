import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  rightIcon?: React.ReactNode;
}

export function InputField({
  label,
  icon,
  rightIcon,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5">
            {icon}
          </span>
        )}

        <input
          {...props}
          className={`
            w-full text-black py-2 pr-4 rounded-lg border
            ${error ? 'border-red-500' : 'border-gray-300'}
            focus:ring-2 focus:ring-indigo-500 outline-none
            ${icon ? 'pl-11' : 'pl-4'}
          `}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5">
            {rightIcon}
          </span>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
