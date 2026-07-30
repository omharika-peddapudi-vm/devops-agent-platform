
import React from 'react';
type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}
const sizeClasses: Record<ButtonSize, string> = {
  small: 'text-[var(--font-size-small)] px-3 py-1.5 min-h-[var(--min-height-small)]',
  medium: 'text-[var(--font-size-medium)] px-4 py-2 min-h-[var(--min-height-medium)]',
  large: 'text-[var(--font-size-large)] px-6 py-2.5 min-h-[var(--min-height-large)]',
};
const FileUploadButton: React.FC<Props> = ({
  variant = 'contained',
  size = 'medium',
  loading,
  icon,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const base = 'inline-flex items-center gap-2 rounded-md font-medium focus:outline-none';
  const getVariantClasses = () => {
    if (variant === 'contained') {
      return 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]';
    }
    if (variant === 'outlined') {
      return 'border border-[var(--color-primary)] text-[var(--color-primary)] bg-white hover:bg-[var(--color-primary-light)]';
    }
    return 'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]';
  };
  const variantClasses = getVariantClasses();
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  return (
    <button
      type="button"
      className={`${base} ${sizeClasses[size]} ${variantClasses} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span aria-hidden>Loading...</span> : null}
      {icon}
      {children}
    </button>
  );
};
export default FileUploadButton;

