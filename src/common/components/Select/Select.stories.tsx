import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Common/Select',
  component: Select,
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the select element',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the select',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: "Size variant - 'sm' (small), 'md' (medium), 'lg' (large)",
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: "Visual variant - 'outlined', 'filled', 'standard'",
      defaultValue: 'outlined',
    },
    isRequired: {
      control: 'boolean',
      description: 'Indicates if selection is required',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select element',
      defaultValue: false,
    },
    hasError: {
      control: 'boolean',
      description: 'Shows error state styling',
      defaultValue: false,
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display below the select',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
  parameters: {
    layout: 'padded',
  },
};
export default meta;
type SelectStory = StoryObj<typeof Select>;
export const Default: SelectStory = {
  args: {
    id: 'select-default',
    label: 'Choose an option',
    size: 'md',
    variant: 'outlined',
    isRequired: false,
    disabled: false,
    hasError: false,
  },
  render: args => (
    <div style={{ maxWidth: '300px' }}>
      <Select {...args}>
        <option value=''>Select...</option>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
        <option value='3'>Option 3</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic select dropdown with three options.',
      },
    },
  },
};
export const Controlled: SelectStory = {
  render: args => {
    const [val, setVal] = useState<string | number>('2');
    return (
      <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Select
          {...args}
          label='Controlled Select'
          value={val}
          onChange={e => setVal(e.target.value)}
        >
          <option value='1'>One</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
        </Select>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)',
          }}
        >
          Selected: <strong>{val}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A select with controlled state that displays the selected value in real-time.',
      },
    },
  },
};
export const Disabled: SelectStory = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    defaultValue: '1',
  },
  render: args => (
    <div style={{ maxWidth: '300px' }}>
      <Select {...args}>
        <option value='1'>One</option>
        <option value='2'>Two</option>
        <option value='3'>Three</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A disabled select where user interaction is prevented.',
      },
    },
  },
};
export const Error: SelectStory = {
  args: {
    label: 'Select with Error',
    hasError: true,
    errorMessage: 'This field is required',
    defaultValue: '',
  },
  render: args => (
    <div style={{ maxWidth: '300px' }}>
      <Select {...args}>
        <option value=''>Select...</option>
        <option value='1'>One</option>
        <option value='2'>Two</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A select showing error state with validation message.',
      },
    },
  },
};
export const Required: SelectStory = {
  args: {
    label: 'Required Field',
    isRequired: true,
    defaultValue: '',
  },
  render: args => (
    <div style={{ maxWidth: '300px' }}>
      <Select {...args}>
        <option value=''>Select...</option>
        <option value='1'>Option A</option>
        <option value='2'>Option B</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A required select with asterisk (*) indicator.',
      },
    },
  },
};
export const Sizes: SelectStory = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '300px' }}>
      <Select {...args} label='Small (sm)' size='sm' defaultValue='1'>
        <option value='1'>Small One</option>
        <option value='2'>Small Two</option>
      </Select>
      <Select {...args} label='Medium (md)' size='md' defaultValue='1'>
        <option value='1'>Medium One</option>
        <option value='2'>Medium Two</option>
      </Select>
      <Select {...args} label='Large (lg)' size='lg' defaultValue='1'>
        <option value='1'>Large One</option>
        <option value='2'>Large Two</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select elements in different sizes: small (sm), medium (md), and large (lg).',
      },
    },
  },
};
export const Variants: SelectStory = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '300px' }}>
      <Select {...args} label='Outlined Variant' variant='outlined' defaultValue='1'>
        <option value='1'>Outlined One</option>
        <option value='2'>Outlined Two</option>
      </Select>
      <Select {...args} label='Filled Variant' variant='filled' defaultValue='1'>
        <option value='1'>Filled One</option>
        <option value='2'>Filled Two</option>
      </Select>
      <Select {...args} label='Standard Variant' variant='standard' defaultValue='1'>
        <option value='1'>Standard One</option>
        <option value='2'>Standard Two</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Select elements with different visual variants: 'outlined', 'filled', and 'standard'.",
      },
    },
  },
};
export const WithLongOptions: SelectStory = {
  render: args => (
    <div style={{ maxWidth: '400px' }}>
      <Select {...args} label='Select a country' defaultValue=''>
        <option value=''>Choose a country...</option>
        <option value='us'>United States of America</option>
        <option value='uk'>United Kingdom</option>
        <option value='au'>Australia</option>
        <option value='ca'>Canada</option>
        <option value='nz'>New Zealand</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A select with long option labels demonstrating proper text handling.',
      },
    },
  },
};
export const Combined: SelectStory = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ maxWidth: '300px' }}>
        <h4
          style={{
            margin: '0 0 12px 0',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
          Small + Outlined
        </h4>
        <Select {...args} label='Size: sm' size='sm' variant='outlined' defaultValue='1'>
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </Select>
      </div>
      <div style={{ maxWidth: '300px' }}>
        <h4
          style={{
            margin: '0 0 12px 0',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
          Medium + Filled
        </h4>
        <Select {...args} label='Size: md' size='md' variant='filled' defaultValue='1'>
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </Select>
      </div>
      <div style={{ maxWidth: '300px' }}>
        <h4
          style={{
            margin: '0 0 12px 0',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
          Large + Standard
        </h4>
        <Select {...args} label='Size: lg' size='lg' variant='standard' defaultValue='1'>
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select elements showing various combinations of sizes and variants.',
      },
    },
  },
};
