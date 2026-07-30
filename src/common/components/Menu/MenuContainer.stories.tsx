import type { Meta, StoryObj } from '@storybook/react';
import MenuContainer from './MenuContainer';
import MenuItem from './MenuItem';
import MenuItemWithIcon from './MenuItemWithIcon';
const meta: Meta<typeof MenuContainer> = {
  title: 'Components/Menu/MenuContainer',
  component: MenuContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: {
    orientation: 'vertical',
    children: (
      <>
        <MenuItem>Home</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Services</MenuItem>
        <MenuItem>Contact</MenuItem>
      </>
    ),
  },
};
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    children: (
      <>
        <MenuItem>Home</MenuItem>
        <MenuItem>Docs</MenuItem>
        <MenuItem>GitHub</MenuItem>
        <MenuItem>Support</MenuItem>
      </>
    ),
  },
};
export const WithStates: Story = {
  args: {
    children: (
      <>
        <MenuItem selected>Home</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem disabled>Archived</MenuItem>
        <MenuItem>Contact</MenuItem>
      </>
    ),
  },
};
export const Sizes: Story = {
  args: {
    children: (
      <>
        <MenuItem size="sm">Small Item</MenuItem>
        <MenuItem size="md">Medium Item</MenuItem>
        <MenuItem size="lg">Large Item</MenuItem>
      </>
    ),
  },
};
export const WithIconsStart: Story = {
  args: {
    children: (
      <>
        <MenuItemWithIcon icon="🏠" size="md">
          Home
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="ℹ️" size="md">
          About
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="⚙️" size="md">
          Settings
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="🚪" size="md">
          Logout
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const WithIconsEnd: Story = {
  args: {
    children: (
      <>
        <MenuItemWithIcon icon="→" iconPosition="end" size="md">
          Next Page
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="✓" iconPosition="end" size="md">
          Completed
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="❌" iconPosition="end" size="md">
          Delete
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const WithBadges: Story = {
  args: {
    children: (
      <>
        <MenuItemWithIcon icon="📧" badge="5" size="md">
          Messages
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="🔔" badge="3" size="md">
          Notifications
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="📋" badge="12" size="md">
          Tasks
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const Mixed: Story = {
  args: {
    children: (
      <>
        <MenuItemWithIcon icon="🏠" size="md">
          Dashboard
        </MenuItemWithIcon>
        <MenuItem size="md">Settings</MenuItem>
        <MenuItemWithIcon icon="📧" badge="5" size="md">
          Messages
        </MenuItemWithIcon>
        <MenuItem disabled size="md">
          Disabled Option
        </MenuItem>
        <MenuItemWithIcon icon="🔍" selected size="md">
          Search
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const Compact: Story = {
  args: {
    children: (
      <>
        <MenuItemWithIcon icon="📁" size="sm">
          Files
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="🔒" size="sm">
          Security
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="👤" size="sm">
          Profile
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const Spacious: Story = {
  args: {
    children: (
      <>
        <MenuItemWithIcon icon="🎨" size="lg">
          Themes
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="🌐" size="lg">
          Language
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="💾" size="lg">
          Save Settings
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const Accessible: Story = {
  args: {
    'aria-label': 'Main navigation menu',
    'aria-live': 'polite',
    children: (
      <>
        <MenuItemWithIcon icon="🏠" aria-label="Go to home page" size="md">
          Home
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="📄" aria-label="View documentation" size="md">
          Docs
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="🐙" aria-label="Visit our GitHub repository" size="md">
          GitHub
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const DarkTheme: Story = {
  args: {
    className: 'bg-gray-800 border-gray-700',
    children: (
      <>
        <MenuItemWithIcon
          icon="💡"
          size="md"
          className="text-gray-100 hover:bg-gray-700"
        >
          Light Mode
        </MenuItemWithIcon>
        <MenuItemWithIcon
          icon="🌙"
          size="md"
          selected
          className="text-gray-100 hover:bg-gray-700"
        >
          Dark Mode
        </MenuItemWithIcon>
        <MenuItemWithIcon
          icon="⚙️"
          size="md"
          className="text-gray-100 hover:bg-gray-700"
        >
          Auto
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const ContextMenu: Story = {
  args: {
    className: 'min-w-max',
    children: (
      <>
        <MenuItemWithIcon icon="✂️" size="md">
          Cut
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="📋" size="md">
          Copy
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="📌" size="md">
          Paste
        </MenuItemWithIcon>
        <MenuItem size="sm" className="border-t border-[var(--color-divider)] my-1" />
        <MenuItemWithIcon icon="🗑️" size="md">
          Delete
        </MenuItemWithIcon>
      </>
    ),
  },
};
export const UserMenu: Story = {
  args: {
    children: (
      <>
        <MenuItemWithIcon icon="👤" size="md">
          Profile
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="⚙️" size="md">
          Settings
        </MenuItemWithIcon>
        <MenuItemWithIcon icon="🔔" badge="2" size="md">
          Notifications
        </MenuItemWithIcon>
        <MenuItem size="sm" className="border-t border-[var(--color-divider)] my-1" />
        <MenuItemWithIcon icon="🚪" size="md">
          Logout
        </MenuItemWithIcon>
      </>
    ),
  },
};

