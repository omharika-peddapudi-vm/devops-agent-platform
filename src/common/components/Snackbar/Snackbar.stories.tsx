import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';
const meta = {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the snackbar',
    },
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'standard'],
      description: 'Visual variant of the snackbar',
    },
    position: {
      control: { type: 'radio' },
      options: ['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left', 'top-center'],
      description: 'Position on screen',
    },
    autoHideDuration: {
      control: { type: 'number' },
      description: 'Duration in ms before auto-closing (0 = disabled)',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Controls visibility',
    },
    onClose: {
      action: 'onClose',
      description: 'Called when snackbar closes',
    },
    children: {
      control: { type: 'text' },
      description: 'Snackbar message content',
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessibility label for screen readers',
    },
    'aria-live': {
      control: { type: 'radio' },
      options: ['off', 'polite', 'assertive'],
      description: 'ARIA live region politeness',
    },
  },
} satisfies Meta<typeof Snackbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    open: true,
    size: 'md',
    variant: 'standard',
    position: 'bottom-right',
    autoHideDuration: 3000,
    children: 'This is a snackbar notification.',
    'aria-live': 'polite',
  },
};
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    children: 'Small notification',
  },
};
export const Medium: Story = {
  args: {
    ...Default.args,
    size: 'md',
    children: 'Medium notification',
  },
};
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    children: 'Large notification with more content',
  },
};
export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
    children: 'Success! Your changes have been saved.',
  },
};
export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
    children: 'This is an outlined snackbar.',
  },
};
export const Standard: Story = {
  args: {
    ...Default.args,
    variant: 'standard',
    children: 'This is a standard snackbar.',
  },
};
export const PositionBottomRight: Story = {
  args: {
    ...Default.args,
    position: 'bottom-right',
  },
};
export const PositionBottomLeft: Story = {
  args: {
    ...Default.args,
    position: 'bottom-left',
  },
};
export const PositionBottomCenter: Story = {
  args: {
    ...Default.args,
    position: 'bottom-center',
  },
};
export const PositionTopRight: Story = {
  args: {
    ...Default.args,
    position: 'top-right',
  },
};
export const PositionTopLeft: Story = {
  args: {
    ...Default.args,
    position: 'top-left',
  },
};
export const PositionTopCenter: Story = {
  args: {
    ...Default.args,
    position: 'top-center',
  },
};
export const WithStartDecorator: Story = {
  args: {
    ...Default.args,
    startDecorator: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ minWidth: '20px' }}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    children: 'Operation successful!',
    variant: 'filled',
  },
};
export const WithEndDecorator: Story = {
  args: {
    ...Default.args,
    endDecorator: (
      <div
        style={{
          backgroundColor: 'var(--color-error)',
          color: 'white',
          borderRadius: 'var(--radius-full)',
          padding: '2px 6px',
          fontSize: '10px',
          fontWeight: 'bold',
          minWidth: '20px',
          textAlign: 'center',
        }}
      >
        3
      </div>
    ),
    children: 'You have 3 new messages',
  },
};
export const WithBothDecorators: Story = {
  args: {
    ...Default.args,
    startDecorator: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ minWidth: '20px' }}
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    endDecorator: (
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '4px 8px',
          fontSize: '12px',
        }}
      >
        5s
      </div>
    ),
    children: 'Processing your request...',
  },
};
export const NoAutoHide: Story = {
  args: {
    ...Default.args,
    autoHideDuration: 0,
    children: 'This snackbar will not auto-hide. Click X to close.',
  },
};
export const Controlled: Story = {
  render: (args) => {
    return <ControlledSnackbarStory {...args} />;
  },
  args: {
    ...Default.args,
    autoHideDuration: 0,
    children: 'This snackbar is controlled. Toggle via the button above.',
  },
};
function ControlledSnackbarStory(args: StoryObj<typeof Snackbar>) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          border: `1px solid var(--border-color)`,
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-sans)',
        }}
      >
        {open ? 'Close' : 'Open'} Snackbar
      </button>
      <Snackbar {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
export const MultiplePositions: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Snackbar
        open={true}
        position="bottom-right"
        variant="filled"
        autoHideDuration={0}
      >
        Bottom Right
      </Snackbar>
      <Snackbar
        open={true}
        position="bottom-left"
        variant="outlined"
        autoHideDuration={0}
      >
        Bottom Left
      </Snackbar>
      <Snackbar
        open={true}
        position="top-right"
        variant="standard"
        autoHideDuration={0}
      >
        Top Right
      </Snackbar>
      <Snackbar
        open={true}
        position="top-left"
        variant="filled"
        autoHideDuration={0}
      >
        Top Left
      </Snackbar>
    </div>
  ),
};
export const AssertiveAlert: Story = {
  args: {
    ...Default.args,
    'aria-live': 'assertive',
    variant: 'filled',
    children: '⚠️ Important alert! Please take action immediately.',
    autoHideDuration: 0,
  },
};

