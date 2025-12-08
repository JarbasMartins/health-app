import type { LucideIcon } from 'lucide-react';

interface CardProps {
  title?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  className,
  icon: Icon,
  children,
}: CardProps) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-normal">{title}</h2>
        {Icon && <Icon size={24} className=" text-gray-500" />}
      </div>
      {children}
    </div>
  );
}
