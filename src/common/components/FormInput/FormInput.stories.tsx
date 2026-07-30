import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FormInput from './FormInput';
const meta: Meta<typeof FormInput> = {
  title: 'Common/FormInput',
  component: FormInput,
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof FormInput>;
export const Default: Story = {
  args: {
    id: 'username',
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    value: '',
    required: false,
    size: 'md',
    variant: 'outlined',
  },
};
export const Email: Story = {
  args: {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: '',
    required: true,
    size: 'md',
    variant: 'outlined',
  },
};
export const Password: Story = {
  args: {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    value: '',
    required: true,
    size: 'md',
    variant: 'outlined',
  },
};
export const WithError: Story = {
  args: {
    id: 'email-error',
    type: 'email',
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: true,
    helperText: 'Please enter a valid email address',
    required: true,
    size: 'md',
    variant: 'outlined',
  },
};
export const Filled: Story = {
  args: {
    id: 'filled-input',
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    value: 'john_doe',
    required: false,
    size: 'md',
    variant: 'outlined',
  },
};
export const Number: Story = {
  args: {
    id: 'age',
    type: 'number',
    name: 'age',
    label: 'Age',
    placeholder: 'Enter your age',
    value: '',
    required: false,
    size: 'md',
    variant: 'outlined',
  },
};
export const Telephone: Story = {
  args: {
    id: 'phone',
    type: 'tel',
    name: 'phone',
    label: 'Phone Number',
    placeholder: '+1 (555) 000-0000',
    value: '',
    required: true,
    size: 'md',
    variant: 'outlined',
  },
};
export const URL: Story = {
  args: {
    id: 'website',
    type: 'url',
    name: 'website',
    label: 'Website',
    placeholder: 'https',
    value: '',
    required: false,
    size: 'md',
    variant: 'outlined',
  },
};
export const Small: Story = {
  args: {
    id: 'small-input',
    type: 'text',
    name: 'small',
    label: 'Small Input',
    placeholder: 'Small size',
    value: '',
    size: 'sm',
    variant: 'outlined',
  },
};
export const Large: Story = {
  args: {
    id: 'large-input',
    type: 'text',
    name: 'large',
    label: 'Large Input',
    placeholder: 'Large size',
    value: '',
    size: 'lg',
    variant: 'outlined',
  },
};
export const FilledVariant: Story = {
  args: {
    id: 'filled-variant',
    type: 'text',
    name: 'filled',
    label: 'Filled Variant',
    placeholder: 'Enter text',
    value: '',
    size: 'md',
    variant: 'filled',
  },
};
export const StandardVariant: Story = {
  args: {
    id: 'standard-variant',
    type: 'text',
    name: 'standard',
    label: 'Standard Variant',
    placeholder: 'Enter text',
    value: '',
    size: 'md',
    variant: 'standard',
  },
};
export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    type: 'text',
    name: 'disabled',
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    value: 'Disabled value',
    disabled: true,
    size: 'md',
    variant: 'outlined',
  },
};
export const WithHelperText: Story = {
  args: {
    id: 'helper-text',
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    value: '',
    helperText: 'Must be at least 8 characters long',
    required: true,
    size: 'md',
    variant: 'outlined',
  },
};
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      if (val && !val.includes('@')) {
        setError(true);
        setHelperText('Please enter a valid email');
      } else {
        setError(false);
        setHelperText('');
      }
    };
    return (
      <FormInput
        id="interactive-email"
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={value}
        onChange={handleChange}
        error={error}
        helperText={helperText}
        required={true}
        size="md"
        variant="outlined"
      />
    );
  },
};
export const LoginForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = { email: '', password: '' };
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      setErrors(newErrors);
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
        </div>
        <FormInput
          id="login-email"
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          size="md"
          variant="outlined"
        />
        <FormInput
          id="login-password"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
          size="md"
          variant="outlined"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Sign In
        </button>
      </form>
    );
  },
};
export const Required: Story = {
  args: {
    id: 'required-field',
    type: 'text',
    name: 'fullname',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    value: '',
    required: true,
    size: 'md',
    variant: 'outlined',
  },
};

