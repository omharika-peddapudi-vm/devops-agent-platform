import React, { useEffect, useRef } from 'react';
import '../../../styles/tokens.css';

export interface BackdropProps {
  className?: string;
}

export interface ModalProps {
  id?: string;
  isOpen?: boolean;
  onClose?: (event?: unknown) => void;
  children?: React.ReactNode;
  disableEscapeKeyDown?: boolean;
  hideBackdrop?: boolean;
  BackdropProps?: BackdropProps;
  className?: string;
  title?: React.ReactNode;
  slots?: Record<string, React.ReactNode>;
  maxWidth?: string;
  maxHeight?: string;
  fullScreen?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-modal'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

const Modal: React.FC<ModalProps> = ({
  id,
  isOpen = false,
  onClose,
  children,
  disableEscapeKeyDown = false,
  hideBackdrop = false,
  BackdropProps,
  className = '',
  title,
  slots,
  maxWidth = '900px',
  maxHeight = '90vh',
  fullScreen = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-controls': ariaControls,
  'aria-modal': ariaModal = true,
  'aria-live': ariaLive = 'polite',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeKeyDown && isOpen) {
        onClose?.(undefined);
      }
    };

    if (isOpen) {
      globalThis.addEventListener('keydown', handleKeyDown);
      return () => globalThis.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, disableEscapeKeyDown, onClose]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex:
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--z-modal')) || 1050,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const backdropStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'var(--overlay-backdrop)',
    cursor: 'pointer',
  };

  const dialogStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth,
    maxHeight,
    height: fullScreen ? '100%' : 'auto',
    padding: fullScreen ? 0 : 'var(--space-6)',
    borderRadius: fullScreen ? 0 : 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    backgroundColor: 'var(--bg-surface)',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: fullScreen ? 0 : 'var(--space-4)',
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-lg)',
    color: 'var(--text-primary)',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
  };

  return (
    <div id={id} style={containerStyle}>
      {!hideBackdrop && (
        <button
          type="button"
          aria-label="close modal"
          onClick={() => onClose?.(undefined)}
          style={backdropStyle}
          className={BackdropProps?.className}
        />
      )}

      <div
        ref={containerRef}
        role="dialog"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-controls={ariaControls}
        aria-modal={ariaModal}
        aria-live={ariaLive}
        tabIndex={-1}
        style={dialogStyle}
        className={className}
      >
        <button
          type="button"
          aria-label="close modal"
          onClick={() => onClose?.(undefined)}
          style={closeButtonStyle}
        >
          ×
        </button>

        {slots?.header ?? (title ? <div style={headerStyle}>{title}</div> : null)}

        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>

        {slots?.footer && <div style={{ marginTop: 'var(--space-6)' }}>{slots.footer}</div>}
        {slots?.actions && <div style={{ marginTop: 'var(--space-4)' }}>{slots.actions}</div>}
      </div>
    </div>
  );
};

export default Modal;