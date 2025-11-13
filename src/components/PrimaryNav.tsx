import { NavLink } from 'react-router-dom';
import type { NavItem } from '../types';

type NavVariant = 'violet' | 'blue';
type Orientation = 'horizontal' | 'vertical';

interface PrimaryNavProps {
  items: NavItem[];
  orientation?: Orientation;
  variant?: NavVariant;
  className?: string;
  onNavigate?: () => void;
}

const variantClasses: Record<NavVariant, { active: string; inactive: string }> = {
  violet: {
    active: 'bg-violet-600 text-white shadow-lg shadow-violet-500/50',
    inactive: 'text-gray-300 hover:bg-gray-800 hover:text-white',
  },
  blue: {
    active: 'bg-blue-600 text-white shadow-lg shadow-blue-500/40',
    inactive: 'text-gray-300 hover:bg-gray-700 hover:text-white',
  },
};

export function PrimaryNav({
  items,
  orientation = 'horizontal',
  variant = 'violet',
  className = '',
  onNavigate,
}: PrimaryNavProps) {
  const wrapperBase =
    orientation === 'horizontal'
      ? 'flex items-center gap-2 lg:gap-3'
      : 'flex flex-col gap-2 w-full';

  const activeClasses = variantClasses[variant].active;
  const inactiveClasses = variantClasses[variant].inactive;

  return (
    <nav
      className={`${wrapperBase} ${className}`.trim()}
      aria-label="Primary navigation"
    >
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            [
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
              orientation === 'horizontal' ? 'focus:ring-violet-500' : 'focus:ring-violet-500 w-full justify-between',
              isActive ? activeClasses : inactiveClasses,
            ].join(' ')
          }
          onClick={onNavigate}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            <span>{item.label}</span>
          </span>
          {item.badge && (
            <span className="text-xs font-semibold uppercase tracking-wide text-white bg-white/20 px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
