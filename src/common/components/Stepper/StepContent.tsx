import React from 'react';
import Typography from '../Typography/Typography';
export interface StepContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const StepContent: React.FC<StepContentProps> = ({ children, className, style }) => (
  <div
    className={`mt-[var(--padding-medium)] ml-[var(--padding-large)] ${className || ''}`}
    style={style}
  >
    <Typography variant="body2" color="inherit">{children}</Typography>
  </div>
);
export default StepContent;

