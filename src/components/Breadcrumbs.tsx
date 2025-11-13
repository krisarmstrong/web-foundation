import type { BreadcrumbsProps } from '../types';

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-2 rounded-lg border border-gray-700/60 bg-gray-800/50 px-4 py-3 text-sm ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.path} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-600">/</span>}
            {isLast ? (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.path}
                className="text-gray-300 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {item.label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
