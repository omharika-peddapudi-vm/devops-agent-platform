import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    disableEscapeKeyDown: { control: 'boolean' },
    hideBackdrop: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            Open Modal
          </button>
          <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal Title">
            <div style={{ color: 'var(--text-secondary)' }}>
              This is the default modal content. It uses design tokens for consistent styling.
            </div>
            <div style={{ marginTop: 'var(--space-4)', textAlign: 'right' }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  backgroundColor: 'var(--bg-muted)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-md)',
                }}
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};
export const WithoutBackdrop: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Open Modal (No Backdrop)
          </button>
          <Modal isOpen={open} onClose={() => setOpen(false)} hideBackdrop title="No Backdrop">
            <div style={{ color: 'var(--text-secondary)' }}>
              This modal has no backdrop overlay.
            </div>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};
export const DisableEscape: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--color-warning)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Open Modal (Escape Disabled)
          </button>
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            disableEscapeKeyDown
            title="Confirm Action"
          >
            <div style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Pressing Escape will not close this modal. You must click the close button.
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--text-inverse)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                }}
              >
                Close Modal
              </button>
            </div>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};
export const WithSlots: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--color-info)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Open Modal with Slots
          </button>
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            slots={{
              header: (
                <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
                  <h2 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Custom Header
                  </h2>
                </div>
              ),
              footer: (
                <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                  This is the footer slot
                </div>
              ),
              actions: (
                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', padding: 'var(--space-4)' }}>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      padding: 'var(--space-2) var(--space-4)',
                      backgroundColor: 'var(--bg-muted)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      padding: 'var(--space-2) var(--space-4)',
                      backgroundColor: 'var(--color-success)',
                      color: 'var(--text-inverse)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ),
            }}
          >
            <div style={{ padding: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              This modal demonstrates custom slots for header, footer, and actions.
            </div>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};
export const ScrollableContent: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Open Scrollable Modal
          </button>
          <Modal isOpen={open} onClose={() => setOpen(false)} title="Long Content" maxHeight="60vh">
            <div style={{ color: 'var(--text-secondary)' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i} style={{ marginBottom: 'var(--space-3)' }}>
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </div>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};

