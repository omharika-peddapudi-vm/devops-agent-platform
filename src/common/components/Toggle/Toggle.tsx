import React, { useState } from 'react';
import '../../../styles/tokens.css';
 
export interface ToggleProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  defaultChecked?: boolean;
  checked?: boolean;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
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
 
const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
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
    const errorId = errorMessage ? `${id || 'toggle'}-error` : undefined;
    const toggleId = id || 'toggle';
 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };
 
    const sizeConfig = {
      sm: {
        width: '52px',
        height: '26px',
        knob: '20px',
        fontSize: 'var(--font-size-xs)',
        textSize: '9px',
      },
      md: {
        width: '60px',
        height: '30px',
        knob: '24px',
        fontSize: 'var(--font-size-sm)',
        textSize: '10px',
      },
      lg: {
        width: '68px',
        height: '34px',
        knob: '28px',
        fontSize: 'var(--font-size-md)',
        textSize: '11px',
      },
    };
 
    const currentSize = sizeConfig[size];
 
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      flexWrap: 'wrap',
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
      cursor: disabled ? 'not-allowed' : 'pointer',
      zIndex: 1,
    };
 
    const toggleTrackStyles: React.CSSProperties = {
      width: currentSize.width,
      height: currentSize.height,
      borderRadius: '999px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition-normal)',
      backgroundColor: isChecked ? 'var(--color-primary)' : 'var(--bg-muted)',
      border: isErrorState
        ? 'var(--border-width-sm) solid var(--color-error)'
        : `var(--border-width-sm) solid ${
            isChecked ? 'var(--color-primary)' : 'var(--border-color)'
          }`,
      flexShrink: 0,
      boxSizing: 'border-box',
      padding: '0 6px',
    };
 
    const knobStyles: React.CSSProperties = {
      width: currentSize.knob,
      height: currentSize.knob,
      borderRadius: '50%',
      backgroundColor: 'var(--color-white)',
      position: 'absolute',
      top: '50%',
      left: isChecked ? `calc(100% - ${currentSize.knob} - 2px)` : '2px',
      transform: 'translateY(-50%)',
      transition: 'all var(--transition-normal)',
      boxShadow: 'var(--shadow-sm)',
      zIndex: 2,
    };
 
    const toggleTextStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: currentSize.textSize,
      fontWeight: 600,
      letterSpacing: '0.5px',
      zIndex: 1,
      userSelect: 'none',
      pointerEvents: 'none',
      color: isChecked ? 'var(--color-white)' : 'var(--text-secondary)',
      left: isChecked ? '8px' : 'auto',
      right: isChecked ? 'auto' : '8px',
    };
 
    const labelStyles: React.CSSProperties = {
      fontSize: currentSize.fontSize,
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
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
 
    return (
      <div className={className}>
        <div style={containerStyles}>
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
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
            aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
            aria-labelledby={ariaLabelledby}
            aria-describedby={errorId || ariaDescribedby}
            aria-hidden={ariaHidden}
            aria-disabled={ariaDisabled ?? disabled}
            aria-live={ariaLive}
            aria-invalid={isErrorState}
            aria-required={ariaRequired ?? required}
            role="switch"
          />
 
          <label
            htmlFor={toggleId}
            style={toggleTrackStyles}
            onMouseEnter={(e) => {
              if (!disabled) {
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <span style={toggleTextStyles}>{isChecked ? 'ON' : 'OFF'}</span>
            <span style={knobStyles} aria-hidden="true" />
          </label>
 
          {label && (
            <label htmlFor={toggleId} style={labelStyles}>
              {label}
              {required && <span style={requiredIndicatorStyles}>*</span>}
            </label>
          )}
        </div>
 
        {hasError && errorMessage && (
          <div
            id={errorId}
            style={{
              marginTop: 'var(--space-1)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-error)',
              fontWeight: 'var(--font-weight-regular)',
            }}
            role="alert"
          >
            {errorMessage}
          </div>
        )}
      </div>
    );
  },
);
 
export default Toggle;
 