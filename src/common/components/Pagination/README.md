# Pagination Component

A reusable, accessible pagination component for navigating through pages of content. Built with React, TypeScript, and TailwindCSS.

## Features

- ✅ **Multiple Variants**: `contained`, `outlined`, `text`
- ✅ **Multiple Sizes**: `small`, `medium`, `large`
- ✅ **State Management**: `disabled`, `selected`
- ✅ **Full Accessibility**: ARIA attributes for screen readers
- ✅ **Keyboard Navigation**: Focus states and tab support
- ✅ **Design Tokens**: Integrates with project's `tokens.css`
- ✅ **Responsive**: Mobile-friendly styling
- ✅ **Type-Safe**: Full TypeScript support

## Installation

The component is already part of the project. Import it from:

```tsx
import { Pagination } from '@/components/common/Pagination';
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| string` | - | The page number or identifier to display |
| `selected` | `boolean` | `false` | Whether the pagination item is currently selected |
| `disabled` | `boolean` | `false` | Disables the pagination item |
| `variant` | `'contained' \| 'outlined' \| 'text'` | `'outlined'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the pagination item |
| `className` | `string` | - | Additional CSS classes for styling |
| `id` | `string` | - | HTML id attribute |
| `title` | `string` | - | Tooltip text on hover |
| `tabIndex` | `number` | - | Tab order (automatically set to -1 when disabled) |

### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `(e: React.MouseEvent) => void` | Triggered when clicked |
| `onDoubleClick` | `(e: React.MouseEvent) => void` | Triggered on double-click |
| `onFocus` | `(e: React.FocusEvent) => void` | Triggered when focused |
| `onBlur` | `(e: React.FocusEvent) => void` | Triggered when focus is lost |

### ARIA Attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | `Page {value}` | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element labeling this pagination item |
| `aria-describedby` | `string` | - | ID of element describing this pagination item |
| `aria-disabled` | `boolean` | Synced with `disabled` | Whether the item is disabled |
| `aria-selected` | `boolean` | Synced with `selected` | Whether the item is currently selected |
| `aria-controls` | `string` | - | ID of the content controlled by this pagination |
| `aria-current` | `'page' \| 'step' \| ...` | - | Marks the current page/step |
| `aria-live` | `'off' \| 'polite' \| 'assertive'` | - | Live region update behavior |

## Usage Examples

### Basic Pagination

```tsx
import { useState } from 'react';
import Pagination from '@/components/common/Pagination';

export function MyPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((page) => (
        <Pagination
          key={page}
          value={page}
          selected={page === currentPage}
          onClick={() => setCurrentPage(page)}
        />
      ))}
    </div>
  );
}
```

### With Previous/Next Buttons

```tsx
export function PaginationWithNavigation() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <nav aria-label="Pagination Navigation">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Show pages around current page */}
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
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
```

### With Variants and Sizes

```tsx
<div className="space-y-4">
  {/* Contained variant */}
  <div className="flex gap-2">
    <Pagination value={1} variant="contained" selected />
    <Pagination value={2} variant="contained" />
    <Pagination value={3} variant="contained" disabled />
  </div>

  {/* Outlined variant */}
  <div className="flex gap-2">
    <Pagination value={1} variant="outlined" selected />
    <Pagination value={2} variant="outlined" />
  </div>

  {/* Text variant */}
  <div className="flex gap-2">
    <Pagination value={1} variant="text" selected />
    <Pagination value={2} variant="text" />
  </div>

  {/* Sizes */}
  <div className="flex gap-2 items-center">
    <Pagination value={1} size="small" selected />
    <Pagination value={2} size="medium" selected />
    <Pagination value={3} size="large" selected />
  </div>
</div>
```

### With Accessibility Features

```tsx
export function AccessiblePagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav aria-label="Results pagination">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <Pagination
            key={page}
            value={page}
            selected={page === currentPage}
            onClick={() => setCurrentPage(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-controls="results-section"
            aria-label={`Page ${page}`}
          />
        ))}
      </div>
      <div id="results-section">
        {/* Results content */}
      </div>
    </nav>
  );
}
```

## Variants

### Contained
The page button has a solid background. Selected state shows primary color.

```tsx
<Pagination value={1} variant="contained" selected />
```

### Outlined
The page button has a border. Selected state shows primary color border and background.

```tsx
<Pagination value={1} variant="outlined" selected />
```

### Text
The page button is text-only. Selected state shows bold/colored text.

```tsx
<Pagination value={1} variant="text" selected />
```

## Sizes

- **Small**: Compact size for dense layouts (`text-sm`, `px-2`, `py-1`)
- **Medium**: Default size for most interfaces (default)
- **Large**: Larger size for touch-friendly interfaces

## Design Tokens

This component uses the following design tokens from `src/styles/tokens.css`:

- `--color-primary`: Primary action color
- `--color-primary-dark`: Darker primary for hover states
- `--color-primary-light`: Light primary for backgrounds
- `--font-size-small`, `--font-size-medium`, `--font-size-large`
- `--min-height-small`, `--min-height-medium`, `--min-height-large`

## Accessibility

The component includes:

- **ARIA Labels**: Auto-generated or customizable
- **Keyboard Navigation**: Full tab support and focus states
- **Semantic HTML**: Uses `<button>` for proper screen reader announcement
- **Live Regions**: Optional `aria-live` support for dynamic updates
- **Current Page Indicator**: `aria-current="page"` for the selected page

### Best Practices

1. Wrap pagination in a `<nav>` with `aria-label`:
```tsx
<nav aria-label="Pagination">
  {/* Pagination items */}
</nav>
```

2. Use `aria-current="page"` for the selected page
3. Use `aria-controls` to link pagination with the controlled content
4. Provide descriptive `aria-label` values

## Styling

Extend or override styles using the `className` prop:

```tsx
<Pagination
  value={1}
  className="rounded-full shadow-lg"
  selected
/>
```

## Related Components

- [Button](../Button) - For custom navigation buttons
- [Tabs](../Tabs) - For tab-based navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers
