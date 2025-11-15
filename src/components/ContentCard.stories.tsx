import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ContentCard } from './ContentCard';
import { BrowserRouter } from 'react-router-dom';
import { Wifi } from 'lucide-react';

const meta: Meta<typeof ContentCard> = {
  title: 'Components/ContentCard',
  component: ContentCard,
  decorators: [
    ((Story: StoryFn<typeof ContentCard>, context) => (
      <BrowserRouter>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {Story(context.args, context)}
        </div>
      </BrowserRouter>
    )),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    accentColor: {
      control: 'select',
      options: ['violet', 'blue', 'green', 'red', 'yellow'],
    },
    severity: {
      control: 'select',
      options: ['Critical', 'High', 'Medium', 'Low'],
    },
    onTagClick: { action: 'tag-clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ContentCard>;

export const Default: Story = {
  args: {
    href: '/example',
    title: 'Example Content Card',
    excerpt: 'This is a basic content card with a title and excerpt. It demonstrates the default styling and layout.',
    accentColor: 'violet',
  },
};

export const BlogPost: Story = {
  args: {
    href: '/blog/getting-started',
    title: 'Getting Started with Web Foundation',
    excerpt: 'Learn how to use the web foundation library to build modern, accessible React applications with pre-built components and design tokens.',
    date: '2024-01-15',
    readTime: 5,
    tags: ['React', 'TypeScript', 'Tutorial'],
    accentColor: 'blue',
  },
};

export const FeaturedBlogPost: Story = {
  args: {
    href: '/blog/featured-article',
    title: 'Advanced Component Patterns in React',
    excerpt: 'Explore advanced patterns for building scalable and maintainable React components using composition, render props, and custom hooks.',
    date: '2024-01-20',
    readTime: 12,
    tags: ['React', 'Advanced', 'Patterns'],
    featured: true,
    accentColor: 'violet',
  },
};

export const SecurityCase: Story = {
  args: {
    href: '/cases/critical-vulnerability',
    title: 'Critical Wi-Fi Security Vulnerability Discovered',
    excerpt: 'A critical vulnerability was discovered in enterprise Wi-Fi infrastructure affecting multiple Fortune 500 companies. Immediate patching recommended.',
    date: '2024-01-18',
    durationMinutes: 45,
    tags: ['WPA3', 'Enterprise', 'Vulnerability'],
    severity: 'Critical',
    status: 'Resolved',
    metadata: 'Enterprise • Financial Services',
    metadataIcon: <Wifi size={14} />,
    accentColor: 'red',
  },
};

export const MediumSeverityCase: Story = {
  args: {
    href: '/cases/medium-issue',
    title: 'Misconfigured Access Points in Retail Environment',
    excerpt: 'Investigation revealed improperly configured wireless access points allowing unauthorized guest network access to internal resources.',
    date: '2024-01-10',
    durationMinutes: 30,
    tags: ['Configuration', 'Retail', 'Access Control'],
    severity: 'Medium',
    status: 'In Progress',
    metadata: 'Retail • Small Business',
    metadataIcon: <Wifi size={14} />,
    accentColor: 'yellow',
  },
};

export const LowSeverityCase: Story = {
  args: {
    href: '/cases/low-priority',
    title: 'Outdated Firmware on Non-Critical Devices',
    excerpt: 'Routine scan identified several access points running outdated firmware. No active exploits known, but upgrade recommended.',
    date: '2024-01-05',
    durationMinutes: 15,
    tags: ['Firmware', 'Maintenance', 'Preventive'],
    severity: 'Low',
    status: 'Scheduled',
    metadata: 'Healthcare • Clinic',
    metadataIcon: <Wifi size={14} />,
    accentColor: 'green',
  },
};

export const WithClickableTags: Story = {
  args: {
    href: '/example/clickable-tags',
    title: 'Content with Interactive Tags',
    excerpt: 'This card demonstrates clickable tags for filtering. Click any tag to see the action logged.',
    tags: ['Interactive', 'Filtering', 'UI/UX'],
    accentColor: 'blue',
    onTagClick: (tag: string) => {
      console.log(`Tag clicked: ${tag}`);
    },
  },
};

export const MinimalCard: Story = {
  args: {
    href: '/minimal',
    title: 'Minimal Content Card',
    excerpt: 'A minimal card with just title and excerpt, no metadata or tags.',
    accentColor: 'violet',
  },
};

export const LongContent: Story = {
  args: {
    href: '/long-content',
    title: 'This is a Very Long Title That Might Wrap to Multiple Lines in the Card Layout',
    excerpt: 'This card demonstrates how the component handles very long content. The excerpt can be quite lengthy and the line-clamp utility will truncate it after three lines with an ellipsis. This ensures cards maintain consistent heights in grid layouts while still providing enough preview text for users to understand the content.',
    date: '2024-01-25',
    readTime: 20,
    tags: ['Long Form', 'Content Strategy', 'Writing', 'Best Practices', 'Documentation'],
    accentColor: 'violet',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['violet', 'blue', 'green', 'red', 'yellow'] as const).map((color) => (
        <ContentCard
          key={color}
          href={`/variant/${color}`}
          title={`${color.charAt(0).toUpperCase() + color.slice(1)} Accent Color`}
          excerpt={`This card demonstrates the ${color} accent color variant with hover effects.`}
          date="2024-01-15"
          readTime={5}
          tags={['Example', 'Variant']}
          accentColor={color}
        />
      ))}
    </div>
  ),
};
