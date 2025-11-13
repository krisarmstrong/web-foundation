import { Loader2 } from 'lucide-react';

// ============================================================================
// Loading Spinner
// ============================================================================

export interface LoadingSpinnerProps {
  /** Size of the spinner in pixels */
  size?: number;
  /** Optional CSS class name */
  className?: string;
  /** Color variant */
  variant?: 'violet' | 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

const spinnerColors = {
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
  red: 'text-red-400',
  yellow: 'text-yellow-400',
  gray: 'text-gray-400',
};

/**
 * LoadingSpinner - Animated spinner for loading states
 */
export function LoadingSpinner({
  size = 48,
  className = '',
  variant = 'blue'
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 size={size} className={`animate-spin ${spinnerColors[variant]}`} />
    </div>
  );
}

// ============================================================================
// Loading Card
// ============================================================================

export interface LoadingCardProps {
  /** Loading message to display */
  message?: string;
  /** Color variant */
  variant?: 'violet' | 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

/**
 * LoadingCard - Card-style loading indicator
 */
export function LoadingCard({
  message = 'Loading...',
  variant = 'blue'
}: LoadingCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-8 text-center">
      <LoadingSpinner size={48} className="mb-4" variant={variant} />
      <p className="text-gray-300">{message}</p>
    </div>
  );
}

// ============================================================================
// Loading Page
// ============================================================================

export interface LoadingPageProps {
  /** Loading message to display */
  message?: string;
  /** Color variant */
  variant?: 'violet' | 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

/**
 * LoadingPage - Full-page loading indicator
 */
export function LoadingPage({
  message = 'Loading...',
  variant = 'blue'
}: LoadingPageProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-white">
      <LoadingSpinner size={64} variant={variant} />
      <p className="mt-4 text-lg text-gray-300">{message}</p>
    </div>
  );
}

// ============================================================================
// Skeleton Components
// ============================================================================

export interface SkeletonProps {
  /** Optional CSS class name */
  className?: string;
}

/**
 * Skeleton - Base skeleton loading placeholder
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-700 rounded ${className}`}
      aria-live="polite"
      aria-busy="true"
    />
  );
}

export interface SkeletonTextProps {
  /** Number of skeleton lines to display */
  lines?: number;
}

/**
 * SkeletonText - Multiple skeleton lines for text content
 */
export function SkeletonText({ lines = 3 }: SkeletonTextProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-5/6' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonCard - Skeleton placeholder for card content
 */
export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-lg p-6">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <SkeletonText lines={3} />
      <Skeleton className="h-10 w-32 mt-6" />
    </div>
  );
}
