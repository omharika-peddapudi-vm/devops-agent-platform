import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import '../../../styles/tokens.css';
export interface RadioGroupProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  inputRef?: React.Ref<HTMLDivElement>;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-orientation'?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}
const sizeConfig: Record<'sm' | 'md' | 'lg', { gap: number; fontSize: string }> = {
  sm: { gap: 8, fontSize: 'var(--font-size-sm)' },
  md: { gap: 12, fontSize: 'var(--font-size-md)' },
  lg: { gap: 16, fontSize: 'var(--font-size-lg)' },
};
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      id,
      className,
      style,
      label,
      required = false,
      disabled = false,
      error = false,
      hasError = false,
      errorMessage,
      size = 'md',
      inputRef,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-orientation': ariaOrientation,
      children,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
    React.useEffect(() => {
      if (!inputRef) return;
      if (typeof inputRef === 'function') {
        inputRef(containerRef.current);
      }
    }, [inputRef]);
    const isErrorState = error || hasError;
    const errorId = errorMessage ? `${id || 'radiogroup'}-error` : undefined;
    const sizeConfig_value = sizeConfig[size] || sizeConfig.md;
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: `${sizeConfig_value.gap}px`,
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    };
    const groupStyle: React.CSSProperties = {
      display: 'flex',
      gap: `${sizeConfig_value.gap}px`,
      alignItems: 'center',
      fontSize: sizeConfig_value.fontSize,
      outline: isErrorState ? `var(--border-width-sm) solid var(--color-error)` : 'none',
      borderRadius: 'var(--radius-md)',
      padding: isErrorState ? 'var(--space-2)' : 0,
      pointerEvents: disabled ? 'none' : 'auto',
    };
    const labelStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: `${sizeConfig_value.gap / 2}px`,
      fontSize: sizeConfig_value.fontSize,
      color: 'var(--text-primary)',
      fontWeight: 'var(--font-weight-medium)',
      marginBottom: label ? `${sizeConfig_value.gap}px` : 0,
    };
    const requiredIndicatorStyle: React.CSSProperties = {
      marginLeft: 'var(--space-1)',
      color: 'var(--color-error)',
      fontWeight: 'var(--font-weight-semibold)',
    };
    return (
      <div style={{ ...containerStyle, ...style }} className={className} ref={containerRef}>
        {label && (
          <label style={labelStyle}>
            {label}
            {required && <span style={requiredIndicatorStyle}>*</span>}
          </label>
        )}
        <div
          id={id}
          role='radiogroup'
          style={groupStyle}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={errorId || ariaDescribedby}
          aria-disabled={disabled}
          aria-required={required}
          aria-invalid={isErrorState}
          aria-orientation={ariaOrientation || 'vertical'}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {children}
        </div>
        {}
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
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
