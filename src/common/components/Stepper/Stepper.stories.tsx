import { useState } from 'react';

import Typography from '../Typography/Typography';
import StepContent from './StepContent';
import Stepper from './Stepper';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { StepperStep } from './Stepper';
const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['linear', 'non-linear'],
      description: 'Determines if steps must be completed in order',
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of steps',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of step indicators',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'Color variant using design tokens',
    },
    value: {
      control: { type: 'number' },
      description: 'Current active step (controlled)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable all interactions',
    },
  },
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const HorizontalLinear: Story = {
  args: {
    steps: [
      { label: 'Account', description: 'Create your account' },
      { label: 'Profile', description: 'Complete your profile' },
      { label: 'Confirmation', description: 'Confirm details' },
    ],
    value: 0,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(0);
    const steps: StepperStep[] = [
      { label: 'Account', description: 'Create your account' },
      { label: 'Profile', description: 'Complete your profile' },
      { label: 'Confirmation', description: 'Confirm details' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Horizontal Linear Stepper</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Use arrow keys or click steps to navigate. Linear type requires sequential progress.
          </p>
        </div>
        <Stepper
          id='horizontal-linear'
          steps={steps}
          value={active}
          type='linear'
          orientation='horizontal'
          onClick={setActive}
          aria-label='Account setup wizard'
          aria-live='polite'
        />
      </div>
    );
  },
};
export const HorizontalNonLinear: Story = {
  args: {
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }, { label: 'Step 4' }],
    value: 0,
    type: 'non-linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(0);
    const steps: StepperStep[] = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
      { label: 'Step 4' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Horizontal Non-Linear Stepper</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Non-linear type allows jumping to any step without restrictions.
          </p>
        </div>
        <Stepper
          id='horizontal-nonlinear'
          steps={steps}
          value={active}
          type='non-linear'
          orientation='horizontal'
          onClick={setActive}
          aria-label='Free navigation stepper'
        />
      </div>
    );
  },
};
export const VerticalStepper: Story = {
  args: {
    steps: [
      { label: 'Select Campaign', description: 'Choose campaign settings' },
      { label: 'Create Ad Group', description: 'Set up ad group' },
      { label: 'Create Ads', description: 'Design your ads' },
    ],
    value: 0,
    type: 'linear',
    orientation: 'vertical',
  },
  render: () => {
    const [active, setActive] = useState(0);
    const steps: StepperStep[] = [
      { label: 'Select Campaign', description: 'Choose campaign settings' },
      { label: 'Create Ad Group', description: 'Set up ad group' },
      { label: 'Create Ads', description: 'Design your ads' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Vertical Stepper</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Vertical layout is useful for step-by-step wizards.
          </p>
        </div>
        <Stepper
          id='vertical-stepper'
          steps={steps}
          value={active}
          type='linear'
          orientation='vertical'
          onClick={setActive}
          aria-label='Vertical wizard'
        />
      </div>
    );
  },
};
export const AlternativeLabels: Story = {
  args: {
    steps: [
      { label: 'Select master blaster campaign settings' },
      { label: 'Create an ad group' },
      { label: 'Create ads' },
    ],
    value: 0,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(0);
    const steps: StepperStep[] = [
      { label: 'Select master blaster campaign settings' },
      { label: 'Create an ad group' },
      { label: 'Create ads' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
            Stepper with Alternative Labels
          </h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Labels appear below step indicators instead of to the side.
          </p>
        </div>
        <Stepper
          id='alternative-labels'
          steps={steps}
          value={active}
          type='linear'
          orientation='horizontal'
          onClick={setActive}
          aria-label='Stepper with alternative label placement'
        />
      </div>
    );
  },
};
export const CompletedSteps: Story = {
  args: {
    steps: [
      { label: 'Step 1', description: 'Completed', completed: true },
      { label: 'Step 2', description: 'Completed', completed: true },
      { label: 'Step 3', description: 'In Progress' },
    ],
    value: 2,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(2);
    const steps: StepperStep[] = [
      { label: 'Step 1', description: 'Completed', completed: true },
      { label: 'Step 2', description: 'Completed', completed: true },
      { label: 'Step 3', description: 'In Progress' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Stepper with Completed Steps</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Completed steps display checkmarks instead of numbers.
          </p>
        </div>
        <Stepper
          id='completed-steps'
          steps={steps}
          value={active}
          type='linear'
          orientation='horizontal'
          onClick={setActive}
          color='success'
          aria-label='Progress indicator with completed steps'
        />
      </div>
    );
  },
};
export const SizeVariants: Story = {
  args: {
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }],
    value: 1,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(1);
    const steps: StepperStep[] = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Stepper Size Variants</h3>
        </div>
        {(['sm', 'md', 'lg'] as const).map(size => (
          <div
            key={size}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
          >
            <p
              style={{
                margin: 0,
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              Size: {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
            </p>
            <Stepper
              id={`size-${size}`}
              steps={steps}
              value={active}
              size={size}
              type='linear'
              orientation='horizontal'
              onClick={setActive}
              aria-label={`${size} stepper`}
            />
          </div>
        ))}
      </div>
    );
  },
};
export const ColorVariants: Story = {
  args: {
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }],
    value: 1,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(1);
    const steps: StepperStep[] = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Stepper Color Variants</h3>
        </div>
        {(['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const).map(color => (
          <div
            key={color}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
          >
            <p
              style={{
                margin: 0,
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </p>
            <Stepper
              id={`color-${color}`}
              steps={steps}
              value={active}
              color={color}
              type='linear'
              orientation='horizontal'
              onClick={setActive}
              aria-label={`Stepper in ${color} color`}
            />
          </div>
        ))}
      </div>
    );
  },
};
export const DisabledSteps: Story = {
  args: {
    steps: [{ label: 'Step 1' }, { label: 'Step 2', disabled: true }, { label: 'Step 3' }],
    value: 0,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(0);
    const steps: StepperStep[] = [
      { label: 'Step 1', description: 'Enabled' },
      { label: 'Step 2', description: 'Disabled', disabled: true },
      { label: 'Step 3', description: 'Enabled' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Stepper with Disabled Steps</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Individual steps can be disabled to prevent navigation.
          </p>
        </div>
        <Stepper
          id='disabled-steps'
          steps={steps}
          value={active}
          type='non-linear'
          orientation='horizontal'
          onClick={setActive}
          aria-label='Stepper with disabled steps'
        />
      </div>
    );
  },
};
export const CustomIcons: Story = {
  args: {
    steps: [
      { label: 'Login', description: 'Sign in', icon: '🔐' },
      { label: 'Payment', description: 'Process payment', icon: '💳' },
      { label: 'Confirmation', description: 'Confirm order', icon: '✅' },
    ],
    value: 1,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(1);
    const steps: StepperStep[] = [
      { label: 'Login', description: 'Sign in', icon: '🔐' },
      { label: 'Payment', description: 'Process payment', icon: '💳' },
      { label: 'Confirmation', description: 'Confirm order', icon: '✅' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Stepper with Custom Icons</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Each step can display a custom icon instead of a number.
          </p>
        </div>
        <Stepper
          id='custom-icons'
          steps={steps}
          value={active}
          type='linear'
          orientation='horizontal'
          onClick={setActive}
          color='success'
          aria-label='Stepper with custom icons'
        />
      </div>
    );
  },
};
export const KeyboardNavigation: Story = {
  args: {
    steps: [
      { label: 'Step 1', description: 'Use arrow keys to navigate' },
      { label: 'Step 2', description: 'Left/Right arrows move steps' },
      { label: 'Step 3', description: 'Home/End go to first/last' },
      { label: 'Step 4', description: 'All controls accessible' },
    ],
    value: 0,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [active, setActive] = useState(0);
    const steps: StepperStep[] = [
      { label: 'Step 1', description: 'Use arrow keys to navigate' },
      { label: 'Step 2', description: 'Left/Right arrows move steps' },
      { label: 'Step 3', description: 'Home/End go to first/last' },
      { label: 'Step 4', description: 'All controls accessible' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Keyboard Navigation</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            ⌨️ Try: Arrow Keys • Home • End • Tab
          </p>
        </div>
        <Stepper
          id='keyboard-nav'
          steps={steps}
          value={active}
          type='linear'
          orientation='horizontal'
          onClick={setActive}
          aria-label='Keyboard navigable stepper'
          aria-live='assertive'
        />
      </div>
    );
  },
};
export const ControlledStepper: Story = {
  args: {
    steps: [{ label: 'Personal Info' }, { label: 'Shipping' }, { label: 'Payment' }],
    value: 0,
    type: 'linear',
    orientation: 'horizontal',
  },
  render: () => {
    const [step, setStep] = useState(0);
    const steps: StepperStep[] = [
      { label: 'Personal Info' },
      { label: 'Shipping' },
      { label: 'Payment' },
    ];
    const handleNext = () => {
      setStep(prev => Math.min(prev + 1, steps.length - 1));
    };
    const handlePrev = () => {
      setStep(prev => Math.max(prev - 1, 0));
    };
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Controlled Stepper</h3>
          <p
            style={{
              margin: 'var(--space-2) 0 0 0',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Step state is managed externally with navigation buttons.
          </p>
        </div>
        <Stepper
          id='controlled-stepper'
          steps={steps}
          value={step}
          type='linear'
          orientation='horizontal'
          color='primary'
          aria-label='Controlled stepper'
        />
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={handlePrev}
            disabled={step === 0}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--bg-muted)',
              color: 'var(--text-primary)',
              border: `1px solid var(--border-color)`,
              borderRadius: 'var(--radius-md)',
              cursor: step === 0 ? 'var(--cursor-disabled)' : 'pointer',
              opacity: step === 0 ? 'var(--opacity-disabled)' : 1,
              fontFamily: 'var(--font-family-sans)',
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={step === steps.length - 1}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: step === steps.length - 1 ? 'var(--cursor-disabled)' : 'pointer',
              opacity: step === steps.length - 1 ? 'var(--opacity-disabled)' : 1,
              fontFamily: 'var(--font-family-sans)',
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};
export const HorizontalLinearInteractive = () => {
  const [active, setActive] = useState(0);
  const steps: StepperStep[] = [
    { label: 'Account', description: 'Create your account', content: 'Account setup form' },
    { label: 'Profile', description: 'Complete your profile', content: 'Profile information form' },
    { label: 'Confirmation', description: 'Confirm details', content: 'Review and confirm' },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Horizontal Linear Stepper</Typography>
        <Typography variant='body2' color='textSecondary'>
          Use arrow keys or click steps to navigate. Linear type requires sequential progress.
        </Typography>
      </div>
      <Stepper
        id='horizontal-linear'
        steps={steps}
        activeStep={active}
        type='linear'
        orientation='horizontal'
        value={active}
        onClick={setActive}
        aria-label='Account setup wizard'
        aria-live='polite'
      />
      <StepContent>{steps[active].content}</StepContent>
    </div>
  );
};
export const HorizontalNonLinearDemo = () => {
  const [active, setActive] = useState(0);
  const steps: StepperStep[] = [
    { label: 'Step 1', description: 'First step', content: 'Content for step 1' },
    { label: 'Step 2', description: 'Second step', content: 'Content for step 2' },
    { label: 'Step 3', description: 'Third step', content: 'Content for step 3' },
    { label: 'Step 4', description: 'Fourth step', content: 'Content for step 4' },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Horizontal Non-Linear Stepper</Typography>
        <Typography variant='body2' color='textSecondary'>
          Non-linear type allows jumping to any step without restrictions.
        </Typography>
      </div>
      <Stepper
        id='horizontal-nonlinear'
        steps={steps}
        activeStep={active}
        type='non-linear'
        orientation='horizontal'
        onClick={setActive}
        aria-label='Free navigation stepper'
      />
      <StepContent>{steps[active].content}</StepContent>
    </div>
  );
};
export const VerticalStepperDemo = () => {
  const [active, setActive] = useState(0);
  const steps: StepperStep[] = [
    {
      label: 'Select Campaign',
      description: 'Choose campaign settings',
      content: 'Campaign selection form',
    },
    {
      label: 'Create an Ad Group',
      description: 'Set up ad group',
      content: 'Ad group creation form',
    },
    { label: 'Create Ads', description: 'Design your ads', content: 'Ad creation form' },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Vertical Stepper</Typography>
        <Typography variant='body2' color='textSecondary'>
          Vertical layout is useful for step-by-step wizards.
        </Typography>
      </div>
      <Stepper
        id='vertical-stepper'
        steps={steps}
        activeStep={active}
        type='linear'
        orientation='vertical'
        onClick={setActive}
        aria-label='Vertical wizard'
      />
      <div className='ml-12 p-4 bg-gray-50 rounded'>
        <StepContent>{steps[active].content}</StepContent>
      </div>
    </div>
  );
};
export const AlternativeLabelsDemo = () => {
  const [active, setActive] = useState(0);
  const steps: StepperStep[] = [
    { label: 'Select master blaster campaign settings', description: 'Step 1: Settings' },
    { label: 'Create an ad group', description: 'Step 2: Ad Group' },
    { label: 'Create ads', description: 'Step 3: Ads' },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Stepper with Alternative Labels</Typography>
        <Typography variant='body2' color='textSecondary'>
          Labels appear below step indicators instead of to the side.
        </Typography>
      </div>
      <Stepper
        id='alternative-labels'
        steps={steps}
        activeStep={active}
        type='linear'
        orientation='horizontal'
        onClick={setActive}
        aria-label='Stepper with alternative label placement'
      />
    </div>
  );
};
export const CompletedStepsDemo = () => {
  const [active, setActive] = useState(2);
  const steps: StepperStep[] = [
    { label: 'Step 1', description: 'Completed', completed: true },
    { label: 'Step 2', description: 'Completed', completed: true },
    { label: 'Step 3', description: 'In Progress' },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Stepper with Completed Steps</Typography>
        <Typography variant='body2' color='textSecondary'>
          Completed steps display checkmarks instead of numbers.
        </Typography>
      </div>
      <Stepper
        id='completed-steps'
        steps={steps}
        activeStep={active}
        type='linear'
        orientation='horizontal'
        onClick={setActive}
        color='success'
        aria-label='Progress indicator with completed steps'
      />
    </div>
  );
};
export const ColorVariantsDemo = () => {
  const [active, setActive] = useState(1);
  const steps: StepperStep[] = [
    { label: 'Step 1', description: 'First' },
    { label: 'Step 2', description: 'Second' },
    { label: 'Step 3', description: 'Third' },
  ];
  const colors: Array<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = [
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ];
  return (
    <div className='space-y-6 p-4'>
      <Typography variant='h6'>Stepper Color Variants</Typography>
      {colors.map(color => (
        <div key={color} className='space-y-2'>
          <Typography variant='body2' className='font-semibold'>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Typography>
          <Stepper
            id={`color-${color}`}
            steps={steps}
            activeStep={active}
            color={color}
            type='linear'
            orientation='horizontal'
            onClick={setActive}
            aria-label={`Stepper in ${color} color`}
          />
        </div>
      ))}
    </div>
  );
};
export const SizeVariantsDemo = () => {
  const [active, setActive] = useState(1);
  const steps: StepperStep[] = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];
  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
  return (
    <div className='space-y-8 p-4'>
      <Typography variant='h6'>Stepper Size Variants</Typography>
      {sizes.map(size => (
        <div key={size} className='space-y-2'>
          <Typography variant='body2' className='font-semibold'>
            {size.charAt(0).toUpperCase() + size.slice(1)} Size
          </Typography>
          <Stepper
            id={`size-${size}`}
            steps={steps}
            activeStep={active}
            size={size}
            type='linear'
            orientation='horizontal'
            onClick={setActive}
            aria-label={`${size} stepper`}
          />
        </div>
      ))}
    </div>
  );
};
export const DisabledStepsDemo = () => {
  const [active, setActive] = useState(0);
  const steps: StepperStep[] = [
    { label: 'Step 1', description: 'Enabled' },
    { label: 'Step 2', description: 'Disabled', disabled: true },
    { label: 'Step 3', description: 'Enabled' },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Stepper with Disabled Steps</Typography>
        <Typography variant='body2' color='textSecondary'>
          Individual steps can be disabled to prevent navigation to them.
        </Typography>
      </div>
      <Stepper
        id='disabled-steps'
        steps={steps}
        activeStep={active}
        type='non-linear'
        orientation='horizontal'
        onClick={setActive}
        aria-label='Stepper with disabled steps'
      />
    </div>
  );
};
export const ControlledStepperDemo = () => {
  const [step, setStep] = useState(0);
  const steps: StepperStep[] = [
    { label: 'Personal Info', content: 'Enter your name and email' },
    { label: 'Shipping', content: 'Enter your address' },
    { label: 'Payment', content: 'Enter payment details' },
  ];
  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, steps.length - 1));
  };
  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Controlled Stepper</Typography>
        <Typography variant='body2' color='textSecondary'>
          Step state is managed externally with next/previous buttons.
        </Typography>
      </div>
      <Stepper
        id='controlled-stepper'
        steps={steps}
        value={step}
        type='linear'
        orientation='horizontal'
        color='primary'
        aria-label='Controlled stepper with navigation'
      />
      <div className='space-y-4'>
        <StepContent>{steps[step].content}</StepContent>
        <div className='flex gap-4'>
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={step === steps.length - 1}
            className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export const CustomIconsDemo = () => {
  const [active, setActive] = useState(1);
  const steps: StepperStep[] = [
    {
      label: 'Login',
      description: 'Sign in to your account',
      icon: '🔐',
    },
    {
      label: 'Payment',
      description: 'Process your payment',
      icon: '💳',
    },
    {
      label: 'Confirmation',
      description: 'Confirm your order',
      icon: '✅',
    },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Stepper with Custom Icons</Typography>
        <Typography variant='body2' color='textSecondary'>
          Each step can display a custom icon instead of a number.
        </Typography>
      </div>
      <Stepper
        id='custom-icons'
        steps={steps}
        activeStep={active}
        type='linear'
        orientation='horizontal'
        onClick={setActive}
        color='success'
        aria-label='Stepper with custom icons'
      />
    </div>
  );
};
export const KeyboardNavigationDemo = () => {
  const [active, setActive] = useState(0);
  const steps: StepperStep[] = [
    { label: 'Step 1', description: 'Use arrow keys or Home/End keys to navigate' },
    { label: 'Step 2', description: 'Left/Right arrows move between steps' },
    { label: 'Step 3', description: 'Home goes to first, End goes to last' },
    { label: 'Step 4', description: 'All controls are fully accessible' },
  ];
  return (
    <div className='space-y-6 p-4'>
      <div>
        <Typography variant='h6'>Keyboard Navigation</Typography>
        <Typography variant='body2' color='textSecondary'>
          ⌨️ Try using: Arrow Keys • Home • End • Tab for full keyboard accessibility
        </Typography>
      </div>
      <Stepper
        id='keyboard-nav'
        steps={steps}
        activeStep={active}
        type='linear'
        orientation='horizontal'
        step={1}
        onClick={setActive}
        aria-label='Keyboard navigable stepper'
        aria-live='assertive'
      />
    </div>
  );
};
