import type { BreadcrumbsProps } from '../types';
import { themeTokens } from '../tokens';

/**
 * Breadcrumbs - A component to display a breadcrumb trail.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.items - An array of breadcrumb items.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {Theme} [props.theme='dark'] - The theme of the breadcrumbs.
 * @returns {JSX.Element | null} The rendered breadcrumbs component or null if no items are provided.
 */
export function Breadcrumbs({ items, className = '', theme = 'dark' }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const palette = themeTokens[theme] || themeTokens.dark;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-2 rounded-lg border px-4 py-3 text-sm ${className}`}
      style={{
        borderColor: palette.border,
        backgroundColor: palette.surfaceRaised,
        color: palette.textPrimary,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.path} className="flex items-center gap-2">
            {index > 0 && <span style={{ color: palette.textMuted }}>/</span>}
            {isLast ? (
              <span className="font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.path}
                className="transition-colors underline-offset-4 hover:underline"
                style={{ color: palette.textMuted }}
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
