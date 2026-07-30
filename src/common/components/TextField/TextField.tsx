import '../../../styles/tokens.css';

import React, { useId, useMemo } from 'react';

type TextFieldSize = 'sm' | 'md' | 'lg';
type TextFieldVariant = 'default' | 'outlined' | 'filled';
export interface Props {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  endDecorator?: React.ReactNode;
  error?: string;
  size?: TextFieldSize;
  startDecorator?: React.ReactNode;
  variant?: TextFieldVariant;
  autoFocus?: boolean;
  isRequired?: boolean;
  isValid?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  validationRules?: Record<string, string | number | boolean>;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  tooltip?: string;
}
const TextField = ({
  id,
  name,
  className = '',
  type = 'text',
  value,
  defaultValue,
  placeholder,
  label,
  required = false,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  endDecorator,
  error,
  size = 'md',
  startDecorator,
  variant = 'outlined',
  autoFocus = false,
  isRequired,
  hasError,
  errorMessage,
  autoComplete,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  ...rest
}: Props) => {
  const isFieldRequired = required || isRequired || false;
  // Destructure required out of rest to prevent native browser validation popup
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { required: _required, ...safeRest } = { required, ...rest };
  const fieldError = error || errorMessage || '';
  const isFieldInvalid = ariaInvalid || hasError || false;
  const generatedId = useId();
  const fieldId = id || `textfield-${generatedId}`;
  const labelId = label ? `${fieldId}-label` : undefined;
  const errorId = fieldError ? `${fieldId}-error` : undefined;
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: 'px-3 py-2 text-sm h-9',
      md: 'px-4 py-2 text-base h-10',
      lg: 'px-4 py-3 text-lg h-12',
    };
    return sizes[size];
  }, [size]);
  const variantClasses = useMemo(() => {
    const variants = {
      default:
        'border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-color-hover)] focus:border-[var(--border-color-focus)] focus:outline-none',
      outlined:
        'border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-color-hover)] focus:border-[var(--border-color-focus)] focus:outline-none',
      filled:
        'border-b border-[var(--border-color)] bg-[var(--bg-muted)] hover:bg-[var(--bg-hover)] focus:border-[var(--border-color-focus)] focus:outline-none',
    };
    return variants[variant];
  }, [variant]);
  const descriptionIds = useMemo(() => {
    return [ariaLabelledby, ariaDescribedby, errorId].filter(Boolean).join(' ');
  }, [ariaLabelledby, ariaDescribedby, errorId]);
  const isInvalid = fieldError || isFieldInvalid;
  const inputClasses = [
    'w-full',
    'rounded-[var(--radius-md)]',
    'font-normal',
    'font-[var(--font-family-sans)]',
    'text-[var(--text-primary)]',
    'transition-all',
    'duration-[var(--transition-fast)]',
    sizeClasses,
    variantClasses,
    isInvalid ? 'border-[var(--color-error)] focus:border-[var(--color-error)]' : '',
    disabled ? 'opacity-50 cursor-not-allowed bg-[var(--bg-muted)]' : '',
    readOnly ? 'cursor-default bg-[var(--bg-muted)]' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={`flex flex-col gap-2 w-full ${disabled ? 'opacity-50' : ''}`}>
      {label && (
        <label
          id={labelId}
          htmlFor={fieldId}
          className={`text-sm font-medium text-[var(--text-primary)] ${isFieldRequired ? "after:content-['*'] after:ml-1 after:text-[var(--color-error)]" : ''}`}
        >
          {label}
        </label>
      )}
      <div className='flex items-center w-full'>
        {startDecorator && (
          <div
            className={`flex items-center px-3 py-2 text-[var(--text-secondary)] ${size === 'sm' ? 'text-sm' : 'text-base'}`}
          >
            {startDecorator}
          </div>
        )}
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClasses}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={ariaLabel}
          aria-labelledby={labelId || ariaLabelledby}
          aria-describedby={descriptionIds || undefined}
          aria-invalid={isInvalid ? 'true' : 'false'}
          aria-required={ariaRequired || isFieldRequired}
          {...safeRest}
        />
        {endDecorator && (
          <div
            className={`flex items-center px-3 py-2 text-[var(--text-secondary)] ${size === 'sm' ? 'text-sm' : 'text-base'}`}
          >
            {endDecorator}
          </div>
        )}
      </div>
      {fieldError && (
        <span id={errorId} className='text-sm text-[var(--color-error)]' role='alert'>
          {fieldError}
        </span>
      )}
    </div>
  );
};
export default TextField;
