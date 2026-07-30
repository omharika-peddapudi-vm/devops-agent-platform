import '../../../styles/tokens.css';
 
import React, { useState } from 'react';
export interface CheckboxProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  defaultChecked?: boolean;
  checked?: boolean;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  tabIndex?: number;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  hasError?: boolean;
  errorMessage?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      name,
      className = '',
      value,
      defaultChecked,
      checked,
      label,
      required = false,
      disabled = false,
      size = 'md',
      variant = 'outline',
      tabIndex,
      onClick,
      onChange,
      onFocus,
      hasError = false,
      errorMessage,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-hidden': ariaHidden,
      'aria-disabled': ariaDisabled,
      'aria-live': ariaLive,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked || false);
    const isChecked = checked ?? uncontrolledChecked;
    const isErrorState = hasError || ariaInvalid;
    const errorId = errorMessage ? `${id || 'checkbox'}-error` : undefined;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };
    const sizeConfig = {
      sm: {
        width: '20px',
        height: '20px',
        fontSize: 'var(--font-size-xs)',
      },
      md: {
        width: '24px',
        height: '24px',
        fontSize: 'var(--font-size-sm)',
      },
      lg: {
        width: '28px',
        height: '28px',
        fontSize: 'var(--font-size-md)',
      },
    };
    const variantConfig = {
      outline: {
        border: `var(--border-width-sm) solid var(--border-color)`,
        backgroundColor: 'var(--bg-surface)',
      },
      filled: {
        border: 'none',
        backgroundColor: 'var(--bg-muted)',
      },
    };
    const currentSize = sizeConfig[size];
    const currentVariant = variantConfig[variant];
    const checkboxId = id || 'checkbox';
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    };
    const inputStyles: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: currentSize.width,
      height: currentSize.height,
      margin: 0,
      padding: 0,
      opacity: 0,
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
      zIndex: 1,
    };
    const checkboxDisplayStyles: React.CSSProperties = {
      width: currentSize.width,
      height: currentSize.height,
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
      transition: `all var(--transition-normal)`,
      backgroundColor: isChecked ? 'var(--color-primary)' : currentVariant.backgroundColor,
      border: isChecked
        ? `var(--border-width-sm) solid var(--color-primary)`
        : isErrorState
          ? `var(--border-width-sm) solid var(--color-error)`
          : currentVariant.border,
      flexShrink: 0,
      position: 'relative',
      zIndex: 0,
    };
    const labelStyles: React.CSSProperties = {
      fontSize: currentSize.fontSize,
      color: 'var(--text-primary)',
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
      userSelect: 'none',
      fontWeight: 'var(--font-weight-regular)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
    };
    const requiredIndicatorStyles: React.CSSProperties = {
      color: 'var(--color-error)',
      marginLeft: 'var(--space-1)',
      fontWeight: 'var(--font-weight-medium)',
    };
    const svgStyles: React.CSSProperties = {
      width: '60%',
      height: '60%',
      transition: `opacity var(--transition-fast)`,
    };
    return (
      <div style={containerStyles} className={className}>
        <input
          ref={ref}
          id={checkboxId}
          type='checkbox'
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          required={required}
          tabIndex={tabIndex}
          onChange={handleChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          style={inputStyles}
          aria-label={ariaLabel || label}
          aria-labelledby={ariaLabelledby}
          aria-describedby={errorId || ariaDescribedby}
          aria-hidden={ariaHidden}
          aria-disabled={ariaDisabled ?? disabled}
          aria-live={ariaLive}
          aria-invalid={isErrorState}
          aria-required={ariaRequired ?? required}
        />
        <label
          htmlFor={checkboxId}
          style={checkboxDisplayStyles}
          onMouseEnter={e => {
            if (!disabled) {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
              if (!isChecked) {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color-hover)';
              }
            }
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            if (!isChecked) {
              (e.currentTarget as HTMLElement).style.borderColor = `var(--border-color)`;
            }
          }}
          onFocus={e => {
            if (!disabled) {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--focus-ring)';
            }
          }}
          onBlur={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {isChecked && (
            <svg
              style={svgStyles}
              fill='none'
              stroke='var(--color-white)'
              strokeWidth={3}
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
          )}
        </label>
        {label && (
          <label htmlFor={checkboxId} style={labelStyles}>
            {label}
            {required && <span style={requiredIndicatorStyles}>*</span>}
          </label>
        )}
        {hasError && errorMessage && (
          <div
            id={errorId}
            style={{
              marginTop: 'var(--space-1)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-error)',
              fontWeight: 'var(--font-weight-regular)',
            }}
            role='alert'
          >
            {errorMessage}
          </div>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
export default Checkbox;
 
 