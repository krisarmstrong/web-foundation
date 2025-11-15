import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider, defaultDarkTheme, defaultLightTheme, intrinsicTheme } from '../src/context/ThemeContext';
import '../src/styles/storybook.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0f172a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'intrinsic',
          value: '#F8F6F1',
        },
      ],
    },
    layout: 'padded',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'intrinsic', title: 'Intrinsic', icon: 'circlehollow' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      const themeConfig =
        theme === 'light'
          ? defaultLightTheme
          : theme === 'intrinsic'
          ? intrinsicTheme
          : defaultDarkTheme;

      return (
        <ThemeProvider initialTheme={themeConfig} initialMode={theme === 'light' ? 'light' : 'dark'}>
          <div style={{ padding: '2rem' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
