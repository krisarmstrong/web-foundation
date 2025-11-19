/**
 * @fileoverview Button component with support for multiple variants, sizes, and polymorphic rendering.
 * Can render as a button, React Router Link, or anchor element.
 * @module components/ui/Button
 */

import type { MouseEvent, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Base CSS classes applied to all button variants.
 * Includes flexbox layout, spacing, typography, transitions, and accessibility styles.
 * Enhanced with transform and shadow transitions for premium feel.
 */
const baseClasses =
  'inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-md hover:-translate-y-0.5 active:translate-y-0';

const sizeClasses = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-base',
} as const;

const primaryTone: Record<'blue' | 'violet' | 'sage' | 'emerald' | 'theme', string> = {
  blue: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
  violet: 'bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500',
  sage: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
  emerald: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-400',
  theme: 'text-white focus:ring-2',
};

const variantClasses = {
  secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-gray-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus:ring-yellow-400',
  outline: 'border border-gray-600 bg-transparent hover:bg-gray-700 text-gray-300 focus:ring-gray-500',
  ghost: 'bg-transparent hover:bg-gray-700 text-gray-300 focus:ring-gray-500',
} as const;

type Size = keyof typeof sizeClasses;
type Variant = 'primary' | keyof typeof variantClasses;

interface BaseButtonProps {
  variant?: Variant;
  size?: Size;
  tone?: 'blue' | 'violet' | 'sage' | 'emerald' | 'theme';
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps {
  as?: 'button';
  to?: never;
  href?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonAsLink extends BaseButtonProps {
  as: 'Link';
  to: string;
  href?: never;
  type?: never;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

interface ButtonAsAnchor extends BaseButtonProps {
  as: 'a';
  to?: string;
  href?: string;
  type?: never;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

/**
 * Discriminated union type for Button props.
 * Ensures type-safe usage based on the 'as' prop value.
 */
export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/**
 * Internal loading spinner component displayed when isLoading is true.
 * @param props - Component props
 * @param props.className - Additional CSS classes
 */
const Spinner = ({ className = '' }: { className?: string }) => (
  <svg
    className={`h-4 w-4 animate-spin text-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

/**
 * Button - Polymorphic button component with multiple variants and states.
 *
 * A flexible button component that can render as a button element, React Router Link,
 * or anchor tag. Supports loading states, icons, and multiple visual variants.
 *
 * @component
 * @example
 * // Basic button
 * <Button onClick={handleClick}>Click Me</Button>
 *
 * @example
 * // Button with loading state
 * <Button isLoading={isSubmitting} disabled={isSubmitting}>
 *   Submit Form
 * </Button>
 *
 * @example
 * // Button as React Router Link
 * <Button as="Link" to="/dashboard">
 *   Go to Dashboard
 * </Button>
 *
 * @example
 * // Button with icons
 * <Button leftIcon={<Icon />} variant="primary" tone="violet">
 *   Save Changes
 * </Button>
 *
 * @param props - Button component props
 * @param props.as - Element type to render ('button', 'Link', or 'a')
 * @param props.variant - Visual variant ('primary', 'secondary', 'danger', 'warning', 'outline', 'ghost')
 * @param props.size - Button size ('sm', 'md', 'lg')
 * @param props.tone - Color tone for primary variant ('blue', 'violet', 'sage', 'emerald')
 * @param props.isLoading - Shows loading spinner and disables interaction
 * @param props.disabled - Disables the button
 * @param props.leftIcon - Icon element displayed before children
 * @param props.rightIcon - Icon element displayed after children
 * @param props.children - Button content
 * @param props.className - Additional CSS classes
 * @param props.onClick - Click event handler
 * @param props.type - Button type when as='button' ('button', 'submit', 'reset')
 * @param props.to - Destination when as='Link'
 * @param props.href - Destination when as='a'
 * @param props.target - Target attribute for anchor elements
 * @param props.rel - Rel attribute for anchor elements
 * @returns Rendered button element
 */
export function Button({
  as: ComponentType = 'button',
  to,
  variant = 'primary',
  size = 'md',
  tone = 'theme',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'primary' ? primaryTone[tone] : variantClasses[variant];
  const classList = `${baseClasses} ${sizeClasses[size]} ${variantClass} ${className}`;

  // Apply theme-based styles when tone is 'theme'
  // Use white text for better contrast on the accent color
  const themeStyles = variant === 'primary' && tone === 'theme' ? {
    backgroundColor: 'var(--theme-brand-accent)',
    color: '#ffffff',
  } : {};

  if (ComponentType === 'Link') {
    return (
      <RouterLink
        to={to!}
        className={classList}
        style={themeStyles}
        {...(props as Omit<React.ComponentProps<typeof RouterLink>, 'to'>)}
      >
        {isLoading && <Spinner className={children ? 'mr-2' : ''} />}
        {!isLoading && leftIcon && (
          <span className={children ? 'mr-1.5 -ml-0.5' : ''}>{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className={children ? 'ml-1.5 -mr-0.5' : ''}>{rightIcon}</span>
        )}
      </RouterLink>
    );
  }

  if (ComponentType === 'a') {
    const anchorProps = props as ButtonAsAnchor;
    const href = anchorProps.href || to;
    return (
      <a href={href} className={classList} style={themeStyles} {...anchorProps}>
        {isLoading && <Spinner className={children ? 'mr-2' : ''} />}
        {!isLoading && leftIcon && (
          <span className={children ? 'mr-1.5 -ml-0.5' : ''}>{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className={children ? 'ml-1.5 -mr-0.5' : ''}>{rightIcon}</span>
        )}
      </a>
    );
  }

  return (
    <button
      className={classList}
      style={themeStyles}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {isLoading && (
        <>
          <Spinner className={children ? 'mr-2' : ''} />
          <span className="sr-only">Loading...</span>
        </>
      )}
      {!isLoading && leftIcon && (
        <span className={children ? 'mr-1.5 -ml-0.5' : ''}>{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && (
        <span className={children ? 'ml-1.5 -mr-0.5' : ''}>{rightIcon}</span>
      )}
    </button>
  );
}
