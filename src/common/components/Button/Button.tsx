import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disableElevation?: boolean;
  ariaLabel?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      fullWidth = false,
      startIcon,
      endIcon,
      disableElevation = false,
      disabled = false,
      ariaLabel,
      children,
      className = '',
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const getColorTokens = (color: string) => {
      const colorMap: Record<string, { base: string; hover: string; light: string }> = {
        primary: {
          base: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-gray-50)',
        },
        secondary: {
          base: 'var(--color-secondary)',
          hover: 'var(--color-gray-600)',
          light: 'var(--color-gray-50)',
        },
        success: {
          base: 'var(--color-success)',
          hover: 'var(--color-gray-700)',
          light: 'var(--color-gray-50)',
        },
        error: {
          base: 'var(--color-error)',
          hover: 'var(--color-gray-700)',
          light: 'var(--color-gray-50)',
        },
        info: {
          base: 'var(--color-info)',
          hover: 'var(--color-gray-700)',
          light: 'var(--color-gray-50)',
        },
        warning: {
          base: 'var(--color-warning)',
          hover: 'var(--color-gray-700)',
          light: 'var(--color-gray-50)',
        },
        inherit: {
          base: 'inherit',
          hover: 'inherit',
          light: 'inherit',
        },
      };
      return colorMap[color] || colorMap.primary;
    };
    const getSizeTokens = (size: string) => {
      const sizeMap: Record<string, { padding: string; height: string; fontSize: string }> = {
        small: {
          padding: `var(--space-2) var(--space-3)`,
          height: 'var(--control-height-sm)',
          fontSize: 'var(--font-size-sm)',
        },
        medium: {
          padding: `var(--space-3) var(--space-4)`,
          height: 'var(--control-height-md)',
          fontSize: 'var(--font-size-md)',
        },
        large: {
          padding: `var(--space-4) var(--space-6)`,
          height: 'var(--control-height-lg)',
          fontSize: 'var(--font-size-lg)',
        },
      };
      return sizeMap[size] || sizeMap.medium;
    };
    const getVariantStyles = (variant: string, colorTokens: ReturnType<typeof getColorTokens>, disabled: boolean) => {
      const baseStyles: React.CSSProperties = {
        fontWeight: 'var(--font-weight-medium)',
        borderRadius: 'var(--radius-md)',
        transition: `all var(--transition-normal)`,
        cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
        opacity: disabled ? 'var(--opacity-disabled)' : 1,
        outline: 'none',
      };
      if (variant === 'contained') {
        return {
          ...baseStyles,
          backgroundColor: disabled ? 'var(--bg-muted)' : colorTokens.base,
          color: disabled ? 'var(--text-muted)' : 'var(--text-inverse)',
          border: 'none',
          boxShadow: disableElevation ? 'none' : 'var(--shadow-sm)',
        };
      } else if (variant === 'outlined') {
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: disabled ? 'var(--text-muted)' : colorTokens.base,
          border: `var(--border-width-sm) solid ${disabled ? 'var(--border-color)' : colorTokens.base}`,
          boxShadow: 'none',
        };
      } else {
        return {
          ...baseStyles,
          backgroundColor: 'var(--bg-transparent)',
          color: disabled ? 'var(--text-muted)' : colorTokens.base,
          border: 'none',
          boxShadow: 'none',
        };
      }
    };
    const colorTokens = getColorTokens(color);
    const sizeTokens = getSizeTokens(size);
    const variantStyles = getVariantStyles(variant, colorTokens, disabled);
    const buttonStyle: React.CSSProperties = {
      ...variantStyles,
      padding: sizeTokens.padding,
      height: sizeTokens.height,
      fontSize: sizeTokens.fontSize,
      width: fullWidth ? '100%' : 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
    };
    const iconStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        const el = e.currentTarget as HTMLButtonElement;
        if (variant === 'contained') {
          el.style.backgroundColor = colorTokens.hover;
          el.style.boxShadow = disableElevation ? 'none' : 'var(--shadow-md)';
        } else if (variant === 'outlined') {
          el.style.backgroundColor = colorTokens.light;
          el.style.borderColor = colorTokens.hover;
        } else {
          el.style.backgroundColor = colorTokens.light;
        }
      }
      onMouseEnter?.(e);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.backgroundColor = variant === 'contained' ? colorTokens.base : 'transparent';
        if (variant === 'outlined') {
          el.style.borderColor = colorTokens.base;
          el.style.boxShadow = 'var(--shadow-sm)';
        }
      }
      onMouseLeave?.(e);
    };
    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!disabled) {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.boxShadow = `${disableElevation || variant !== 'contained' ? '' : 'var(--shadow-sm)'}, var(--focus-ring)`;
      }
      onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!disabled) {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.boxShadow = variant === 'contained' && !disableElevation ? 'var(--shadow-sm)' : 'none';
      }
      onBlur?.(e);
    };
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        style={buttonStyle}
        className={className}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        {startIcon && (
          <span style={iconStyle}>
            {startIcon}
          </span>
        )}
        <span>{children}</span>
        {endIcon && (
          <span style={iconStyle}>
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;

