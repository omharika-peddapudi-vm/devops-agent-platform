import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import '../../../styles/tokens.css';
export interface NumberFieldProps {
  id?: string;
  name?: string;
  className?: string;
  value?: number | string;
  defaultValue?: number | string;
  placeholder?: string;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  title?: string;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'standard';
  inputRef?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
  autoComplete?: string;
  activeStep?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}
const sizeConfig: Record<NonNullable<NumberFieldProps['size']>, React.CSSProperties> = {
  sm: {
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--font-size-sm)',
    height: 'var(--control-height-sm)',
  },
  md: {
    padding: 'var(--space-2) var(--space-3)',
    fontSize: 'var(--font-size-md)',
    height: 'var(--control-height-md)',
  },
  lg: {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--font-size-lg)',
    height: 'var(--control-height-lg)',
  },
};
const variantConfig: Record<NonNullable<NumberFieldProps['variant']>, React.CSSProperties> = {
  outlined: {
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
  },
  filled: {
    backgroundColor: 'var(--bg-muted)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
  },
  standard: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border-color)',
    borderRadius: '0',
  },
};
const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>((props, ref) => {
  const {
    id,
    name,
    className = '',
    value,
    defaultValue,
    placeholder,
    label,
    required,
    disabled,
    readOnly,
    min,
    max,
    step,
    title,
    error = false,
    size = 'md',
    variant = 'outlined',
    inputRef,
    autoFocus,
    autoComplete,
    activeStep,
    onChange,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-disabled': ariaDisabled,
    'aria-live': ariaLive,
    'aria-invalid': ariaInvalid,
    'aria-required': ariaRequired,
  } = props;
  const innerRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);
  useEffect(() => {
    if (!inputRef) return;
    if (typeof inputRef === 'function') {
      inputRef(innerRef.current);
    }
  }, [inputRef]);
  const sizeStyle = sizeConfig[size];
  const variantStyle = variantConfig[variant];
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };
  const labelStyle: React.CSSProperties = {
    marginBottom: 'var(--space-2)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--text-primary)',
  };
  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-family-sans)',
    color: disabled ? 'var(--text-muted)' : 'var(--text-primary)',
    backgroundColor: disabled ? 'var(--bg-muted)' : variantStyle.backgroundColor || 'transparent',
    outline: 'none',
    transition: `all var(--transition-normal)`,
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    cursor: disabled ? 'var(--cursor-disabled)' : 'text',
    ...sizeStyle,
    ...variantStyle,
    ...(error && {
      borderColor: 'var(--color-error)',
      borderWidth: '1px',
    }),
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.currentTarget as HTMLInputElement).style.boxShadow = 'var(--focus-ring)';
    onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
    onBlur?.(e);
  };
  const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!disabled && !error) {
      (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border-color-hover)';
    }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!error) {
      (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border-color)';
    }
  };
  return (
    <div style={containerStyle} data-active-step={activeStep}>
      {label && (
        <label htmlFor={id} style={labelStyle}>
          {label}
          {required && (
            <span aria-hidden style={{ marginLeft: 'var(--space-1)', color: 'var(--color-error)' }}>
              *
            </span>
          )}
        </label>
      )}
      <input
        ref={innerRef}
        id={id}
        name={name}
        type='number'
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
        title={title}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-disabled={ariaDisabled}
        aria-live={ariaLive}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={inputStyle}
        className={className}
      />
    </div>
  );
});
NumberField.displayName = 'NumberField';
export default NumberField;
