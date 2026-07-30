import React from 'react';
export interface CardFooterProps {
  children?: React.ReactNode;
  className?: string;
}
const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`mt-[var(--gap-small)] ${className}`}>{children}</div>;
};
export default CardFooter;

