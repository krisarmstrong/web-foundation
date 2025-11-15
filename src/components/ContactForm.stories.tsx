import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './ContactForm';

const meta: Meta<typeof ContactForm> = {
  title: 'Forms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Let\'s talk',
    description: 'Send the details and I\'ll follow up within one business day.',
    endpoint: 'https://example.com/forms/contact',
    privacyNotice: 'By submitting, you agree to our privacy policy.',
    footer: (
      <span>
        Prefer email? <a className="underline" href="mailto:hello@example.com">hello@example.com</a>
      </span>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Violet: Story = {
  args: {
    tone: 'violet',
    background: 'dark',
  },
};

export const Emerald: Story = {
  args: {
    tone: 'emerald',
    background: 'dark',
    submitLabel: 'Request audit',
    footer: 'Connect on LinkedIn @krisarmstrong',
  },
};

export const LightCard: Story = {
  args: {
    tone: 'sage',
    background: 'light',
    title: 'Ready for coaching?',
    description: 'Share your goals and I\'ll deliver a tailored plan.',
    privacyNotice: 'No spam. Just thoughtful responses.',
  },
};

export const OfflineState: Story = {
  args: {
    endpoint: undefined,
    tone: 'blue',
    title: 'Contact form offline',
    description: 'Demonstrates the fallback copy when no endpoint is configured.',
  },
};
