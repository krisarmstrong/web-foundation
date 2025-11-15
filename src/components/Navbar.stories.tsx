import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Search, User, Settings } from 'lucide-react';
import type { NavItem } from '../types';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  decorators: [
    ((Story: StoryFn<typeof Navbar>, context) => (
      <BrowserRouter>
        {Story(context.args, context)}
        <div id="main-content" style={{ padding: '2rem' }}>
          <h1 style={{ color: '#fff' }}>Page Content</h1>
          <p style={{ color: '#94a3b8' }}>
            Main content starts here. Use Tab key to test keyboard navigation and skip link.
          </p>
        </div>
      </BrowserRouter>
    )),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['violet', 'blue', 'sage', 'default'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const basicNavItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const expandedNavItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/cases', label: 'Cases' },
  { path: '/tools', label: 'Tools' },
  { path: '/blog', label: 'Blog' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const SearchButton = () => (
  <button
    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
    aria-label="Search"
  >
    <Search size={18} />
    <span className="hidden lg:inline">Search</span>
  </button>
);

const ProfileButton = () => (
  <button
    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg flex items-center gap-2 transition-colors"
    aria-label="Profile"
  >
    <User size={18} />
    <span className="hidden lg:inline">Profile</span>
  </button>
);

const MobileSearch = () => (
  <div className="mb-4">
    <input
      type="search"
      placeholder="Search..."
      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
  </div>
);

const MobileFooter = () => (
  <div className="text-sm text-gray-400">
    <p>© 2024 Your Company</p>
    <div className="flex gap-4 mt-2">
      <a href="/privacy" className="hover:text-violet-400 transition-colors">Privacy</a>
      <a href="/terms" className="hover:text-violet-400 transition-colors">Terms</a>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    logo: <span className="text-xl font-bold">Logo</span>,
    navItems: basicNavItems,
    variant: 'violet',
  },
};

export const WithTextLogo: Story = {
  args: {
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">W</span>
        </div>
        <span className="text-xl font-bold">Web Foundation</span>
      </div>
    ),
    navItems: basicNavItems,
    variant: 'violet',
  },
};

export const BlueVariant: Story = {
  args: {
    logo: <span className="text-xl font-bold">Blue Nav</span>,
    navItems: basicNavItems,
    variant: 'blue',
  },
};

export const SageVariant: Story = {
  args: {
    logo: <span className="text-xl font-bold">Sage Nav</span>,
    navItems: basicNavItems,
    variant: 'sage',
  },
};

export const DefaultVariant: Story = {
  args: {
    logo: <span className="text-xl font-bold text-gray-900">Light Nav</span>,
    navItems: basicNavItems,
    variant: 'default',
  },
};

export const WithDesktopActions: Story = {
  args: {
    logo: <span className="text-xl font-bold">Logo</span>,
    navItems: basicNavItems,
    variant: 'violet',
    desktopActions: (
      <div className="flex items-center gap-2">
        <SearchButton />
        <ProfileButton />
      </div>
    ),
  },
};

export const WithMobileActions: Story = {
  args: {
    logo: <span className="text-xl font-bold">Logo</span>,
    navItems: basicNavItems,
    variant: 'violet',
    mobileActions: <MobileSearch />,
  },
};

export const WithMobileFooter: Story = {
  args: {
    logo: <span className="text-xl font-bold">Logo</span>,
    navItems: basicNavItems,
    variant: 'violet',
    mobileFooter: <MobileFooter />,
  },
};

export const CompleteNavbar: Story = {
  args: {
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">W</span>
        </div>
        <span className="text-xl font-bold">Web Foundation</span>
      </div>
    ),
    navItems: expandedNavItems,
    variant: 'violet',
    desktopActions: (
      <div className="flex items-center gap-2">
        <SearchButton />
        <ProfileButton />
      </div>
    ),
    mobileActions: <MobileSearch />,
    mobileFooter: <MobileFooter />,
  },
};

export const ManyNavItems: Story = {
  args: {
    logo: <span className="text-xl font-bold">Logo</span>,
    navItems: [
      { path: '/', label: 'Home' },
      { path: '/products', label: 'Products' },
      { path: '/solutions', label: 'Solutions' },
      { path: '/pricing', label: 'Pricing' },
      { path: '/blog', label: 'Blog' },
      { path: '/docs', label: 'Docs' },
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact' },
    ],
    variant: 'violet',
  },
};

export const CustomColors: Story = {
  args: {
    logo: <span className="text-xl font-bold">Custom</span>,
    navItems: basicNavItems,
    bgColor: 'bg-indigo-900',
    borderColor: 'border-indigo-700',
    textColor: 'text-white',
    accentColor: 'focus:ring-indigo-500',
  },
};

export const MinimalNav: Story = {
  args: {
    logo: <span className="text-xl font-bold">Minimal</span>,
    navItems: [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About' },
    ],
    variant: 'violet',
  },
};

export const WithSettingsAction: Story = {
  args: {
    logo: <span className="text-xl font-bold">App</span>,
    navItems: basicNavItems,
    variant: 'blue',
    desktopActions: (
      <button
        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['violet', 'blue', 'sage', 'default'] as const).map((variant) => (
        <div key={variant}>
          <Navbar
            logo={<span className="text-xl font-bold capitalize">{variant}</span>}
            navItems={basicNavItems}
            variant={variant}
          />
          <div style={{ height: '100px' }} />
        </div>
      ))}
    </div>
  ),
};
