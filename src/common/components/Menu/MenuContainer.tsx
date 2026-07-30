import React, { forwardRef, useRef, useImperativeHandle } from 'react';
export interface MenuContainerProps {
  id?: string;
  className?: string;
  tooltip?: string;
  orientation?: 'vertical' | 'horizontal';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  children?: React.ReactNode;
}
const MenuContainer = forwardRef<HTMLUListElement, MenuContainerProps>((props, ref) => {
  const {
    id,
    className = '',
    tooltip,
    orientation = 'vertical',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-live': ariaLive = 'off',
    children,
  } = props;
  const innerRef = useRef<HTMLUListElement | null>(null);
  useImperativeHandle<HTMLUListElement | null, HTMLUListElement | null>(ref, () => innerRef.current);
  const flexDirection = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  return (
    <ul
      ref={innerRef}
      id={id}
      className={`list-none p-0 m-0 flex ${flexDirection} gap-[var(--gap-xsmall)] bg-[var(--color-white)] rounded border border-[var(--color-divider)] ${className}`}
      title={tooltip}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-live={ariaLive}
    >
      {children}
    </ul>
  );
});
MenuContainer.displayName = 'MenuContainer';
export default MenuContainer;

