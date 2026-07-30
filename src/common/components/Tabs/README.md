# Tabs Component

A fully reusable, accessible, token-driven Tabs component system inspired by MUI Tabs, built with React, TypeScript, and TailwindCSS.

## Overview

The Tabs system consists of three components:
- **`Tabs`** – Container/wrapper managing tab state
- **`Tab`** – Individual tab button with icon, label, badge support
- **`TabPanel`** – Content panel associated with a tab

## Features

✅ All MUI Tabs variants: basic, scrollable, centered, full-width, vertical  
✅ Icon and badge support  
✅ Keyboard navigation (Arrow keys, Home, End, Escape)  
✅ Full ARIA accessibility  
✅ Token.css color integration (no hardcoded colors)  
✅ Responsive and mobile-friendly  
✅ Controlled and uncontrolled modes  
✅ TypeScript support  

## Props Reference

### Tabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | HTML id attribute |
| `className` | string | '' | Additional CSS classes |
| `value` | string \| number | - | Controlled tab value |
| `defaultValue` | string \| number | 0 | Initial tab value (uncontrolled) |
| `onChange` | (value) => void | - | Callback when tab changes |
| `disabled` | boolean | false | Disable all tabs |
| `variant` | 'basic' \| 'scrollable' \| 'centered' \| 'full-width' \| 'vertical' \| 'vertical-centered' | 'basic' | Tab layout style |
| `size` | 'small' \| 'medium' \| 'large' | 'medium' | Padding and font size |
| `children` | ReactNode | - | Tab and TabPanel components |
| `aria-label` | string | - | Screen reader label |
| `aria-labelledby` | string | - | ID of labeling element |
| `aria-describedby` | string | - | ID of description element |
| `aria-orientation` | 'horizontal' \| 'vertical' | auto | Keyboard navigation direction |

### Tab Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | HTML id attribute |
| `value` | string \| number | - | **Required**. Unique tab identifier |
| `label` | ReactNode | - | Tab button text |
| `children` | ReactNode | - | Tab button content (alternative to `label`) |
| `disabled` | boolean | false | Disable this tab |
| `icon` | ReactNode | - | Icon element (rendered before label) |
| `badge` | string \| number | - | Badge number/text |
| `className` | string | '' | Additional CSS classes |
| `tabIndex` | number | 0 | Keyboard tab index |
| `onClick` | (e) => void | - | Click handler |
| `onFocus` | (e) => void | - | Focus handler |
| `onBlur` | (e) => void | - | Blur handler |
| `tooltip` | string | - | Hover tooltip text |
| `aria-label` | string | - | Screen reader label |
| `aria-labelledby` | string | - | ID of labeling element |
| `aria-describedby` | string | - | ID of description element |

### TabPanel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | HTML id attribute |
| `value` | string \| number | - | **Required**. Must match corresponding Tab `value` |
| `className` | string | '' | Additional CSS classes |
| `children` | ReactNode | - | Panel content |
| `aria-label` | string | - | Screen reader label |
| `aria-labelledby` | string | - | ID of labeling element |
| `aria-describedby` | string | - | ID of description element |

## Variants

### Basic Tabs (Default)

```tsx
<Tabs defaultValue={0}>
  <Tab value={0} label="Tab 1" />
  <Tab value={1} label="Tab 2" />
  <Tab value={2} label="Tab 3" />
</Tabs>

<TabPanel value={0}>Content 1</TabPanel>
<TabPanel value={1}>Content 2</TabPanel>
<TabPanel value={2}>Content 3</TabPanel>
```

### Scrollable Tabs

Tabs scroll horizontally when space is tight.

```tsx
<Tabs variant="scrollable">
  <Tab value={0} label="Tab 1" />
  <Tab value={1} label="Tab 2" />
  {/* More tabs... */}
</Tabs>
```

### Centered Tabs

Tabs centered with flexbox.

```tsx
<Tabs variant="centered">
  <Tab value={0} label="Tab 1" />
  <Tab value={1} label="Tab 2" />
  <Tab value={2} label="Tab 3" />
</Tabs>
```

### Full-Width Tabs

Each tab takes equal width.

```tsx
<Tabs variant="full-width">
  <Tab value={0} label="Tab 1" />
  <Tab value={1} label="Tab 2" />
  <Tab value={2} label="Tab 3" />
</Tabs>
```

### Vertical Tabs

Tabs arranged vertically.

```tsx
<div className="flex gap-4">
  <Tabs variant="vertical" defaultValue={0}>
    <Tab value={0} label="Tab 1" />
    <Tab value={1} label="Tab 2" />
    <Tab value={2} label="Tab 3" />
  </Tabs>

  <div className="flex-1">
    <TabPanel value={0}>Content 1</TabPanel>
    <TabPanel value={1}>Content 2</TabPanel>
    <TabPanel value={2}>Content 3</TabPanel>
  </div>
</div>
```

### Icon Tabs

Add icons to tabs.

```tsx
<Tabs variant="basic">
  <Tab value={0} icon={<HomeIcon />} label="Home" />
  <Tab value={1} icon={<FavsIcon />} label="Favorites" />
  <Tab value={2} icon={<SettingsIcon />} label="Settings" />
</Tabs>
```

### Tabs with Badges

Add notification badges.

```tsx
<Tabs variant="basic">
  <Tab value={0} label="Inbox" badge={5} />
  <Tab value={1} label="Starred" badge={2} />
  <Tab value={2} label="Sent" />
</Tabs>
```

### Disabled Tabs

Disable individual tabs.

```tsx
<Tabs variant="basic">
  <Tab value={0} label="Tab 1" />
  <Tab value={1} label="Tab 2 (Disabled)" disabled />
  <Tab value={2} label="Tab 3" />
</Tabs>
```

### Sizes

Three size options: small, medium (default), large.

```tsx
<Tabs size="small">
  <Tab value={0} label="Small" />
</Tabs>

<Tabs size="medium">
  <Tab value={0} label="Medium" />
</Tabs>

<Tabs size="large">
  <Tab value={0} label="Large" />
</Tabs>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Left / Arrow Up` | Focus previous tab |
| `Arrow Right / Arrow Down` | Focus next tab |
| `Home` | Focus first tab |
| `End` | Focus last tab |
| `Escape` | Close (if applicable) |
| `Enter / Space` | Activate tab |

## Accessibility

The Tabs system includes full ARIA support:

- **`role="tablist"`** on Tabs container
- **`role="tab"`** on Tab buttons with `aria-selected`
- **`role="tabpanel"`** on TabPanel divs
- **`aria-controls`** linking tabs to panels
- **`aria-label` / `aria-labelledby` / `aria-describedby`** for descriptions
- **`aria-disabled`** for disabled tabs
- **`aria-orientation`** for vertical/horizontal indication
- **Keyboard navigation** with focus management
- **Focus indicators** with Tailwind ring utilities

## Token.css Integration

All colors use CSS variables from `src/styles/tokens.css`:

- **Border color**: `var(--color-primary-light)` 
- **Active text color**: `var(--color-primary)` 
- **Active border color**: `var(--color-primary)` 
- **Hover color**: `var(--color-primary)` 
- **Badge background**: `var(--color-error)` 
- **Disabled opacity**: 50%

No hardcoded colors — all fully configurable via tokens.

## Styling with TailwindCSS

Classes are applied dynamically based on:
- **Variant** (border-b, border-r, flex direction, etc.)
- **Size** (font-size, padding from tokens)
- **State** (selected, disabled, hover)

Example merged classes:
```
"inline-flex items-center gap-2 font-medium transition-colors ... border-b-2 text-[var(--color-primary)]"
```

## Controlled vs Uncontrolled

### Uncontrolled (Simple)

```tsx
<Tabs defaultValue={0}>
  <Tab value={0} label="Tab 1" />
  <Tab value={1} label="Tab 2" />
</Tabs>
```

### Controlled (Advanced)

```tsx
const [value, setValue] = useState(0);

<Tabs value={value} onChange={setValue}>
  <Tab value={0} label="Tab 1" />
  <Tab value={1} label="Tab 2" />
</Tabs>
```

## Complete Example

See `Tabs.stories.tsx` for 9 example components:
- `BasicTabsExample`
- `ScrollableTabsExample`
- `CenteredTabsExample`
- `FullWidthTabsExample`
- `VerticalTabsExample`
- `IconTabsExample`
- `BadgeTabsExample`
- `DisabledTabsExample`
- `SizesExample`
- `TabsDemoAll` (all variants combined)

## Installation / Usage

```tsx
import { Tabs, Tab, TabPanel } from '@/components/common/Tabs';

export function MyComponent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Tabs value={activeTab} onChange={setActiveTab} variant="full-width">
      <Tab value={0} label="Overview" />
      <Tab value={1} label="Details" />
      <Tab value={2} label="Comments" />

      <TabPanel value={0}>Overview content</TabPanel>
      <TabPanel value={1}>Details content</TabPanel>
      <TabPanel value={2}>Comments content</TabPanel>
    </Tabs>
  );
}
```

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Limitations & Future Enhancements

- Keyboard navigation callbacks (focus management) in progress
- Animations/transitions (fade, slide) planned
- Lazy-load TabPanel content option
- Custom indicator/underline component option

## Related Components

- `Button` – Used internally for Tab buttons
- `Snackbar` – Toast notifications
- `FileUpload` – File input component
