import { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';

/**
 * Validates if a string is a valid CSS color value
 * @param color - The color string to validate
 * @returns true if valid, false otherwise
 */
function isValidCSSColor(color: string): boolean {
  if (!color || typeof color !== 'string') return false;

  // Allow CSS variables
  if (color.startsWith('var(')) return true;

  // Test by setting on a temporary element
  const element = document.createElement('div');
  element.style.color = '';
  element.style.color = color;

  // If the color was set successfully, it's valid
  return element.style.color !== '';
}

/**
 * Safely sets a CSS property with validation
 * @param element - The element to set the property on
 * @param property - The CSS property name
 * @param value - The value to set
 */
function setSafeProperty(element: HTMLElement, property: string, value: string): void {
  if (isValidCSSColor(value)) {
    element.style.setProperty(property, value);
  } else {
    console.warn(`Invalid CSS color value for ${property}: ${value}`);
  }
}

/**
 * Theme configuration interface
 * All colors should be CSS values (hex, rgb, hsl, CSS variables, etc.)
 */
export interface ThemeConfig {
  /** Brand colors */
  brand?: {
    primary?: string;
    accent?: string;
  };
  /** Surface/background colors */
  surface?: {
    base?: string;
    raised?: string;
    border?: string;
    hover?: string;
  };
  /** Text colors */
  text?: {
    primary?: string;
    muted?: string;
    accent?: string;
    inverse?: string;
  };
  /** Interactive state colors */
  interactive?: {
    default?: string;
    hover?: string;
    active?: string;
    focus?: string;
    disabled?: string;
  };
  /** Status colors */
  status?: {
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
  /** Typography */
  typography?: {
    fontFamily?: {
      heading?: string;
      body?: string;
      mono?: string;
    };
  };
}

/**
 * Color mode: light, dark, or auto (follows system preference)
 */
export type ColorMode = 'light' | 'dark' | 'auto';

export interface ThemeContextValue {
  /** Theme configuration */
  theme: ThemeConfig;
  /** Color mode */
  mode: ColorMode;
  /** Update theme configuration */
  setTheme: (theme: ThemeConfig) => void;
  /** Update color mode */
  setMode: (mode: ColorMode) => void;
  /** Toggle between light and dark modes */
  toggleTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Default dark theme configuration
 */
export const defaultDarkTheme: ThemeConfig = {
  brand: {
    primary: '#3b82f6',
    accent: '#8b5cf6',
  },
  surface: {
    base: '#0f172a',
    raised: '#1e293b',
    border: '#334155',
    hover: '#1e293b',
  },
  text: {
    primary: '#f1f5f9',
    muted: '#94a3b8',
    accent: '#8b5cf6',
    inverse: '#0f172a',
  },
  interactive: {
    default: '#3b82f6',
    hover: '#2563eb',
    active: '#8b5cf6',
    focus: '#8b5cf6',
    disabled: '#64748b',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

/**
 * Default light theme configuration
 */
export const defaultLightTheme: ThemeConfig = {
  brand: {
    primary: '#3b82f6',
    accent: '#8b5cf6',
  },
  surface: {
    base: '#ffffff',
    raised: '#f8fafc',
    border: '#e2e8f0',
    hover: '#f1f5f9',
  },
  text: {
    primary: '#0f172a',
    muted: '#64748b',
    accent: '#8b5cf6',
    inverse: '#ffffff',
  },
  interactive: {
    default: '#3b82f6',
    hover: '#2563eb',
    active: '#8b5cf6',
    focus: '#8b5cf6',
    disabled: '#cbd5e1',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

/**
 * Intrinsic Momentum Mindset theme - Light mode (Sage Green & Rich Gold)
 * Enhanced with better color hierarchy and visual interest
 */
export const intrinsicTheme: ThemeConfig = {
  brand: {
    primary: '#CFB53B',     // Rich gold (PRIMARY for CTAs and important elements)
    accent: '#96A77A',      // Sage green (ACCENT for supporting elements)
  },
  surface: {
    base: '#FAFAF8',        // Slightly warmer off-white background
    raised: '#FFFFFF',      // Pure white for cards
    border: '#D4CFC4',      // Softer, lighter border
    hover: '#F0EDE5',       // Warm hover state
  },
  text: {
    primary: '#2A3930',     // Deeper forest green (better contrast)
    muted: '#5F6B62',       // Medium green-gray for secondary text
    accent: '#CFB53B',      // Rich gold for highlights
    inverse: '#FAFAF8',     // Light text for dark backgrounds
  },
  interactive: {
    default: '#CFB53B',     // Gold as primary interactive color
    hover: '#E0C854',       // Brighter gold on hover
    active: '#B89F2F',      // Darker gold when pressed
    focus: '#CFB53B',       // Gold focus ring
    disabled: '#D9D7CF',    // Muted gray
  },
  status: {
    success: '#96A77A',     // Sage for success
    warning: '#E0A830',     // Warmer gold for warnings
    error: '#C85C57',       // Slightly brighter muted red
    info: '#D48B5C',        // Warmer burnt orange for energy
  },
  typography: {
    fontFamily: {
      heading: 'Poppins, sans-serif',
      body: 'Inter, sans-serif',
    },
  },
};

/**
 * Intrinsic Momentum Mindset theme - Dark mode (Sage Green & Rich Gold)
 * Enhanced with better color hierarchy and visual interest
 */
export const intrinsicThemeDark: ThemeConfig = {
  brand: {
    primary: '#E0C854',     // Brighter gold (PRIMARY for CTAs in dark mode)
    accent: '#A8BA8E',      // Lighter sage (ACCENT for supporting elements)
  },
  surface: {
    base: '#1C2621',        // Rich dark forest background
    raised: '#2A3930',      // Elevated dark surface
    border: '#3F4E45',      // Subtle border
    hover: '#364439',       // Warm hover state
  },
  text: {
    primary: '#F5F3ED',     // Warm light text (better readability)
    muted: '#C4C2B8',       // Warm muted text
    accent: '#E0C854',      // Bright gold for highlights
    inverse: '#2A3930',     // Dark text for light backgrounds
  },
  interactive: {
    default: '#E0C854',     // Bright gold as primary interactive
    hover: '#F0D96F',       // Even brighter gold on hover
    active: '#CFB53B',      // Standard gold when pressed
    focus: '#E0C854',       // Bright gold focus ring
    disabled: '#4A574A',    // Muted gray-green
  },
  status: {
    success: '#A8BA8E',     // Lighter sage for success
    warning: '#F0D96F',     // Bright gold for warnings
    error: '#EB7A75',       // Softer red for dark backgrounds
    info: '#F0A878',        // Warm orange for energy
  },
  typography: {
    fontFamily: {
      heading: 'Poppins, sans-serif',
      body: 'Inter, sans-serif',
    },
  },
};

export interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Initial theme configuration (default: defaultDarkTheme) */
  initialTheme?: ThemeConfig;
  /** Dark theme variant (optional) */
  darkTheme?: ThemeConfig;
  /** Initial color mode (default: 'dark') */
  initialMode?: ColorMode;
  /** Allow theme updates (default: true) */
  allowThemeUpdates?: boolean;
}

/**
 * ThemeProvider - Provides theme configuration to all child components
 *
 * @example
 * ```tsx
 * <ThemeProvider initialTheme={customTheme} initialMode="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  initialTheme = defaultDarkTheme,
  darkTheme,
  initialMode = 'dark',
  allowThemeUpdates = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeConfig>(initialTheme);
  const [mode, setModeState] = useState<ColorMode>(initialMode);
  const lightThemeRef = useState(initialTheme)[0];
  const darkThemeRef = useState(darkTheme || defaultDarkTheme)[0];

  const setTheme = useMemo(
    () => (allowThemeUpdates ? setThemeState : () => {}),
    [allowThemeUpdates]
  );

  const setMode = useMemo(
    () => (allowThemeUpdates ? setModeState : () => {}),
    [allowThemeUpdates]
  );

  const toggleTheme = useMemo(
    () => (allowThemeUpdates ? () => {
      setModeState(prev => {
        const newMode = prev === 'light' ? 'dark' : 'light';
        setThemeState(newMode === 'light' ? lightThemeRef : darkThemeRef);
        return newMode;
      });
    } : undefined),
    [allowThemeUpdates, lightThemeRef, darkThemeRef]
  );

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;

    // Brand colors
    if (theme.brand?.primary) setSafeProperty(root, '--theme-brand-primary', theme.brand.primary);
    if (theme.brand?.accent) setSafeProperty(root, '--theme-brand-accent', theme.brand.accent);

    // Surface colors
    if (theme.surface?.base) setSafeProperty(root, '--theme-surface-base', theme.surface.base);
    if (theme.surface?.raised) setSafeProperty(root, '--theme-surface-raised', theme.surface.raised);
    if (theme.surface?.border) setSafeProperty(root, '--theme-surface-border', theme.surface.border);

    // Text colors
    if (theme.text?.primary) setSafeProperty(root, '--theme-text-primary', theme.text.primary);
    if (theme.text?.muted) setSafeProperty(root, '--theme-text-muted', theme.text.muted);
    if (theme.text?.accent) setSafeProperty(root, '--theme-text-accent', theme.text.accent);
    if (theme.text?.inverse) setSafeProperty(root, '--theme-text-inverse', theme.text.inverse);

    // Interactive colors
    if (theme.interactive?.hover) setSafeProperty(root, '--theme-interactive-hover', theme.interactive.hover);
    if (theme.interactive?.active) setSafeProperty(root, '--theme-interactive-active', theme.interactive.active);
    if (theme.interactive?.focus) setSafeProperty(root, '--theme-interactive-focus', theme.interactive.focus);

    // Apply color mode class
    root.classList.remove('light', 'dark');
    if (mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(mode);
    }
  }, [theme, mode]);

  const value = useMemo(
    () => ({ theme, mode, setTheme, setMode, toggleTheme }),
    [theme, mode, setTheme, setMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * useTheme - Hook to access theme context
 *
 * @example
 * ```tsx
 * const { theme, setTheme } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * useOptionalTheme - Hook to optionally access theme context
 * Returns null if no ThemeProvider is present
 *
 * @example
 * ```tsx
 * const theme = useOptionalTheme();
 * const bgColor = theme?.theme.surface?.base || '#0f172a';
 * ```
 */
export function useOptionalTheme(): ThemeContextValue | null {
  return useContext(ThemeContext);
}
