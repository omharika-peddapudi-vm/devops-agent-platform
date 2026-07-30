import '../../../styles/tokens.css';

import React from 'react';
import {NavLink} from 'react-router-dom';

interface LinkProps {
    to: string;
    title?: string;
    id?: string;
    className?: string;
    target?: string;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'inherit';
    size?: 'sm' | 'md' | 'lg';
    underline?: 'none' | 'hover' | 'always';
    onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
    onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
    tabIndex?: number;
    children?: React.ReactNode;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-label'?: string;
    'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
}
const Link: React.FC<LinkProps> = ({
    to,
    title,
    id,
    className = '',
    color = 'primary',
    size = 'md',
    underline = 'hover',
    onFocus,
    tabIndex,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    target,
    'aria-current': ariaCurrent,
    onBlur,
    'aria-label': ariaLabel,
    children,
}) => {
    const colorConfig: Record<string, string> = {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        inherit: 'inherit',
    };
    const hoverColorConfig: Record<string, string> = {
        primary: 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        inherit: 'inherit',
    };
    const sizeConfig = {
        sm: 'var(--font-size-sm)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
    };
    const linkStyles: React.CSSProperties = {
        color: colorConfig[color],
        fontSize: sizeConfig[size],
        textDecoration:
            underline === 'always'
                ? 'underline'
                : underline === 'none'
                  ? 'none'
                  : 'none',
        transition: `all var(--transition-normal)`,
        fontWeight: 'var(--font-weight-regular)',
        cursor: 'pointer',
        display: 'inline-block',
    };
    return (
        <NavLink
            to={to}
            id={id}
            title={title}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            tabIndex={tabIndex}
            aria-current={ariaCurrent}
            target={target}
            className={className || ''}
            style={{
                ...linkStyles,
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.color =
                    hoverColorConfig[color];
                if (underline === 'hover') {
                    (e.currentTarget as HTMLElement).style.textDecoration =
                        'underline';
                }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.color =
                    colorConfig[color];
                if (underline === 'hover') {
                    (e.currentTarget as HTMLElement).style.textDecoration =
                        'none';
                }
            }}
            onFocus={(e: React.FocusEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                    'var(--focus-ring)';
                (e.currentTarget as HTMLElement).style.borderRadius =
                    'var(--radius-md)';
                (e.currentTarget as HTMLElement).style.outline = 'none';
                onFocus?.(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                onBlur?.(e);
            }}
        >
            {children}
        </NavLink>
    );
};
export default Link;
