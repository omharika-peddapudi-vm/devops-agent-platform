import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import TextField from './TextField';
const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};
export default meta;
export const Default = () => (
  <TextField label="Text Field" placeholder="Enter text" />
);
export const SizeSmall = () => (
  <TextField label="Small TextField" size="sm" placeholder="Small input" />
);
export const SizeMedium = () => (
  <TextField label="Medium TextField" size="md" placeholder="Medium input" />
);
export const SizeLarge = () => (
  <TextField label="Large TextField" size="lg" placeholder="Large input" />
);
export const VariantDefault = () => (
  <TextField label="Default Variant" variant="default" placeholder="Default style" />
);
export const VariantOutlined = () => (
  <TextField label="Outlined Variant" variant="outlined" placeholder="Outlined style" />
);
export const VariantFilled = () => (
  <TextField label="Filled Variant" variant="filled" placeholder="Filled style" />
);
export const Disabled = () => (
  <TextField 
    label="Disabled TextField" 
    disabled 
    placeholder="Cannot edit"
    value="Disabled state"
  />
);
export const ReadOnly = () => (
  <TextField 
    label="Read-only TextField" 
    readOnly 
    placeholder="Read-only"
    value="Cannot modify"
  />
);
export const WithError = () => (
  <TextField 
    label="Username" 
    placeholder="Enter username"
    error="Username is required"
    aria-invalid={true}
  />
);
export const Required = () => (
  <TextField 
    label="Required Field" 
    placeholder="This field is required"
    required={true}
    aria-required={true}
  />
);
export const WithStartDecorator = () => {
  const emailIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
  return (
    <TextField 
      label="Email" 
      type="email"
      placeholder="user@example.com"
      startDecorator={emailIcon}
    />
  );
};
export const WithEndDecorator = () => {
  const clearIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
  return (
    <TextField 
      label="Searchable" 
      placeholder="Type to search..."
      endDecorator={clearIcon}
    />
  );
};
export const WithBothDecorators = () => {
  const lockIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
  const eyeIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  return (
    <TextField 
      label="Password" 
      type="password"
      placeholder="Enter password"
      startDecorator={lockIcon}
      endDecorator={eyeIcon}
    />
  );
};
export const TypeEmail = () => (
  <TextField 
    label="Email Address" 
    type="email"
    placeholder="name@example.com"
  />
);
export const TypePassword = () => (
  <TextField 
    label="Password" 
    type="password"
    placeholder="Enter your password"
  />
);
export const TypeNumber = () => (
  <TextField 
    label="Phone Number" 
    type="number"
    placeholder="123-456-7890"
  />
);
export const Interactive = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue.length > 0 && newValue.length < 3) {
      setError('Must be at least 3 characters');
    } else {
      setError('');
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <TextField 
        label="Interactive Field" 
        placeholder="Type at least 3 characters"
        value={value}
        onChange={handleChange}
        error={error}
        aria-invalid={error ? true : false}
      />
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
        Current value: <strong>{value || '(empty)'}</strong>
      </p>
      {error && (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-error)' }}>
          Error: {error}
        </p>
      )}
    </div>
  );
};
export const AllSizeVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    <TextField label="Small Size" size="sm" placeholder="Small" />
    <TextField label="Medium Size" size="md" placeholder="Medium" />
    <TextField label="Large Size" size="lg" placeholder="Large" />
  </div>
);
export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    <TextField label="Default" variant="default" placeholder="Default variant" />
    <TextField label="Outlined" variant="outlined" placeholder="Outlined variant" />
    <TextField label="Filled" variant="filled" placeholder="Filled variant" />
  </div>
);
export const Comprehensive = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    <TextField 
      label="Name" 
      size="md"
      variant="outlined"
      placeholder="Enter your full name"
      required
    />
    <TextField 
      label="Email" 
      type="email"
      size="md"
      variant="outlined"
      placeholder="you@example.com"
      required
      startDecorator={
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      }
    />
    <TextField 
      label="Comments" 
      size="md"
      variant="filled"
      placeholder="Add your comments (optional)"
    />
  </div>
);

