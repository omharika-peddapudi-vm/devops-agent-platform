import type { Meta, StoryObj } from '@storybook/react';
import List from './List';
const meta: Meta<typeof List> = {
  title: 'Common/List',
  component: List,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    'aria-live': { control: 'select', options: ['off', 'polite', 'assertive'] },
  },
};
export default meta;
type Story = StoryObj<typeof List>;
export const Default: Story = {
  args: {
    'aria-label': 'Basic list',
    children: (
      <>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Item 1
        </li>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Item 2
        </li>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Item 3
        </li>
      </>
    ),
  },
};
export const WithTitle: Story = {
  args: {
    title: 'Menu Items',
    'aria-label': 'Navigation menu',
    children: (
      <>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Home
        </li>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          About
        </li>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Contact
        </li>
      </>
    ),
  },
};
export const Disabled: Story = {
  args: {
    title: 'Disabled List',
    disabled: true,
    'aria-label': 'Disabled list',
    children: (
      <>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-secondary)',
          }}
        >
          Item 1
        </li>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-secondary)',
          }}
        >
          Item 2
        </li>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-secondary)',
          }}
        >
          Item 3
        </li>
      </>
    ),
  },
};
export const WithAriaLive: Story = {
  args: {
    'aria-label': 'Dynamic list',
    'aria-live': 'polite',
    children: (
      <>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Item A
        </li>
        <li
          style={{
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Item B
        </li>
      </>
    ),
  },
};
export const Empty: Story = {
  args: {
    'aria-label': 'Empty list',
    children: <li style={{ padding: 'var(--space-3)', color: 'var(--text-muted)' }}>No items</li>,
  },
};
export const Vertical: Story = {
  args: {
    'aria-label': 'Vertical list',
    children: (
      <>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          First
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Second
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Third
        </li>
      </>
    ),
  },
};
export const WithAriaLivePolite: Story = {
  args: {
    'aria-live': 'polite',
    'aria-label': 'Live update list',
    children: (
      <>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-success)] hover:bg-[var(--color-success-light)] rounded transition-colors'>
          ✓ Task completed
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-info)] hover:bg-[var(--color-info-light)] rounded transition-colors'>
          ℹ Info updated
        </li>
      </>
    ),
  },
};
export const WithAriaLiveAssertive: Story = {
  args: {
    'aria-live': 'assertive',
    'aria-label': 'Alert list',
    children: (
      <>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded transition-colors'>
          ⚠ Error occurred
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-warning)] hover:bg-[var(--color-warning-light)] rounded transition-colors'>
          ⚡ Warning
        </li>
      </>
    ),
  },
};
export const WithAriaLabelledby: Story = {
  render: args => (
    <div>
      <h2 id='custom-list-title' className='text-lg font-bold mb-4'>
        Custom List Title
      </h2>
      <List {...args} aria-labelledby='custom-list-title'>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Item A
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Item B
        </li>
      </List>
    </div>
  ),
};
export const WithAriaDescribedby: Story = {
  render: args => (
    <div>
      <List {...args} aria-describedby='list-description'>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Action 1
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Action 2
        </li>
      </List>
      <p id='list-description' className='text-sm text-[var(--color-text-secondary)] mt-2'>
        Select any action from the list above to proceed.
      </p>
    </div>
  ),
};
export const WithCustomClassName: Story = {
  args: {
    className:
      'bg-[var(--color-primary-light)] rounded-lg p-2 border border-[var(--color-primary)]',
    'aria-label': 'Custom styled list',
    children: (
      <>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-primary)] hover:bg-white rounded transition-colors cursor-pointer'>
          Item 1
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-primary)] hover:bg-white rounded transition-colors cursor-pointer'>
          Item 2
        </li>
      </>
    ),
  },
};
export const WithDividers: Story = {
  args: {
    'aria-label': 'List with dividers',
    children: (
      <>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Section 1 - Item 1
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Section 1 - Item 2
        </li>
        <li className='border-b border-[var(--color-divider)] my-1' />
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Section 2 - Item 1
        </li>
        <li className='px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer'>
          Section 2 - Item 2
        </li>
      </>
    ),
  },
};

