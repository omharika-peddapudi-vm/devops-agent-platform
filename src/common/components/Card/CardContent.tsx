import React from 'react';
export interface CardContentProps {
  children?: React.ReactNode;
  className?: string;
}
const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`text-[var(--font-size-medium)] leading-[var(--line-height-small)] ${className}`}>{children}</div>;
};
export default CardContent;

