import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div className="p-4 bg-gray-50 min-h-screen">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { control: 'boolean' },
    disableElevation: { control: 'boolean' },
    disabled: { control: 'boolean' },
    startIcon: { control: false },
    endIcon: { control: false },
    ariaLabel: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Contained: Story = {
  args: {
    children: 'Contained Button',
    variant: "outlined",
    color: "warning",
    size: "large"
  },
};
export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    color: 'primary',
  },
};
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    color: 'primary',
  },
};
export const WithStartIcon: Story = {
  args: {
    children: 'Start Icon',
    startIcon: <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'%3E%3Cpath d='M5 12h14m-7-7 7 7-7 7'/%3E%3C/svg%3E" alt="Start icon" width="16" height="16" />,
    variant: 'contained',
    color: 'secondary',
  },
};
export const WithEndIcon: Story = {
  args: {
    children: 'End Icon',
    endIcon: <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'%3E%3Cpath d='M5 12h14m-7-7 7 7-7 7'/%3E%3C/svg%3E" alt="End icon" width="16" height="16" />,
    variant: 'contained',
    color: 'success',
  },
};
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    variant: 'contained',
    color: 'error',
  },
};

