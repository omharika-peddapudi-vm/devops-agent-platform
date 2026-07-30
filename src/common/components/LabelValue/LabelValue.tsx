import React from 'react';
import Typography from '../Typography';
import type { ColorVariant } from '../Typography';

export type Orientation = 'horizontal' | 'vertical';

export interface LabelValueProps {
  label: React.ReactNode;
  value: React.ReactNode;
  orientation?: Orientation;
  className?: string;
  labelVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  valueVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  labelColor?: ColorVariant | string;
  valueColor?: ColorVariant | string;
}

const LabelValue = ({
  label,
  value,
  orientation = 'horizontal',
  className = '',
  labelVariant = 'body1',
  valueVariant = 'body1',
  labelColor = 'secondary',
  valueColor = 'primary',
}: LabelValueProps) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={`${isVertical ? 'flex flex-col gap-1' : 'flex items-center justify-between'} ${className}`}>
      <Typography variant={labelVariant} color={labelColor} className={isVertical ? '' : ''}>
        {label}
      </Typography>

      <Typography variant={valueVariant} color={valueColor} className={isVertical ? '' : ''}>
        {value}
      </Typography>
    </div>
  );
};

export default LabelValue;
