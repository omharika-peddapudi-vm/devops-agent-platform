import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox from './Checkbox';
const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['outline', 'filled'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
  args: {
    label: 'Unchecked Checkbox',
    size: 'md',
    variant: 'outline',
  },
};
export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
    size: 'md',
    variant: 'outline',
  },
};
export const Small: Story = {
  args: {
    label: 'Small Size',
    size: 'sm',
    variant: 'outline',
  },
};
export const Medium: Story = {
  args: {
    label: 'Medium Size',
    size: 'md',
    variant: 'outline',
  },
};
export const Large: Story = {
  args: {
    label: 'Large Size',
    size: 'lg',
    variant: 'outline',
  },
};
export const OutlineVariant: Story = {
  args: {
    label: 'Outline Variant',
    size: 'md',
    variant: 'outline',
  },
};
export const FilledVariant: Story = {
  args: {
    label: 'Filled Variant',
    size: 'md',
    variant: 'filled',
  },
};
export const Required: Story = {
  args: {
    label: 'Required Checkbox',
    required: true,
    size: 'md',
    variant: 'outline',
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
    size: 'md',
    variant: 'outline',
  },
};
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    checked: true,
    size: 'md',
    variant: 'outline',
  },
};
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
  args: {
    label: 'Controlled Checkbox',
    size: 'md',
    variant: 'outline',
  },
};
export const Uncontrolled: Story = {
  render: (args) => (
    <Checkbox
      {...args}
      defaultChecked={false}
      onChange={(e) => console.log('Checked:', e.target.checked)}
    />
  ),
  args: {
    label: 'Uncontrolled Checkbox',
    size: 'md',
    variant: 'outline',
  },
};

