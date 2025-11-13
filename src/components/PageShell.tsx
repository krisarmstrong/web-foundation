import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import { layoutTokens } from '../tokens';

interface PageShellProps {
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
  skipLinkLabel?: string;
  skipLinkTarget?: string;
  className?: string;
}

export function PageShell({
  breadcrumbs,
  children,
  skipLinkLabel = 'Skip to content',
  skipLinkTarget = '#main-content',
  className = '',
}: PageShellProps) {
  return (
    <div className={`flex min-h-screen flex-col bg-gray-950 text-white ${className}`}>
      <a
        href={skipLinkTarget}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        {skipLinkLabel}
      </a>
      <main
        id={skipLinkTarget.replace('#', '')}
        className="flex-grow px-4 py-8 sm:px-6 lg:px-8"
        style={{ maxWidth: layoutTokens.contentMaxWidth, width: '100%', margin: '0 auto' }}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}
        {children}
      </main>
    </div>
  );
}
