import React, { useEffect, useRef, useState } from "react";
import '../../../styles/tokens.css';
export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  enterDelay?: number;
  leaveDelay?: number;
}
const createSizeConfig = (size: 'sm' | 'md' | 'lg'): React.CSSProperties =>
  ({
    sm: {
      padding: 'var(--space-2) var(--space-3)',
      fontSize: 'var(--font-size-xs)',
    },
    md: {
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 'var(--font-size-sm)',
    },
    lg: {
      padding: 'var(--space-4) var(--space-6)',
      fontSize: 'var(--font-size-md)',
    },
  })[size];
const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  className = '',
  size = 'md',
  placement = 'top',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  enterDelay = 100,
  leaveDelay = 100,
}) => {
  const [open, setOpen] = useState(false);
  const [tooltipId] = useState(() => `tooltip-${Math.random().toString(36).slice(2, 9)}`);
  const enterTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (enterTimer.current) globalThis.clearTimeout(enterTimer.current);
      if (leaveTimer.current) globalThis.clearTimeout(leaveTimer.current);
    };
  }, []);
  const show = () => {
    if (leaveTimer.current) globalThis.clearTimeout(leaveTimer.current);
    enterTimer.current = globalThis.setTimeout(() => setOpen(true), enterDelay) as unknown as number;
  };
  const hide = () => {
    if (enterTimer.current) globalThis.clearTimeout(enterTimer.current);
    leaveTimer.current = globalThis.setTimeout(() => setOpen(false), leaveDelay) as unknown as number;
  };
  const handleTooltipKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      hide();
    }
  };
  const sizeConfig = createSizeConfig(size);
  const placementStyles: Record<string, React.CSSProperties> = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(8px)' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-8px)' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(8px)' },
  };
  const arrowStyles: Record<string, React.CSSProperties> = {
    top: { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    bottom: { top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    left: { right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
    right: { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  };
  const childAriaDescribedBy = ariaDescribedby || (open ? tooltipId : undefined);
  return (
    <button
      style={{ position: 'relative', display: 'inline-flex' }}
      className={className}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleTooltipKeyDown}
      aria-label={ariaLabel || 'Tooltip trigger'}
      aria-labelledby={ariaLabelledby}
      aria-describedby={open ? ariaDescribedby || tooltipId : ariaDescribedby}
      aria-expanded={open}
      type='button'
    >
      {React.isValidElement(children)
        ? React.cloneElement(
            children as React.ReactElement<Record<string, unknown>>,
            {
              ...(childAriaDescribedBy ? { 'aria-describedby': childAriaDescribedBy } : {}),
              ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
              ...(ariaLabelledby ? { 'aria-labelledby': ariaLabelledby } : {}),
            } as Record<string, unknown>,
          )
        : children}
      {open && (
        <span
          id={tooltipId}
          role='tooltip'
          style={{
            position: 'absolute',
            ...placementStyles[placement],
            ...sizeConfig,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--text-inverse)',
            backgroundColor: 'var(--text-primary)',
            maxWidth: '320px',
            wordWrap: 'break-word',
            zIndex: 'var(--z-tooltip)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ display: 'inline' }}>{title}</span>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--text-primary)',
              ...arrowStyles[placement],
              transformOrigin: 'center',
            }}
          />
        </span>
      )}
    </button>
  );
};
export default Tooltip;
