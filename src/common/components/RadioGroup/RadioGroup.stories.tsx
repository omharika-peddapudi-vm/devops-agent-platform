
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from './RadioGroup';
const meta: Meta<typeof RadioGroup> = {
  title: 'Common/RadioGroup',
  component: RadioGroup,
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the component',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the radio group',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: "Size of the radio group - 'sm' (small), 'md' (medium), 'lg' (large)",
      defaultValue: 'md',
    },
    required: {
      control: 'boolean',
      description: 'Indicates if this radio group is required',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all radio buttons in the group',
      defaultValue: false,
    },
    error: {
      control: 'boolean',
      description: 'Shows error state styling',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
    'aria-orientation': {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the radio group',
      defaultValue: 'vertical',
    },
  },
  parameters: {
    layout: 'padded',
  },
};
export default meta;
type RadioGroupStory = StoryObj<typeof RadioGroup>;
export const Default: RadioGroupStory = {
  args: {
    id: 'radio-default',
    label: 'Choose an option',
    size: 'md',
    required: false,
    disabled: false,
    error: false,
    'aria-orientation': 'vertical',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="options" value="option1" defaultChecked />
        Option 1
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="options" value="option2" />
        Option 2
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="options" value="option3" />
        Option 3
      </label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic radio group with three options and a label.',
      },
    },
  },
};
export const Sizes: RadioGroupStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <RadioGroup {...args} label="Small (sm)" size="sm">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="size-sm" value="option1" defaultChecked />
          Small option 1
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="size-sm" value="option2" />
          Small option 2
        </label>
      </RadioGroup>
      <RadioGroup {...args} label="Medium (md)" size="md">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="size-md" value="option1" defaultChecked />
          Medium option 1
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="size-md" value="option2" />
          Medium option 2
        </label>
      </RadioGroup>
      <RadioGroup {...args} label="Large (lg)" size="lg">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="size-lg" value="option1" defaultChecked />
          Large option 1
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="size-lg" value="option2" />
          Large option 2
        </label>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio groups in different sizes: small (sm), medium (md), and large (lg).',
      },
    },
  },
};
export const Disabled: RadioGroupStory = {
  args: {
    label: 'Disabled options',
    size: 'md',
    disabled: true,
    'aria-orientation': 'vertical',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="disabled-options" value="option1" disabled defaultChecked />
        Option 1 (disabled)
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="disabled-options" value="option2" disabled />
        Option 2 (disabled)
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="disabled-options" value="option3" disabled />
        Option 3 (disabled)
      </label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A radio group in disabled state where all radio buttons are disabled.',
      },
    },
  },
};
export const Error: RadioGroupStory = {
  args: {
    label: 'Select a valid option',
    size: 'md',
    error: true,
    'aria-describedby': 'error-message',
    'aria-orientation': 'vertical',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <RadioGroup {...args}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="error-options" value="option1" />
          Option 1
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="error-options" value="option2" />
          Option 2
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name="error-options" value="option3" />
          Option 3
        </label>
      </RadioGroup>
      <p
        id="error-message"
        style={{
          color: 'var(--color-error)',
          fontSize: 'var(--font-size-sm)',
          margin: '4px 0 0 0',
        }}
      >
        Please select an option
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A radio group showing error state with visual feedback.',
      },
    },
  },
};
export const Required: RadioGroupStory = {
  args: {
    label: 'Choose an option',
    size: 'md',
    required: true,
    'aria-orientation': 'vertical',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="required-options" value="option1" />
        Option 1
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="required-options" value="option2" />
        Option 2
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="radio" name="required-options" value="option3" />
        Option 3
      </label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A radio group marked as required with an asterisk (*) indicator.',
      },
    },
  },
};
export const Horizontal: RadioGroupStory = {
  args: {
    label: 'Select one',
    size: 'md',
    'aria-orientation': 'horizontal',
  },
  render: (args) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      gap: '24px',
      alignItems: 'flex-start',
    };
    const groupStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      gap: '12px',
      alignItems: 'center',
    };
    return (
      <div style={containerStyle}>
        <RadioGroup {...args} style={groupStyle}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <input type="radio" name="horizontal-options" value="option1" defaultChecked />
            Option 1
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <input type="radio" name="horizontal-options" value="option2" />
            Option 2
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <input type="radio" name="horizontal-options" value="option3" />
            Option 3
          </label>
        </RadioGroup>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A radio group with horizontal orientation for side-by-side option display.',
      },
    },
  },
};
export const Controlled: RadioGroupStory = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioGroup {...args} label="Select your preference">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="radio"
              name="controlled-options"
              value="option1"
              checked={selectedValue === 'option1'}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            Option 1
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="radio"
              name="controlled-options"
              value="option2"
              checked={selectedValue === 'option2'}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            Option 2
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="radio"
              name="controlled-options"
              value="option3"
              checked={selectedValue === 'option3'}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            Option 3
          </label>
        </RadioGroup>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          Selected value: <strong>{selectedValue}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A radio group with controlled state that displays the selected value in real-time.',
      },
    },
  },
};

