
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import LinearProgress from './LinearProgress';
import CircularProgress from './CircularProgress';
const LinearMeta: Meta<typeof LinearProgress> = {
  title: 'Common/Progress/LinearProgress',
  component: LinearProgress,
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the component',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100) for determinate variant',
      defaultValue: 50,
    },
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
      description: 'Progress variant type - determines animation and rendering style',
      defaultValue: 'determinate',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
      description: 'Color variant using design tokens',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: "Height of the progress bar - 'sm' (4px), 'md' (8px), 'lg' (12px)",
      defaultValue: 'md',
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
export default LinearMeta;
type LinearProgressStory = StoryObj<typeof LinearProgress>;
export const LinearDefault: LinearProgressStory = {
  args: {
    id: 'linear-default',
    value: 50,
    variant: 'determinate',
    color: 'primary',
    size: 'md',
    'aria-label': 'Linear progress indicator',
    'aria-valuetext': 'Progress: 50%',
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic determinate linear progress bar showing 50% completion.',
      },
    },
  },
};
export const LinearDeterminate: LinearProgressStory = {
  render: (args) => {
    const [value, setValue] = useState(40);
    return (
      <div style={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Linear Progress - Determinate
        </h3>
        <LinearProgress
          {...args}
          value={value}
          variant="determinate"
          aria-label="Linear progress indicator"
          aria-valuetext={`Progress: ${value}%`}
        />
        <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Value: {value}%
        </p>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ width: '100%', marginTop: '12px' }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Determinate progress bar showing actual progress percentage. Includes an interactive slider to adjust the progress value in real-time.',
      },
    },
  },
};
export const LinearIndeterminate: LinearProgressStory = {
  args: {
    id: 'linear-indeterminate',
    variant: 'indeterminate',
    color: 'primary',
    size: 'md',
    'aria-label': 'Linear progress loading indicator',
    'aria-valuetext': 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Indeterminate progress bar with animated loading state. No specific value is indicated; used for indefinite loading scenarios.',
      },
    },
  },
};
export const LinearColors: LinearProgressStory = {
  render: (args) => {
    const colors: Array<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = [
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ];
    return (
      <div style={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Linear Progress - Color Variants
        </h3>
        {colors.map((color) => (
          <div key={color} style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              {color}
            </p>
            <LinearProgress
              {...args}
              id={`linear-${color}`}
              color={color}
              variant="determinate"
              value={60}
              aria-label={`Linear progress in ${color} color`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Linear progress bars using all available color variants from the design token system.',
      },
    },
  },
};
export const LinearSizes: LinearProgressStory = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '600px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h3 style={{ marginBottom: '0', fontSize: '14px', fontWeight: '600' }}>
        Linear Progress - Sizes
      </h3>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
          Small (4px)
        </p>
        <LinearProgress
          {...args}
          id="linear-sm"
          size="sm"
          variant="determinate"
          value={70}
          aria-label="Small linear progress"
        />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
          Medium (8px)
        </p>
        <LinearProgress
          {...args}
          id="linear-md"
          size="md"
          variant="determinate"
          value={70}
          aria-label="Medium linear progress"
        />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
          Large (12px)
        </p>
        <LinearProgress
          {...args}
          id="linear-lg"
          size="lg"
          variant="determinate"
          value={70}
          aria-label="Large linear progress"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Linear progress bars in different sizes: small (4px), medium (8px), and large (12px).',
      },
    },
  },
};
export const CircularMeta: Meta<typeof CircularProgress> = {
  title: 'Common/Progress/CircularProgress',
  component: CircularProgress,
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the component',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100) for determinate variant',
      defaultValue: 50,
    },
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description:
        "Progress variant - 'determinate' shows actual value, 'indeterminate' shows animated loading",
      defaultValue: 'determinate',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
      description: 'Color variant using design tokens',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: "Size of the circular progress - 'sm' (24px), 'md' (40px), 'lg' (56px)",
      defaultValue: 'md',
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
    layout: 'centered',
  },
};
type CircularProgressStory = StoryObj<typeof CircularProgress>;
export const CircularDefault: CircularProgressStory = {
  args: {
    id: 'circular-default',
    value: 50,
    variant: 'determinate',
    color: 'primary',
    size: 'md',
    'aria-label': 'Circular progress indicator',
    'aria-valuetext': 'Progress: 50%',
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic determinate circular progress indicator showing 50% completion.',
      },
    },
  },
};
export const CircularDeterminate: CircularProgressStory = {
  render: (args) => {
    const [value, setValue] = useState(60);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '16px' }}>
        <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '600' }}>
          Circular Progress - Determinate
        </h3>
        <CircularProgress
          {...args}
          value={value}
          variant="determinate"
          aria-label="Circular progress indicator"
          aria-valuetext={`Progress: ${value}%`}
        />
        <p style={{ margin: '0', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Value: {value}%
        </p>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ width: '192px' }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Determinate circular progress indicator showing actual progress percentage. Includes an interactive slider to adjust the progress value in real-time.',
      },
    },
  },
};
export const CircularIndeterminate: CircularProgressStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '16px' }}>
      <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '600' }}>
        Circular Progress - Indeterminate
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <CircularProgress
          {...args}
          id="circular-indeterminate-1"
          variant="indeterminate"
          color="primary"
          aria-label="Circular progress loading indicator primary"
          aria-valuetext="Loading..."
        />
        <CircularProgress
          {...args}
          id="circular-indeterminate-2"
          variant="indeterminate"
          color="secondary"
          aria-label="Circular progress loading indicator secondary"
          aria-valuetext="Loading..."
        />
        <CircularProgress
          {...args}
          id="circular-indeterminate-3"
          variant="indeterminate"
          color="success"
          aria-label="Circular progress loading indicator success"
          aria-valuetext="Loading..."
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Indeterminate circular progress indicators with animated loading state. Multiple color variants shown in a single view.',
      },
    },
  },
};
export const CircularColors: CircularProgressStory = {
  render: (args) => {
    const colors: Array<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = [
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '16px' }}>
        <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '600' }}>
          Circular Progress - Color Variants
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          {colors.map((color) => (
            <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <p style={{ margin: '0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                {color}
              </p>
              <CircularProgress
                {...args}
                id={`circular-${color}`}
                color={color}
                variant="determinate"
                value={75}
                aria-label={`Circular progress in ${color} color`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Circular progress indicators using all available color variants from the design token system.',
      },
    },
  },
};
export const CircularSizes: CircularProgressStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '16px' }}>
      <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '600' }}>
        Circular Progress - Sizes
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ margin: '0', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Small (24px)
          </p>
          <CircularProgress
            {...args}
            id="circular-sm"
            size="sm"
            variant="determinate"
            value={65}
            aria-label="Small circular progress"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ margin: '0', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Medium (40px)
          </p>
          <CircularProgress
            {...args}
            id="circular-md"
            size="md"
            variant="determinate"
            value={65}
            aria-label="Medium circular progress"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ margin: '0', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Large (56px)
          </p>
          <CircularProgress
            {...args}
            id="circular-lg"
            size="lg"
            variant="determinate"
            value={65}
            aria-label="Large circular progress"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Circular progress indicators in different sizes: small (24px), medium (40px), and large (56px).',
      },
    },
  },
};

