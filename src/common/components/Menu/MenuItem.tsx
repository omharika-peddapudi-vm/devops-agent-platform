import React, { forwardRef, useRef, useImperativeHandle } from 'react';
export interface MenuItemProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  title?: string;
  tooltip?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  children?: React.ReactNode;
}
const sizeMap: Record<string, string> = {
  sm: 'px-[var(--padding-small)] py-1 text-[var(--font-size-small)]',
  md: 'px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)]',
  lg: 'px-[var(--padding-large)] py-3 text-[var(--font-size-large)]',
};
const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>((props, ref) => {
  const {
    id,
    className = '',
    disabled = false,
    selected = false,
    title,
    tooltip,
    size = 'md',
    onClick,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-disabled': ariaDisabled,
    'aria-current': ariaCurrent,
    children,
  } = props;
  const innerRef = useRef<HTMLButtonElement | null>(null);
  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(ref, () => innerRef.current);
  const sizeClass = sizeMap[size] ?? sizeMap.md;
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const selectedClass = selected ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : '';
  const hoverClass = disabled ? '' : 'hover:bg-gray-100 transition-colors';
  return (
    <button
      ref={innerRef}
      id={id}
      type="button"
      disabled={disabled}
      title={tooltip ?? title}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled ?? disabled}
      aria-current={ariaCurrent}
      className={`${sizeClass} ${disabledClass} ${selectedClass} ${hoverClass} rounded text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${className}`}
    >
      {children}
    </button>
  );
});
MenuItem.displayName = 'MenuItem';
export default MenuItem;

