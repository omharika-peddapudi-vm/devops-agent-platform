import '../../../styles/tokens.css';

import React, { useState } from 'react';

export interface AccordionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  isOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevation' | 'outlined';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}
const Accordion: React.FC<AccordionProps> = ({
  id,
  className = '',
  title = 'Accordion Title',
  size = 'md',
  variant = 'outlined',
  isOpen: controlledIsOpen,
  onChange,
  disabled = false,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-hidden': ariaHidden,
  'aria-invalid': ariaInvalid,
  'aria-live': ariaLive,
  hasError = false,
  errorMessage,
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const handleToggle = () => {
    if (disabled) return;
    const newState = !isOpen;
    setUncontrolledIsOpen(newState);
    onChange?.(newState);
  };
  const sizeConfig: Record<'sm' | 'md' | 'lg', { padding: string; fontSize: string }> = {
    sm: {
      padding: 'var(--space-2) var(--space-3)',
      fontSize: 'var(--font-size-sm)',
    },
    md: {
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 'var(--font-size-md)',
    },
    lg: {
      padding: 'var(--space-4) var(--space-5)',
      fontSize: 'var(--font-size-lg)',
    },
  };
  const variantConfig: Record<'elevation' | 'outlined', { boxShadow: string; border: string }> = {
    elevation: {
      boxShadow: 'var(--shadow-md)',
      border: 'none',
    },
    outlined: {
      border: 'var(--border-width-sm) solid var(--border-color)',
      boxShadow: 'none',
    },
  };
  const contentId = `${id || 'accordion'}-content`;
  const currentSize = sizeConfig[size] || sizeConfig.md;
  const currentVariant = variantConfig[variant] || variantConfig.outlined;
  const headerStyles: React.CSSProperties = {
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    backgroundColor: 'var(--bg-muted)',
    color: 'var(--text-primary)',
    fontWeight: 'var(--font-weight-medium)',
    borderBottom: 'var(--border-width-sm) solid var(--border-color)',
    transition: `background-color var(--transition-normal)`,
    cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };
  const contentWrapperStyles: React.CSSProperties = {
    overflow: 'hidden',
    transition: `all var(--transition-normal)`,
    maxHeight: isOpen ? 'var(--accordion-max-height)' : '0',
  };
  const contentStyles: React.CSSProperties = {
    padding: currentSize.padding,
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-secondary)',
  };
  const isErrorState = ariaInvalid || hasError;
  const errorId = errorMessage ? `${id || 'accordion'}-error` : undefined;
  const containerStyles: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    ...currentVariant,
    ...(isErrorState
      ? {
          border: 'var(--border-width-sm) solid var(--color-error)',
          boxShadow: '0 0 0 1px var(--color-error-light)',
        }
      : {}),
  };
  return (
    <div
      id={id}
      className={className}
      style={containerStyles}
      aria-live={ariaLive}
      aria-hidden={ariaHidden}
      aria-invalid={ariaInvalid}
    >
      <button
        onClick={handleToggle}
        disabled={disabled}
        style={{
          ...headerStyles,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          outline: 'none',
        }}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={ariaLabel || title}
        aria-labelledby={ariaLabelledby}
        aria-describedby={errorId || ariaDescribedby}
        aria-invalid={isErrorState}
        onMouseEnter={e => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
        }}
        onFocus={e => {
          e.currentTarget.style.boxShadow = 'var(--focus-ring)';
          e.currentTarget.style.borderRadius = 'var(--radius-lg)';
        }}
        onBlur={e => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span>{title}</span>
        <span
          aria-hidden='true'
          style={{
            fontSize: '1.25rem',
            lineHeight: 1,
            flexShrink: 0,
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        id={contentId}
        style={contentWrapperStyles}
        role='region'
        aria-labelledby={id ? `${id}-button` : undefined}
      >
        <div style={contentStyles}>{children || <p>Accordion content goes here.</p>}</div>
      </div>
      {hasError && errorMessage && (
        <div
          id={errorId}
          style={{
            padding: 'var(--space-2) var(--space-3)',
            backgroundColor: 'var(--color-error-light)',
            color: 'var(--color-error-dark)',
            fontSize: 'var(--font-size-sm)',
            borderTop: 'var(--border-width-sm) solid var(--color-error)',
          }}
          role='alert'
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};
export default Accordion;
