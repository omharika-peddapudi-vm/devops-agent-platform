import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';
const meta: Meta<typeof Menu> = {
  title: 'Common/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'danger', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    tabIndex: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: 'Menu',
    variant: 'default',
    size: 'md',
  },
};
export const Primary: Story = {
  args: {
    children: 'Primary Menu',
    variant: 'primary',
    size: 'md',
  },
};
export const Secondary: Story = {
  args: {
    children: 'Secondary Menu',
    variant: 'secondary',
    size: 'md',
  },
};
export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
    size: 'md',
  },
};
export const Link: Story = {
  args: {
    children: 'Link Menu',
    variant: 'link',
    size: 'md',
  },
};
export const SmallSize: Story = {
  args: {
    children: 'Small',
    variant: 'primary',
    size: 'sm',
  },
};
export const LargeSize: Story = {
  args: {
    children: 'Large',
    variant: 'primary',
    size: 'lg',
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Menu (Disabled)',
    variant: 'primary',
  },
};
export const WithTitle: Story = {
  args: {
    children: 'Menu',
    title: 'Click to open menu',
    variant: 'primary',
  },
};
export const WithAriaAttributes: Story = {
  args: {
    'aria-label': 'Options menu',
    'aria-expanded': false,
    'aria-controls': 'menu-popup',
    children: 'Open Options',
    variant: 'primary',
  },
};
export const Controlled: Story = {
  render: (args) => {
    const ControlledMenu = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <Menu
          {...args}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          variant="primary"
        >
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </Menu>
      );
    };
    return <ControlledMenu />;
  },
};
export const WithCustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'font-bold',
    variant: 'primary',
  },
};

