import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { SearchX, FileX, AlertCircle, Inbox, Database, WifiOff } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accentColor: {
      control: 'select',
      options: ['violet', 'emerald', 'blue', 'amber', 'rose', 'gray'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria',
    accentColor: 'gray',
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: <SearchX size={48} />,
    title: 'No search results',
    description: 'We couldn\'t find any results matching your search. Try different keywords.',
    accentColor: 'blue',
  },
};

export const NoData: Story = {
  args: {
    icon: <Database size={48} />,
    title: 'No data available',
    description: 'There is no data to display at this time.',
    accentColor: 'gray',
  },
};

export const NoFiles: Story = {
  args: {
    icon: <FileX size={48} />,
    title: 'No files found',
    description: 'Upload your first file to get started',
    action: {
      label: 'Upload File',
      onClick: () => console.log('Upload clicked'),
    },
    accentColor: 'violet',
  },
};

export const EmptyInbox: Story = {
  args: {
    icon: <Inbox size={48} />,
    title: 'Your inbox is empty',
    description: 'You\'re all caught up! Check back later for new messages.',
    accentColor: 'emerald',
  },
};

export const NoConnection: Story = {
  args: {
    icon: <WifiOff size={48} />,
    title: 'No internet connection',
    description: 'Please check your network connection and try again.',
    action: {
      label: 'Retry',
      onClick: () => console.log('Retry clicked'),
    },
    accentColor: 'amber',
  },
};

export const Error: Story = {
  args: {
    icon: <AlertCircle size={48} />,
    title: 'Something went wrong',
    description: 'We encountered an error while loading your data. Please try again.',
    action: {
      label: 'Refresh',
      onClick: () => console.log('Refresh clicked'),
    },
    accentColor: 'rose',
  },
};

export const WithAction: Story = {
  args: {
    icon: <SearchX size={48} />,
    title: 'No cases found',
    description: 'Try adjusting your filters to see more results',
    action: {
      label: 'Clear Filters',
      onClick: () => console.log('Clear filters clicked'),
    },
    accentColor: 'blue',
  },
};

export const MinimalHeight: Story = {
  args: {
    title: 'No results',
    description: 'Compact empty state with minimal height',
    minHeight: '150px',
    accentColor: 'gray',
  },
};

export const LargeHeight: Story = {
  args: {
    icon: <SearchX size={64} />,
    title: 'No content available',
    description: 'This empty state has more vertical space',
    minHeight: '500px',
    accentColor: 'violet',
  },
};

export const AllAccentColors: Story = {
  render: () => (
    <div className="space-y-8">
      {(['violet', 'emerald', 'blue', 'amber', 'rose', 'gray'] as const).map((color) => (
        <EmptyState
          key={color}
          icon={<SearchX size={48} />}
          title={`${color.charAt(0).toUpperCase() + color.slice(1)} Accent`}
          description={`Empty state with ${color} accent color`}
          accentColor={color}
          minHeight="200px"
        />
      ))}
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {
    icon: (
      <div className="p-4 bg-blue-500/10 rounded-full">
        <Database size={48} className="text-blue-400" />
      </div>
    ),
    title: 'Custom styled icon',
    description: 'You can pass any custom icon or element',
    accentColor: 'blue',
  },
};

export const NoDescription: Story = {
  args: {
    icon: <Inbox size={48} />,
    title: 'Empty state without description',
    accentColor: 'gray',
  },
};

export const LongContent: Story = {
  args: {
    icon: <AlertCircle size={48} />,
    title: 'This is a Very Long Title That Demonstrates Text Wrapping in Empty States',
    description: 'This is a much longer description that explains in detail what happened and why the user is seeing this empty state. It provides comprehensive context and helpful information to guide the user on what to do next.',
    action: {
      label: 'Take Action',
      onClick: () => console.log('Action clicked'),
    },
    accentColor: 'rose',
  },
};
