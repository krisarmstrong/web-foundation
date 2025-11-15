import type { Meta, StoryObj } from '@storybook/react';
import {
  LoadingSpinner,
  LoadingCard,
  LoadingPage,
  Skeleton,
  SkeletonText,
  SkeletonCard,
} from './Loading';

// ============================================================================
// LoadingSpinner Stories
// ============================================================================

const spinnerMeta: Meta<typeof LoadingSpinner> = {
  title: 'Components/Loading/Spinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['violet', 'blue', 'green', 'red', 'yellow', 'gray'],
    },
    size: {
      control: { type: 'range', min: 16, max: 128, step: 8 },
    },
  },
};

export default spinnerMeta;
type SpinnerStory = StoryObj<typeof LoadingSpinner>;

export const DefaultSpinner: SpinnerStory = {
  args: {
    size: 48,
    variant: 'blue',
  },
};

export const SmallSpinner: SpinnerStory = {
  args: {
    size: 24,
    variant: 'violet',
  },
};

export const LargeSpinner: SpinnerStory = {
  args: {
    size: 64,
    variant: 'green',
  },
};

export const AllSpinnerVariants: SpinnerStory = {
  render: () => (
    <div className="flex gap-8 items-center">
      {(['violet', 'blue', 'green', 'red', 'yellow', 'gray'] as const).map((variant) => (
        <div key={variant} className="text-center">
          <LoadingSpinner size={48} variant={variant} />
          <p className="mt-2 text-sm text-gray-400 capitalize">{variant}</p>
        </div>
      ))}
    </div>
  ),
};

export const SpinnerSizes: SpinnerStory = {
  render: () => (
    <div className="flex gap-8 items-end">
      {[24, 32, 48, 64, 96].map((size) => (
        <div key={size} className="text-center">
          <LoadingSpinner size={size} variant="blue" />
          <p className="mt-2 text-sm text-gray-400">{size}px</p>
        </div>
      ))}
    </div>
  ),
};

// ============================================================================
// LoadingCard Stories
// ============================================================================

const cardMeta: Meta<typeof LoadingCard> = {
  title: 'Components/Loading/Card',
  component: LoadingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['violet', 'blue', 'green', 'red', 'yellow', 'gray'],
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
    },
  },
};

export const DefaultCard = {
  args: {
    message: 'Loading...',
    variant: 'blue',
    theme: 'dark',
  },
  ...cardMeta,
};

export const CustomMessage = {
  args: {
    message: 'Fetching your data...',
    variant: 'violet',
    theme: 'dark',
  },
  ...cardMeta,
};

export const LoadingStates = {
  render: () => (
    <div className="space-y-4">
      <LoadingCard message="Loading posts..." variant="blue" theme="dark" />
      <LoadingCard message="Authenticating..." variant="violet" theme="dark" />
      <LoadingCard message="Processing..." variant="green" theme="dark" />
    </div>
  ),
  ...cardMeta,
};

// ============================================================================
// LoadingPage Stories
// ============================================================================

const pageMeta: Meta<typeof LoadingPage> = {
  title: 'Components/Loading/Page',
  component: LoadingPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['violet', 'blue', 'green', 'red', 'yellow', 'gray'],
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
    },
  },
};

export const DefaultPage = {
  args: {
    message: 'Loading...',
    variant: 'blue',
    theme: 'dark',
  },
  ...pageMeta,
};

export const PageWithCustomMessage = {
  args: {
    message: 'Please wait while we load your content...',
    variant: 'violet',
    theme: 'dark',
  },
  ...pageMeta,
};

// ============================================================================
// Skeleton Stories
// ============================================================================

const skeletonMeta: Meta<typeof Skeleton> = {
  title: 'Components/Loading/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const DefaultSkeleton = {
  args: {
    className: 'h-4 w-full',
  },
  ...skeletonMeta,
};

export const SkeletonVariants = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-32 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  ),
  ...skeletonMeta,
};

// ============================================================================
// SkeletonText Stories
// ============================================================================

const skeletonTextMeta: Meta<typeof SkeletonText> = {
  title: 'Components/Loading/SkeletonText',
  component: SkeletonText,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const ThreeLines = {
  args: {
    lines: 3,
  },
  ...skeletonTextMeta,
};

export const FiveLines = {
  args: {
    lines: 5,
  },
  ...skeletonTextMeta,
};

export const OneLine = {
  args: {
    lines: 1,
  },
  ...skeletonTextMeta,
};

// ============================================================================
// SkeletonCard Stories
// ============================================================================

const skeletonCardMeta: Meta<typeof SkeletonCard> = {
  title: 'Components/Loading/SkeletonCard',
  component: SkeletonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const SingleSkeletonCard = {
  ...skeletonCardMeta,
};

export const MultipleSkeletonCards = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
  ...skeletonCardMeta,
};

// ============================================================================
// Complete Loading State Example
// ============================================================================

export const CompleteLoadingExample = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Page Header</h2>
        <Skeleton className="h-10 w-64 mb-6" />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-300">Content Grid</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-300">Text Content</h3>
        <div className="max-w-2xl">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <SkeletonText lines={5} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
