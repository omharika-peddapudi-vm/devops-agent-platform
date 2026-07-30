import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import '../../../styles/tokens.css';
export interface MenuProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  title?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  'aria-orientation'?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}
const sizeConfig: Record<NonNullable<MenuProps['size']>, React.CSSProperties> = {
  sm: {
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--font-size-sm)',
    height: 'var(--control-height-sm)',
  },
  md: {
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--font-size-md)',
    height: 'var(--control-height-md)',
  },
  lg: {
    padding: 'var(--space-3) var(--space-6)',
    fontSize: 'var(--font-size-lg)',
    height: 'var(--control-height-lg)',
  },
};
const roundedConfig: Record<NonNullable<MenuProps['rounded']>, string> = {
  none: '0',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: 'var(--radius-full)',
};
const variantConfig: Record<
  NonNullable<MenuProps['variant']>,
  {
    color: string;
    backgroundColor: string;
    borderColor: string;
    hoverColor: string;
    hoverBackgroundColor: string;
  }
> = {
  default: {
    color: 'var(--text-primary)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    hoverColor: 'var(--color-primary)',
    hoverBackgroundColor: 'var(--bg-hover)',
  },
  primary: {
    color: 'var(--text-inverse)',
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    hoverColor: 'var(--text-inverse)',
    hoverBackgroundColor: 'var(--color-primary-hover)',
  },
  secondary: {
    color: 'var(--text-inverse)',
    backgroundColor: 'var(--color-secondary)',
    borderColor: 'var(--color-secondary)',
    hoverColor: 'var(--text-inverse)',
    hoverBackgroundColor: 'var(--color-secondary)',
  },
  danger: {
    color: 'var(--text-inverse)',
    backgroundColor: 'var(--color-error)',
    borderColor: 'var(--color-error)',
    hoverColor: 'var(--text-inverse)',
    hoverBackgroundColor: 'var(--color-error)',
  },
  link: {
    color: 'var(--color-primary)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    hoverColor: 'var(--color-primary-hover)',
    hoverBackgroundColor: 'transparent',
  },
};
const Menu = forwardRef<HTMLButtonElement, MenuProps>((props, ref) => {
  const {
    id,
    className = '',
    disabled = false,
    tabIndex = 0,
    variant = 'default',
    size = 'md',
    rounded = 'md',
    onClick,
    onFocus,
    onBlur,
    title,
    children,
    ...ariaProps
  } = props;
  const innerRef = useRef<HTMLButtonElement | null>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);
  const variantStyle = variantConfig[variant];
  const sizeStyle = sizeConfig[size];
  const radiusValue = roundedConfig[rounded];
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-family-sans)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-normal)',
    border: '1px solid',
    borderRadius: radiusValue,
    transition: `all var(--transition-normal)`,
    cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    ...sizeStyle,
    color: variantStyle.color,
    backgroundColor: variantStyle.backgroundColor,
    borderColor: variantStyle.borderColor,
  };
  return (
    <button
      ref={innerRef}
      id={id}
      type='button'
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      title={title}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.color = variantStyle.hoverColor;
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            variantStyle.hoverBackgroundColor;
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.color = variantStyle.color;
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = variantStyle.backgroundColor;
      }}
      style={{
        ...baseStyle,
        boxShadow: `var(--focus-ring)`,
      }}
      className={className}
      aria-disabled={disabled}
      {...ariaProps}
    >
      {children}
    </button>
  );
});
Menu.displayName = 'Menu';
export default Menu;
