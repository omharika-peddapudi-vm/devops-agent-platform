
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';
const meta: Meta<typeof Pagination> = {
  title: 'Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;
export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
      <Pagination value={1} selected />
      <Pagination value={2} />
      <Pagination value={3} />
      <Pagination value={4} />
    </div>
  ),
};
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Contained Variant
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Pagination value={1} variant="contained" selected />
          <Pagination value={2} variant="contained" />
          <Pagination value={3} variant="contained" />
          <Pagination value={4} variant="contained" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Outlined Variant
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Pagination value={1} variant="outlined" selected />
          <Pagination value={2} variant="outlined" />
          <Pagination value={3} variant="outlined" />
          <Pagination value={4} variant="outlined" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Text Variant
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Pagination value={1} variant="text" selected />
          <Pagination value={2} variant="text" />
          <Pagination value={3} variant="text" />
          <Pagination value={4} variant="text" disabled />
        </div>
      </div>
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Small Size
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Pagination value={1} size="sm" selected />
          <Pagination value={2} size="sm" />
          <Pagination value={3} size="sm" />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Medium Size
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Pagination value={1} size="md" selected />
          <Pagination value={2} size="md" />
          <Pagination value={3} size="md" />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Large Size
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Pagination value={1} size="lg" selected />
          <Pagination value={2} size="lg" />
          <Pagination value={3} size="lg" />
        </div>
      </div>
    </div>
  ),
};
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Selected State
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Pagination value={1} selected variant="contained" />
          <Pagination value={2} selected variant="outlined" />
          <Pagination value={3} selected variant="text" />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Disabled State
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Pagination value={1} disabled variant="contained" />
          <Pagination value={2} disabled variant="outlined" />
          <Pagination value={3} disabled variant="text" />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Disabled + Selected
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Pagination value={1} disabled selected variant="contained" />
          <Pagination value={2} disabled selected variant="outlined" />
          <Pagination value={3} disabled selected variant="text" />
        </div>
      </div>
    </div>
  ),
};
export const Interactive: Story = {
  render: () => {
    const Demo = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = 5;
      const buttonStyle: React.CSSProperties = {
        padding: 'var(--space-2) var(--space-3)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
        cursor: 'pointer',
        fontSize: 'var(--font-size-md)',
        transition: `all var(--transition-normal)`,
      };
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
              Current Page: {currentPage}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination
                  key={page}
                  value={page}
                  selected={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                  aria-label={`Go to page ${page}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
              With Previous/Next
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
              <button
                style={{
                  ...buttonStyle,
                  opacity: currentPage === 1 ? 'var(--opacity-disabled)' : 1,
                  cursor: currentPage === 1 ? 'var(--cursor-disabled)' : 'pointer',
                }}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination
                  key={page}
                  value={page}
                  selected={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                />
              ))}
              <button
                style={{
                  ...buttonStyle,
                  opacity: currentPage === totalPages ? 'var(--opacity-disabled)' : 1,
                  cursor: currentPage === totalPages ? 'var(--cursor-disabled)' : 'pointer',
                }}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};
export const WithAriaAttributes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>
          Pagination with ARIA Labels
        </h3>
        <nav aria-label="Pagination Navigation">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <Pagination
              value={1}
              selected
              aria-current="page"
              aria-label="Page 1 (Current)"
              aria-controls="results-section"
            />
            <Pagination value={2} aria-label="Page 2" aria-controls="results-section" />
            <Pagination value={3} aria-label="Page 3" aria-controls="results-section" />
            <Pagination
              value={4}
              disabled
              aria-disabled={true}
              aria-label="Page 4 (disabled)"
            />
          </div>
        </nav>
        <div id="results-section" style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
          Results for page 1
        </div>
      </div>
    </div>
  ),
};

