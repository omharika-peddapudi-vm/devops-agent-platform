import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import CardHeader from './CardHeader';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
const meta: Meta<typeof Card> = {
  title: 'Common/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'radio' }, options: ['elevation', 'outlined', 'outlined-raised'] },
    onClick: { action: 'clicked' },
    title: { control: 'text' },
    'aria-label': { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader
        title={<span id="card-title">Jane Doe</span>}
        subheader={<span>Product Designer</span>}
        avatar={<div style={{ width: '32px', height: '32px', background: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }} />}
        action={<button aria-label="more">⋯</button>}
      />
      <CardContent>
        <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)' }}>
          This is a sample card demonstrating the Card component driven by design tokens.
        </p>
      </CardContent>
      <CardFooter>
        <small style={{ color: 'var(--text-muted)' }}>Joined Jan 2024</small>
      </CardFooter>
    </Card>
  ),
  args: {
    size: 'md',
    variant: 'outlined-raised',
    title: 'User Profile Card',
    'aria-label': 'User profile information',
  },
};
export const Elevation: Story = {
  args: {
    size: 'md',
    variant: 'elevation',
    title: 'Card with Elevation',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p style={{ color: 'var(--text-primary)' }}>This card uses elevation variant with shadow.</p>
      </CardContent>
    </Card>
  ),
};
export const Outlined: Story = {
  args: {
    size: 'md',
    variant: 'outlined',
    title: 'Card with Outline',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p style={{ color: 'var(--text-primary)' }}>This card uses outlined variant with border.</p>
      </CardContent>
    </Card>
  ),
};
export const OutlinedRaised: Story = {
  args: {
    size: 'md',
    variant: 'outlined-raised',
    title: 'Card with Outline and Shadow',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p style={{ color: 'var(--text-primary)' }}>This card combines outline and shadow.</p>
      </CardContent>
    </Card>
  ),
};
export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'elevation',
    title: 'Small Card',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p style={{ color: 'var(--text-primary)' }}>Small card size</p>
      </CardContent>
    </Card>
  ),
};
export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'elevation',
    title: 'Large Card',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p style={{ color: 'var(--text-primary)' }}>Large card size</p>
      </CardContent>
    </Card>
  ),
};
export const Interactive: Story = {
  args: {
    size: 'md',
    variant: 'elevation',
    onClick: () => alert('Card clicked!'),
    title: 'Clickable Card',
    'aria-label': 'Clickable interactive card',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p style={{ color: 'var(--text-primary)' }}>Click this card to see the action.</p>
      </CardContent>
    </Card>
  ),
};
export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Playground Card" subheader="Adjust controls to change appearance" />
      <CardContent>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-md)' }}>
          Use the controls to customize size, variant, and other properties.
        </p>
      </CardContent>
    </Card>
  ),
  args: {
    size: 'md',
    variant: 'elevation',
    title: 'Playground',
  },
};

