import '../../../styles/tokens.css';
import React, { useCallback } from 'react';
import '../../../styles/tokens.css';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'contained' | 'outlined' | 'text';
export interface PaginationProps {
  id?: string;
  className?: string;
  value?: number | string;
  disabled?: boolean;
  selected?: boolean;
  title?: string;
  tabIndex?: number;
  size?: Size;
  variant?: Variant;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'page' | 'step' | 'true' | 'false';
  'aria-live'?: 'off' | 'polite' | 'assertive';
}
const sizeConfig: Record<Size, React.CSSProperties> = {
  sm: {
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--font-size-sm)',
    minWidth: 'var(--control-height-sm)',
    height: 'var(--control-height-sm)',
  },
  md: {
    padding: 'var(--space-2) var(--space-3)',
    fontSize: 'var(--font-size-md)',
    minWidth: 'var(--control-height-md)',
    height: 'var(--control-height-md)',
  },
  lg: {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--font-size-lg)',
    minWidth: 'var(--control-height-lg)',
    height: 'var(--control-height-lg)',
  },
};
const variantConfig: Record<
  Variant,
  {
    contained: { color: string; backgroundColor: string; borderColor: string };
    outlined: { color: string; backgroundColor: string; borderColor: string };
    text: { color: string; backgroundColor: string; borderColor: string };
  }
> = {
  contained: {
    contained: {
      color: 'var(--text-inverse)',
      backgroundColor: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
    },
    outlined: {
      color: 'var(--color-primary)',
      backgroundColor: 'var(--bg-surface)',
      borderColor: 'var(--color-primary)',
    },
    text: {
      color: 'var(--color-primary)',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },
  outlined: {
    contained: {
      color: 'var(--text-inverse)',
      backgroundColor: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
    },
    outlined: {
      color: 'var(--color-primary)',
      backgroundColor: 'var(--bg-surface)',
      borderColor: 'var(--color-primary)',
    },
    text: {
      color: 'var(--color-primary)',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },
  text: {
    contained: {
      color: 'var(--text-inverse)',
      backgroundColor: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
    },
    outlined: {
      color: 'var(--color-primary)',
      backgroundColor: 'var(--bg-surface)',
      borderColor: 'var(--color-primary)',
    },
    text: {
      color: 'var(--color-primary)',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },
};
const Pagination: React.FC<PaginationProps> = ({
  id,
  className = '',
  value,
  disabled = false,
  selected = false,
  title,
  tabIndex,
  size = 'md',
  variant = 'outlined',
  onClick,
  onDoubleClick,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-selected': ariaSelected,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive,
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) onClick?.(e);
    },
    [disabled, onClick],
  );
  const sizeStyle = sizeConfig[size];
  const selectedStyle = selected
    ? variantConfig[variant].contained
    : variantConfig[variant][variant];
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-family-sans)',
    fontWeight: selected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
    border: '1px solid',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: `all var(--transition-normal)`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    ...sizeStyle,
    color: selectedStyle.color,
    backgroundColor: selectedStyle.backgroundColor,
    borderColor: selectedStyle.borderColor,
  };
  const ariaCurrentValue = selected ? 'page' : undefined;
  return (
    <button
      id={id}
      type='button'
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={e => {
        if (!disabled && !selected) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          selectedStyle.backgroundColor;
      }}
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      title={title}
      style={baseStyle}
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled ?? disabled}
      aria-selected={ariaSelected ?? selected}
      aria-controls={ariaControls}
      aria-current={ariaCurrent ?? ariaCurrentValue}
      aria-live={ariaLive}
    >
      {value}
    </button>
  );
};
export default Pagination;
