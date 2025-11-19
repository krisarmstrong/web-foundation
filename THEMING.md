# Theming Guide - Web Foundation

The Web Foundation library provides a comprehensive theming system with support for light/dark modes and custom brand themes.

## Table of Contents

- [Quick Start](#quick-start)
- [Theme Configuration](#theme-configuration)
- [Using ThemeProvider](#using-themeprovider)
- [Pre-built Themes](#pre-built-themes)
- [Custom Themes](#custom-themes)
- [CSS Custom Properties](#css-custom-properties)
- [Dark/Light Mode](#darklight-mode)
- [Tailwind Integration](#tailwind-integration)
- [Theme Debugging](#theme-debugging)

## Quick Start

```tsx
import { ThemeProvider, krisarmstrongTheme } from '@krisarmstrong/web-foundation';

function App() {
  return (
    <ThemeProvider initialTheme={krisarmstrongTheme} initialMode="dark">
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

## Theme Configuration

A theme is defined using the `ThemeConfig` interface:

```typescript
interface ThemeConfig {
  brand?: {
    primary?: string;    // Main brand color
    accent?: string;     // Accent/highlight color
  };
  surface?: {
    base?: string;       // Background color
    raised?: string;     // Elevated surface (cards, modals)
    border?: string;     // Border color
    hover?: string;      // Hover state background
  };
  text?: {
    primary?: string;    // Main text color
    muted?: string;      // Secondary/muted text
    accent?: string;     // Accent text color
    inverse?: string;    // Text on dark backgrounds
  };
  interactive?: {
    default?: string;    // Default interactive element color
    hover?: string;      // Hover state
    active?: string;     // Active/pressed state
    focus?: string;      // Focus ring color
    disabled?: string;   // Disabled state
  };
  status?: {
    success?: string;    // Success messages
    warning?: string;    // Warning messages
    error?: string;      // Error messages
    info?: string;       // Info messages
  };
  typography?: {
    fontFamily?: {
      heading?: string;  // Heading font
      body?: string;     // Body text font
      mono?: string;     // Monospace font
    };
  };
}
```

## Using ThemeProvider

Wrap your application with `ThemeProvider` at the root level:

```tsx
import { ThemeProvider, defaultDarkTheme } from '@krisarmstrong/web-foundation';

function App() {
  return (
    <ThemeProvider
      initialTheme={defaultDarkTheme}
      initialMode="dark"
      allowThemeUpdates={true}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Props

- `initialTheme`: The theme configuration object
- `initialMode`: Color mode - `'light'`, `'dark'`, or `'auto'`
- `allowThemeUpdates`: Whether to allow theme changes at runtime (default: `true`)

## Pre-built Themes

The library includes several pre-built themes:

### Default Dark Theme
```tsx
import { defaultDarkTheme } from '@krisarmstrong/web-foundation';
```

Modern dark theme with blue accents.

### Default Light Theme
```tsx
import { defaultLightTheme } from '@krisarmstrong/web-foundation';
```

Clean light theme with subtle grays.

### krisarmstrong Theme
```tsx
import { krisarmstrongTheme } from '@krisarmstrong/web-foundation';
```

Violet-based theme for krisarmstrong.org.

### WiFi Vigilante Theme
```tsx
import { wifivigilanteTheme } from '@krisarmstrong/web-foundation';
```

Blue-focused theme for WiFi Vigilante site.

### Intrinsic Momentum Mindset Theme
```tsx
import { intrinsicMomentumMindsetTheme, intrinsicTheme } from '@krisarmstrong/web-foundation';
```

Sage green theme for coaching website.

## Custom Themes

### Creating a Custom Theme

```tsx
import { ThemeProvider, defaultDarkTheme } from '@krisarmstrong/web-foundation';

const myCustomTheme = {
  ...defaultDarkTheme,
  brand: {
    primary: '#ff6b35',
    accent: '#f7931e',
  },
  surface: {
    base: '#1a1a2e',
    raised: '#16213e',
    border: '#0f3460',
  },
};

function App() {
  return (
    <ThemeProvider initialTheme={myCustomTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Extending Existing Themes

```tsx
import { krisarmstrongTheme } from '@krisarmstrong/web-foundation';

const myTheme = {
  ...krisarmstrongTheme,
  brand: {
    ...krisarmstrongTheme.brand,
    primary: '#custom-color',
  },
};
```

## CSS Custom Properties

The theme system uses CSS custom properties (variables) that are automatically applied to the document root:

### Brand Variables
- `--theme-brand-primary`: Primary brand color
- `--theme-brand-accent`: Accent color

### Surface Variables
- `--theme-surface-base`: Base background
- `--theme-surface-raised`: Elevated surfaces
- `--theme-surface-border`: Border color

### Text Variables
- `--theme-text-primary`: Primary text
- `--theme-text-muted`: Muted text
- `--theme-text-accent`: Accent text

### Interactive Variables
- `--theme-interactive-hover`: Hover state
- `--theme-interactive-active`: Active state
- `--theme-interactive-focus`: Focus ring

### Using CSS Variables

In your CSS:
```css
.my-component {
  background-color: var(--theme-surface-raised);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-surface-border);
}
```

In Tailwind (via config):
```tsx
className="bg-surface-raised text-text-primary border-surface-border"
```

## Dark/Light Mode

### Setting Mode

```tsx
import { useTheme } from '@krisarmstrong/web-foundation';

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      Toggle {mode === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}
```

### Auto Mode

Use `'auto'` to respect the user's system preference:

```tsx
<ThemeProvider initialMode="auto">
  <App />
</ThemeProvider>
```

## Tailwind Integration

To use theme tokens in Tailwind CSS, configure your `tailwind.config.js`:

```javascript
import {
  colorTokens,
  layoutTokens,
  typographyTokens
} from '@krisarmstrong/web-foundation/tokens';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../web-foundation/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colorTokens.brand,
        surface: colorTokens.surface,
        text: colorTokens.text,
        interactive: colorTokens.interactive,
        status: colorTokens.status,
      },
      spacing: layoutTokens.spacing,
      borderRadius: layoutTokens.borderRadius,
      screens: layoutTokens.breakpoints,
      fontFamily: typographyTokens.fontFamily,
      fontSize: typographyTokens.fontSize,
      fontWeight: typographyTokens.fontWeight,
      lineHeight: typographyTokens.lineHeight,
    },
  },
};
```

Then use in your components:
```tsx
<div className="bg-surface-base text-text-primary">
  <h1 className="text-brand-primary font-heading">Hello World</h1>
</div>
```

## Theme Debugging

### ThemeDiagnostics Component

Use `ThemeDiagnostics` to display all active theme tokens:

```tsx
import { ThemeDiagnostics } from '@krisarmstrong/web-foundation';

function DevTools() {
  return (
    <>
      {import.meta.env.DEV && <ThemeDiagnostics />}
    </>
  );
}
```

This shows a diagnostic panel with all CSS custom properties and their current values.

### ThemeCanary Component

Use `ThemeCanary` for a visual indicator of active tokens:

```tsx
import { ThemeCanary } from '@krisarmstrong/web-foundation';

function Layout() {
  return (
    <>
      {import.meta.env.DEV && <ThemeCanary />}
      <main>{/* Your content */}</main>
    </>
  );
}
```

### ThemeTokenProbe

Inspect specific token values programmatically:

```tsx
import { ThemeTokenProbe } from '@krisarmstrong/web-foundation';

// In dev mode, displays token inspector
<ThemeTokenProbe />
```

## Best Practices

1. **Use Semantic Tokens**: Use theme tokens (`surface-base`, `text-primary`) instead of hardcoded colors
2. **Test Both Modes**: Always test your UI in both light and dark modes
3. **Provide Fallbacks**: CSS variables include fallbacks for SSR/static generation
4. **Avoid Inline Styles**: Use Tailwind classes or CSS modules for themeable styles
5. **Debug with Tools**: Use ThemeDiagnostics and ThemeCanary during development
6. **Validate Colors**: The theme system validates CSS color values to prevent injection

## Examples

### Complete App Setup

```tsx
import {
  ThemeProvider,
  ErrorBoundary,
  intrinsicTheme,
} from '@krisarmstrong/web-foundation';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider initialTheme={intrinsicTheme} initialMode="light">
        <Router>
          <Routes>
            {/* Your routes */}
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

### Runtime Theme Switching

```tsx
import { useTheme, wifivigilanteTheme, krisarmstrongTheme } from '@krisarmstrong/web-foundation';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme === wifivigilanteTheme ? 'wv' : 'ka'}
      onChange={(e) =>
        setTheme(e.target.value === 'wv' ? wifivigilanteTheme : krisarmstrongTheme)
      }
    >
      <option value="wv">WiFi Vigilante</option>
      <option value="ka">Kris Armstrong</option>
    </select>
  );
}
```

## Troubleshooting

### Themes not applying
- Ensure `ThemeProvider` wraps your entire app
- Check browser console for validation warnings
- Verify CSS custom properties in DevTools

### Colors not changing
- Check if `allowThemeUpdates={true}`
- Ensure you're using theme tokens, not hardcoded colors
- Clear browser cache

### Tailwind classes not working
- Verify `tailwind.config.js` includes token imports
- Check content paths include web-foundation source
- Rebuild Tailwind CSS

---

For more information, see the [main README](./README.md) and [component documentation](./docs/).
