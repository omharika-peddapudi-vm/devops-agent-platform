
import React from 'react';
import '../../../styles/tokens.css';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'button'
  | 'inherit';

export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'heading'
  | 'body'
  | 'caption'
  | 'muted'
  | 'inverse'
  | 'label'
  | 'overline'
  | 'button'
  | 'subtitle'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: Variant;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
  color?: ColorVariant | string; // Semantic color name or CSS value

  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaHidden?: boolean;
  ariaLive?: 'off' | 'polite' | 'assertive';
}


const variantTagMap: Record<Variant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  button: 'span',
  inherit: 'span',
};

const variantClassMap: Record<Variant, React.CSSProperties> = {
  h1: { fontSize: 'var(--font-size-2xl)', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' },
  h2: { fontSize: '1.75rem', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' },
  h3: { fontSize: 'var(--font-size-xl)', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-semibold)' },
  h4: { fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-semibold)' },
  h5: { fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-semibold)' },
  h6: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-medium)' },
  subtitle1: { fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-medium)' },
  subtitle2: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-medium)' },
  body1: { fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-relaxed)' },
  body2: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)' },
  caption: { fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-normal)' },
  overline: { fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  button: { fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-medium)' },
  inherit: {},
};

// Semantic color mapping for easy usage
const colorVariantMap: Record<ColorVariant, string> = {
  primary: 'var(--text-primary)',
  secondary: 'var(--text-secondary)',
  heading: 'var(--text-heading)',
  body: 'var(--text-body)',
  caption: 'var(--text-caption)',
  muted: 'var(--text-muted)',
  inverse: 'var(--text-inverse)',
  label: 'var(--text-label)',
  overline: 'var(--text-overline)',
  button: 'var(--text-button)',
  subtitle: 'var(--text-subtitle)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
};

// Default colors for variants when no color prop is provided
const variantDefaultColors: Record<Variant, string | undefined> = {
  h1: 'var(--text-heading)',
  h2: 'var(--text-heading)',
  h3: 'var(--text-heading)',
  h4: 'var(--text-heading)',
  h5: 'var(--text-heading)',
  h6: 'var(--text-heading)',
  subtitle1: 'var(--text-subtitle)',
  subtitle2: 'var(--text-subtitle)',
  body1: 'var(--text-body)',
  body2: 'var(--text-body)',
  caption: 'var(--text-caption)',
  overline: 'var(--text-overline)',
  button: 'var(--text-button)',
  inherit: undefined,
};

const Typography: React.FC<TypographyProps> = ({
  id,
  className = '',
  children,
  variant = 'body1',
  startDecorator,
  endDecorator,
  color,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaHidden,
  ariaLive,
  ...rest
}) => {
  const ComponentTag = variantTagMap[variant] || 'p';
  const variantStyle = variantClassMap[variant] || {};
  
  // Resolve color: semantic name -> CSS variable, or use as-is if custom CSS value
  const resolveColor = (colorProp?: ColorVariant | string): string | undefined => {
    if (!colorProp) return variantDefaultColors[variant];
    
    // Check if it's a semantic color name
    if (colorProp in colorVariantMap) {
      return colorVariantMap[colorProp as ColorVariant];
    }
    
    // Otherwise, treat as custom CSS value (like 'var(--custom-color)' or '#ff0000')
    return colorProp;
  };

  const textColor = resolveColor(color);

  const baseStyle: React.CSSProperties = {
    display: startDecorator || endDecorator ? 'flex' : 'block',
    alignItems: startDecorator || endDecorator ? 'center' : 'baseline',
    gap: startDecorator || endDecorator ? '0.75rem' : undefined,
    ...variantStyle,
    ...(textColor && { color: textColor }),
  };

  const props: React.HTMLAttributes<HTMLElement> = {
    id,
    className,
    style: baseStyle,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    ...rest,
  };

  const content = (
    <>
      {startDecorator && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{startDecorator}</span>}
      {children}
      {endDecorator && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{endDecorator}</span>}
    </>
  );

  return React.createElement(ComponentTag as React.ElementType, props, content);
};

export default Typography;
