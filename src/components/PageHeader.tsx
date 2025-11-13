import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function PageHeader({ icon: Icon, title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-8 transition duration-300 ease-out ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg shadow-lg ring-2 ring-violet-500/30">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
      </div>
      <p className="text-gray-400 text-sm sm:text-base ml-[60px]">{description}</p>
    </div>
  );
}
