import React from 'react';
export interface CardHeaderProps {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}
const CardHeader: React.FC<CardHeaderProps> = ({ title, subheader, avatar, action, className = '' }) => {
  return (
    <div className={`flex items-center justify-between gap-[var(--gap-small)] ${className}`}>
      <div className="flex items-center gap-[var(--gap-small)]">
        {avatar && <div className="flex-shrink-0">{avatar}</div>}
        <div>
          {title && <div className="font-medium text-[var(--font-size-medium)]">{title}</div>}
          {subheader && <div className="text-[var(--font-size-small)] text-[var(--color-text-secondary)]">{subheader}</div>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
export default CardHeader;

