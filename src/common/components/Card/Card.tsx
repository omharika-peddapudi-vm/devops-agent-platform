import React from 'react';
import '../../../styles/tokens.css';
export interface CardProps {
  id?: string;
  className?: string;
  tabIndex?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevation' | 'outlined' | 'outlined-raised';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  title?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}
const sizeConfig = {
  sm: {
    padding: 'var(--space-3)',
    minHeight: '120px',
  },
  md: {
    padding: 'var(--space-4)',
    minHeight: '160px',
  },
  lg: {
    padding: 'var(--space-6)',
    minHeight: '200px',
  },
};
const variantConfig = {
  elevation: {
    backgroundColor: 'var(--bg-surface)',
    boxShadow: 'var(--shadow-md)',
    border: 'none',
  },
  outlined: {
    backgroundColor: 'var(--bg-surface)',
    border: `var(--border-width-sm) solid var(--border-color)`,
    boxShadow: 'none',
  },
  'outlined-raised': {
    backgroundColor: 'var(--bg-surface)',
    border: `var(--border-width-sm) solid var(--border-color)`,
    boxShadow: 'var(--shadow-sm)',
  },
};
const Card: React.FC<CardProps> = ({
  id,
  className = '',
  tabIndex,
  size = 'md',
  variant = 'elevation',
  onClick,
  onFocus,
  onBlur,
  title,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-hidden': ariaHidden,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive,
  'aria-haspopup': ariaHaspopup,
}) => {
  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'var(--radius-lg)',
    transition: `all var(--transition-normal)`,
    color: 'var(--text-primary)',
  };
  const cardStyles: React.CSSProperties = {
    ...baseStyles,
    ...currentVariant,
    padding: currentSize.padding,
    minHeight: currentSize.minHeight,
  };
  const isInteractive = Boolean(onClick || tabIndex !== undefined);
  const interactiveStyles: React.CSSProperties = {
    ...cardStyles,
    cursor: 'pointer',
  };
  const getInteractiveStateStyles = (state: 'hover' | 'focus'): React.CSSProperties => {
    switch (state) {
      case 'hover':
        return {
          backgroundColor: 'var(--bg-hover)',
          boxShadow:
            variant === 'elevation' || variant === 'outlined-raised'
              ? 'var(--shadow-lg)'
              : undefined,
        };
      case 'focus':
        return {
          outline: 'none',
          boxShadow: `var(--focus-ring)`,
        };
      default:
        return {};
    }
  };
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, getInteractiveStateStyles('hover'));
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, interactiveStyles);
  };
  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, getInteractiveStateStyles('focus'));
    onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, interactiveStyles);
    onBlur?.(e);
  };
  const commonProps = {
    id,
    style: isInteractive ? interactiveStyles : cardStyles,
    title,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-current': ariaCurrent,
    'aria-live': ariaLive,
    'aria-haspopup': ariaHaspopup,
  };
  return (
    <>
      {isInteractive ? (
        <button
          {...commonProps}
          className={`${className}`}
          tabIndex={tabIndex ?? 0}
          onClick={onClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </button>
      ) : (
        <div
          {...commonProps}
          className={className}
          aria-hidden={ariaHidden}
        >
          {children}
        </div>
      )}
    </>
  );
};
export default Card;

