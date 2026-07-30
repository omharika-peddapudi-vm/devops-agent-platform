import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AutoComplete from './AutoComplete';
const meta: Meta<typeof AutoComplete> = {
  title: 'Common/AutoComplete',
  component: AutoComplete,
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div style={{ maxWidth: '400px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
    'aria-invalid': {
      control: 'boolean',
    },
    'aria-required': {
      control: 'boolean',
    },
    'aria-label': {
      control: 'text',
    },
    options: {
      control: false,
    },
    onChange: {
      action: 'changed',
    },
    onSelect: {
      action: 'selected',
    },
    onFocus: {
      action: 'focused',
    },
    onBlur: {
      action: 'blurred',
    },
  },
};
export default meta;
type Story = StoryObj<typeof AutoComplete>;
const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
];
const countriesData = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Japan', value: 'JP' },
  { label: 'India', value: 'IN' },
  { label: 'Brazil', value: 'BR' },
  { label: 'Mexico', value: 'MX' },
];
export const Default: Story = {
  args: {
    placeholder: 'Select a programming language...',
    options: programmingLanguages,
    size: 'md',
  },
};
export const Small: Story = {
  args: {
    placeholder: 'Small size',
    options: programmingLanguages,
    size: 'sm',
  },
};
export const Large: Story = {
  args: {
    placeholder: 'Large size',
    options: programmingLanguages,
    size: 'lg',
  },
};
export const WithObjectOptions: Story = {
  args: {
    placeholder: 'Select a country...',
    options: countriesData,
    size: 'md',
  },
};
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    options: programmingLanguages,
    disabled: true,
    size: 'md',
  },
};
export const ReadOnly: Story = {
  args: {
    value: 'JavaScript',
    placeholder: 'Read-only input',
    options: programmingLanguages,
    readOnly: true,
    size: 'md',
  },
};
export const Required: Story = {
  args: {
    placeholder: 'Select a language (required)',
    options: programmingLanguages,
    required: true,
    'aria-required': true,
    'aria-label': 'Programming language selection',
    size: 'md',
  },
};
export const Invalid: Story = {
  args: {
    placeholder: 'Invalid input',
    value: 'Invalid',
    options: programmingLanguages,
    'aria-invalid': true,
    'aria-describedby': 'error-message',
    size: 'md',
  },
};
export const AutoFocused: Story = {
  args: {
    placeholder: 'Auto-focused input',
    options: programmingLanguages,
    autoFocus: true,
    size: 'md',
  },
};
export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Search programming languages',
    placeholder: 'Search...',
    options: programmingLanguages,
    size: 'md',
  },
};
export const ManyOptions: Story = {
  args: {
    placeholder: 'Select from many options...',
    options: Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`),
    size: 'md',
  },
};
export const ControlledValue: Story = {
  args: {
    value: 'TypeScript',
    placeholder: 'Controlled value',
    options: programmingLanguages,
    size: 'md',
  },
};
export const Interactive: Story = {
  args: {
    placeholder: 'Type to search languages...',
    options: programmingLanguages,
    size: 'md',
    'aria-label': 'Search and select programming language',
  },
  render: (args) => {
    const [selected, setSelected] = React.useState('');
    return (
      <div>
        <AutoComplete
          {...args}
          value={selected}
          onChange={(_, value) => {
            console.log('Input changed:', value);
            setSelected(value);
          }}
          onSelect={(option) => {
            console.log('Option selected:', option);
            setSelected(option.label);
          }}
        />
        {selected && (
          <p className="mt-4 text-sm text-gray-600">
            Selected: <strong>{selected}</strong>
          </p>
        )}
      </div>
    );
  },
};

