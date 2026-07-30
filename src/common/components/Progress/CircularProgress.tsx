import React from 'react';
import '../../../styles/tokens.css';
export interface CircularProgressProps {
  id?: string;
  className?: string;
  value?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  style?: React.CSSProperties;
  thickness?: number;
}
const sizeConfig: Record<'sm' | 'md' | 'lg', number> = {
  sm: 24,
  md: 40,
  lg: 56,
};
const colorMap: Record<string, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  inherit: 'inherit',
};
const CircularProgress: React.FC<CircularProgressProps> = ({
  id,
  value = 0,
  size = 'md',
  variant = 'indeterminate',
  color = 'primary',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-valuenow': ariaValueNow,
  'aria-valuetext': ariaValueText,
  style,
  thickness = 4,
}) => {
  const numericSize = sizeConfig[size] || 40;
  const radius = (numericSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    variant === 'determinate' ? circumference - (value / 100) * circumference : circumference * 0.7;
  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    ...style,
  };
  const svgStyle: React.CSSProperties = {
    animation:
      variant === 'indeterminate' ? `spin var(--transition-slow) linear infinite` : undefined,
  };
  const circleStyle: React.CSSProperties = {
    stroke: colorMap[color],
    strokeDasharray: circumference,
    strokeDashoffset: offset,
    strokeLinecap: 'round',
    transition:
      variant === 'determinate' ? `stroke-dashoffset var(--transition-normal)` : undefined,
  };
  const backgroundCircleStyle: React.CSSProperties = {
    stroke: 'var(--bg-muted)',
  };
  return (
    <div style={containerStyle} className={className}>
      {variant === 'determinate' ? (
        <progress
          id={id}
          value={value}
          max={100}
          style={style}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuetext={ariaValueText}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        />
      ) : (
        <svg
          id={id}
          width={numericSize}
          height={numericSize}
          style={svgStyle}
          role='progressbar'
          aria-valuenow={ariaValueNow}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={ariaValueText}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          viewBox={`0 0 ${numericSize} ${numericSize}`}
        >
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          {}
          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}
            r={radius}
            fill='none'
            strokeWidth={thickness}
            style={backgroundCircleStyle}
          />
          {}
          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}
            r={radius}
            fill='none'
            strokeWidth={thickness}
            style={circleStyle}
          />
        </svg>
      )}
    </div>
  );
};
export default CircularProgress;
