
import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react';
const SIZE_VARIANTS = {
  sm: {
    height: 'h-9',
    paddingY: 'py-[var(--space-2)]',
    paddingX: 'px-[var(--space-3)]',
    fontSize: 'text-[var(--font-size-sm)]',
  },
  md: {
    height: 'h-10',
    paddingY: 'py-[var(--space-2)]',
    paddingX: 'px-[var(--space-4)]',
    fontSize: 'text-[var(--font-size-md)]',
  },
  lg: {
    height: 'h-12',
    paddingY: 'py-[var(--space-3)]',
    paddingX: 'px-[var(--space-5)]',
    fontSize: 'text-[var(--font-size-lg)]',
  },
} as const;
const VARIANT_STYLES = {
  outlined: {
    base: 'border border-[var(--border-color)] rounded-[var(--radius-md)] bg-[var(--bg-surface)]',
    focus:
      'focus:border-[var(--border-color-focus)] focus:outline-none',
  },
  filled: {
    base: 'border-none rounded-[var(--radius-md)] bg-[var(--bg-muted)]',
    focus: 'focus:outline-none',
  },
  standard: {
    base: 'border-b border-[var(--border-color)] rounded-none bg-transparent',
    focus: 'focus:border-b-2 focus:border-[var(--border-color-focus)]',
  },
} as const;

const DROPDOWN_ARROW_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6,9 12,15 18,9'%3E%3C/polyline%3E%3C/svg%3E\")";

const ARROW_ICON_SIZE = '12px';
const ARROW_POSITION_RIGHT = 'var(--space-3)';
const ARROW_PADDING_OFFSET = 'calc(var(--space-4) + 24px)';
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
export interface SelectProps {
  id?: string;
  isRequired?: boolean;
  hasError?: boolean;
  validationRules?: Record<string, string | number | boolean>;
  name?: string;
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  title?: string;
  error?: string;
  errorMessage?: string;
  options?: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'standard';
  inputRef?: React.Ref<HTMLSelectElement>;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  children?: React.ReactNode;
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      className = '',
      value,
      defaultValue,
      label,
      isRequired,
      disabled = false,
      htmlFor,
      title,
      error,
      errorMessage,
      size = 'md',
      variant = 'outlined',
      inputRef,
      autoFocus = false,
      onChange,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      options,
      hasError,
      children,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement | null>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLSelectElement);
    React.useEffect(() => {
      if (!inputRef) return;
      const currentRef = innerRef.current;
      if (typeof inputRef === 'function') {
        inputRef(currentRef);
      }
    }, [inputRef]);
    const sizeClasses = useMemo(() => {
      const sizeConfig = SIZE_VARIANTS[size] || SIZE_VARIANTS.md;
      return `${sizeConfig.height} ${sizeConfig.paddingY} ${sizeConfig.paddingX} ${sizeConfig.fontSize}`;
    }, [size]);
    const variantClasses = useMemo(() => {
      const variantConfig = VARIANT_STYLES[variant] || VARIANT_STYLES.outlined;
      return `${variantConfig.base} ${variantConfig.focus}`;
    }, [variant]);
    const isFieldError = error || hasError || false;
    const errorClasses = useMemo(() => {
      if (!isFieldError) return '';
      return 'border-[var(--color-error)]';
    }, [isFieldError]);
    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      onBlur?.(e);
    };
    const selectValueProps = useMemo(() => {
      if (value !== undefined && value !== null) {
        return { value: String(value) };
      }
      if (defaultValue !== undefined && defaultValue !== null) {
        return { defaultValue: String(defaultValue) };
      }
      return {};
    }, [value, defaultValue]);
    if (value !== undefined && defaultValue !== undefined) {
      console.warn(
        'Select: Both "value" and "defaultValue" props provided. Using controlled mode (value). "defaultValue" will be ignored.',
      );
    }
    const errorId = errorMessage ? `${id || 'select'}-error` : undefined;
    const describedById = [ariaDescribedby, errorId].filter(Boolean).join(' ');
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {label && (
          <label
            htmlFor={id ?? htmlFor}
            className='flex items-center gap-1 text-sm font-medium text-[var(--text-primary)]'
          >
            <span>{label}</span>
            {isRequired && (
              <span className='text-[var(--color-error)] font-semibold' aria-label='required'>
                *
              </span>
            )}
          </label>
        )}
        <select
          ref={innerRef}
          id={id}
          name={name}
          {...selectValueProps}
          required={false}
          disabled={disabled}
          title={title}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={describedById || undefined}
          aria-invalid={isFieldError ? 'true' : 'false'}
          aria-required={isRequired}
          autoFocus={autoFocus}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full appearance-none font-normal font-[var(--font-family-sans)]
            text-[var(--text-primary)] transition-all duration-[var(--transition-fast)]
            outline-none
            ${sizeClasses}
            ${variantClasses}
            ${errorClasses}
            ${disabled ? 'opacity-[var(--opacity-disabled)] cursor-[var(--cursor-disabled)] text-[var(--text-muted)]' : 'cursor-pointer'}
          `}
          style={{
            backgroundImage: DROPDOWN_ARROW_SVG,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `right ${ARROW_POSITION_RIGHT} center`,
            backgroundSize: ARROW_ICON_SIZE,
            paddingRight: ARROW_PADDING_OFFSET,
          }}
          {...rest}
        >
          <option value="">-- Select an option --</option>
          {options && Array.isArray(options) && options.length > 0
            ? options.map((opt: SelectOption) => (
                <option key={`${opt.value}`} value={String(opt.value)} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {hasError && (
          <span id={errorId} className='text-sm text-[var(--color-error)]' role='alert'>
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';
export default Select;
