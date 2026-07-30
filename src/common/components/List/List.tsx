import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import '../../../styles/tokens.css';
export interface ListProps {
  id?: string;
  className?: string;
  title?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-disabled'?: boolean;
}
const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    id,
    className = '',
    title,
    disabled = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-controls': ariaControls,
    'aria-live': ariaLive = 'off',
    'aria-disabled': ariaDisabled,
    children,
  } = props;
  const innerRef = useRef<HTMLUListElement | null>(null);
  useImperativeHandle<HTMLUListElement | null, HTMLUListElement | null>(
    ref,
    () => innerRef.current,
  );
  const listStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: `var(--border-width-sm) solid var(--border-color)`,
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: `all var(--transition-normal)`,
  };
  return (
    <ul
      ref={innerRef}
      id={id}
      style={listStyles}
      className={className}
      title={title}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-controls={ariaControls}
      aria-live={ariaLive}
      aria-disabled={ariaDisabled ?? disabled}
    >
      {children}
    </ul>
  );
});
List.displayName = 'List';
export default List;
