import type { Meta } from '@storybook/react-vite';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;
const TriggerButton = () => (
  <button
    style={{
      padding: 'var(--space-3) var(--space-4)',
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-medium)',
      cursor: 'pointer',
      transition: 'background-color var(--transition-normal)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
    }}
  >
    Hover me
  </button>
);
export const Default = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip title='Tooltip text' placement='top'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const SizeSmall = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip title='Small tooltip' size='sm' placement='top'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const SizeMedium = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip title='Medium tooltip with more content' size='md' placement='top'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const SizeLarge = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip
      title='Large tooltip with even more content for demonstration purposes'
      size='lg'
      placement='top'
    >
      <TriggerButton />
    </Tooltip>
  </div>
);
export const PlacementTop = () => (
  <div style={{ padding: 'var(--space-12)', display: 'flex', justifyContent: 'center' }}>
    <Tooltip title='Top placement' placement='top'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const PlacementBottom = () => (
  <div style={{ padding: 'var(--space-12)', display: 'flex', justifyContent: 'center' }}>
    <Tooltip title='Bottom placement' placement='bottom'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const PlacementLeft = () => (
  <div style={{ padding: 'var(--space-12)', display: 'flex', justifyContent: 'center' }}>
    <Tooltip title='Left placement' placement='left'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const PlacementRight = () => (
  <div style={{ padding: 'var(--space-12)', display: 'flex', justifyContent: 'center' }}>
    <Tooltip title='Right placement' placement='right'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const CustomEnterDelay = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip title='Shows after 500ms delay' placement='top' enterDelay={500}>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const CustomLeaveDelay = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip title='Stays visible for 800ms' placement='top' leaveDelay={800}>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const LongContent = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip
      title='This is a longer tooltip that explains a feature in more detail and may wrap to multiple lines'
      size='lg'
      placement='top'
    >
      <TriggerButton />
    </Tooltip>
  </div>
);
export const RichContent = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span>ℹ️</span>
          <span>Click here to learn more</span>
        </div>
      }
      placement='top'
    >
      <TriggerButton />
    </Tooltip>
  </div>
);
export const AllPlacements = () => (
  <div
    style={{
      padding: 'var(--space-12)',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'var(--space-8)',
      placeItems: 'center',
      minHeight: '500px',
    }}
  >
    <Tooltip title='Top' placement='top'>
      <TriggerButton />
    </Tooltip>
    <Tooltip title='Right' placement='right'>
      <TriggerButton />
    </Tooltip>
    <Tooltip title='Left' placement='left'>
      <TriggerButton />
    </Tooltip>
    <Tooltip title='Bottom' placement='bottom'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const AllSizes = () => (
  <div
    style={{
      padding: 'var(--space-12)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
    }}
  >
    <Tooltip title='Small size' size='sm' placement='right'>
      <TriggerButton />
    </Tooltip>
    <Tooltip title='Medium size - This is the default' size='md' placement='right'>
      <TriggerButton />
    </Tooltip>
    <Tooltip title='Large size with more content for better visibility' size='lg' placement='right'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const WithIcon = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span>⭐</span>
          <span>Add to favorites</span>
        </div>
      }
      placement='top'
    >
      <button
        style={{
          width: '40px',
          height: '40px',
          border: 'var(--border-width-sm) solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-surface)',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ⭐
      </button>
    </Tooltip>
  </div>
);
export const KeyboardInteraction = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip title='Press Escape to close this tooltip, or blur to hide it' placement='top'>
      <TriggerButton />
    </Tooltip>
  </div>
);
export const Accessibility = () => (
  <div style={{ padding: 'var(--space-12)' }}>
    <Tooltip
      title='Help text for form field'
      placement='top'
      aria-label='Help information'
      aria-describedby='help-description'
    >
      <TriggerButton />
    </Tooltip>
  </div>
);
export const Comprehensive = () => (
  <div
    style={{
      padding: 'var(--space-12)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
    }}
  >
    <div>
      <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>Save Action</h3>
      <Tooltip title='Save your changes to the database' placement='right' size='md'>
        <button
          style={{
            padding: 'var(--space-2) var(--space-4)',
            backgroundColor: 'var(--color-success)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          💾 Save
        </button>
      </Tooltip>
    </div>
    <div>
      <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
        Delete Action
      </h3>
      <Tooltip
        title='Permanently delete this item. This action cannot be undone.'
        placement='right'
        size='md'
      >
        <button
          style={{
            padding: 'var(--space-2) var(--space-4)',
            backgroundColor: 'var(--color-error)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          🗑️ Delete
        </button>
      </Tooltip>
    </div>
    <div>
      <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
        Download Action
      </h3>
      <Tooltip title='Download file (CSV format)' placement='right' size='md'>
        <button
          style={{
            padding: 'var(--space-2) var(--space-4)',
            backgroundColor: 'var(--color-info)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          ⬇️ Download
        </button>
      </Tooltip>
    </div>
  </div>
);
