import '../../../styles/tokens.css';

import React, { useState } from 'react';

import Tooltip from '../Tooltip/Tooltip';

export interface StepperStep {
  label: React.ReactNode;
  content?: React.ReactNode;
  completed?: boolean;
  description?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}
export interface StepperProps {
  steps: StepperStep[];
  id?: string;
  className?: string;
  type?: 'linear' | 'non-linear';
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  title?: string;
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  connector?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  size?: 'sm' | 'md' | 'lg';
  showStepLabels?: boolean;
  onClick?: (stepIndex: number) => void;
  onFocus?: (stepIndex: number) => void;
  onBlur?: (stepIndex: number) => void;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'step' | 'page' | 'location' | 'date' | 'time' | boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

const sizeConfig: Record<'sm' | 'md' | 'lg', { size: string; fontSize: string }> = {
  sm: { size: '40px', fontSize: '12px' },
  md: { size: '50px', fontSize: '16px' },
  lg: { size: '68px', fontSize: '22px' },
};

const Stepper: React.FC<StepperProps> = ({
  steps,
  id,
  className,
  type = 'linear',
  value: controlledValue,
  defaultValue = 0,
  disabled = false,
  min = 0,
  max = steps.length - 1,
  step: stepIncrement = 1,
  title,
  activeStep: legacyActiveStep,
  orientation = 'horizontal',
  size = 'md',
  showStepLabels = false,
  onClick,
  onFocus,
  onBlur,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive = 'polite',
}) => {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(Math.max(min ?? 0, defaultValue));
  const currentStep = isControlled
    ? Math.min(controlledValue, max ?? steps.length - 1)
    : (legacyActiveStep ?? uncontrolledValue);

  const cfg = sizeConfig[size] || sizeConfig.md;

  const handleStepClick = (stepIndex: number) => {
    if (disabled || steps[stepIndex]?.disabled) return;
    const validatedIndex = Math.max(min ?? 0, Math.min(stepIndex, max ?? steps.length - 1));
    if (type === 'linear' && validatedIndex > currentStep) {
      const canProceed = steps.slice(0, validatedIndex).every(s => s.completed);
      if (!canProceed) return;
    }
    if (!isControlled) setUncontrolledValue(validatedIndex);
    onClick?.(validatedIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, stepIndex: number) => {
    if (disabled) return;
    let nextStep: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextStep = Math.min(currentStep + (stepIncrement ?? 1), max ?? steps.length - 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextStep = Math.max(currentStep - (stepIncrement ?? 1), min ?? 0);
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextStep = min ?? 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextStep = max ?? steps.length - 1;
    }
    if (nextStep !== null && nextStep !== stepIndex) handleStepClick(nextStep);
  };

  const getButtonStyle = (
    isActive: boolean,
    isCompleted: boolean,
    isDisabled: boolean | undefined,
  ): React.CSSProperties => {
    const bg = isActive || isCompleted ? 'var(--color-info)' : 'var(--color-gray-300)';
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: `2px solid ${bg}`,
      width: cfg.size,
      height: cfg.size,
      minWidth: cfg.size,
      minHeight: cfg.size,
      fontSize: cfg.fontSize,
      fontWeight: '600',
      backgroundColor: bg,
      color: 'white',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'all 0.2s',
      flexShrink: 0,
    };
  };

  const stepperContent = (
    <div
      id={id}
      role='tablist'
      aria-orientation={orientation}
      aria-label={ariaLabel || `Stepper with ${steps.length} steps`}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled ?? disabled}
      aria-controls={ariaControls}
      aria-live={ariaLive}
      className={className}
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        alignItems: showStepLabels ? 'flex-start' : 'center',
        width: '100%',
        ...style,
      }}
    >
      {steps.map((stepData, stepIndex) => {
        const isActive = stepIndex === currentStep;
        const isCompleted = stepData.completed ?? stepIndex < currentStep;
        const isDisabled = disabled || stepData.disabled;
        const canNavigate =
          type === 'non-linear' ||
          stepIndex <= currentStep ||
          (isCompleted && stepIndex === currentStep + 1);
        const stepKey = `step-${
          typeof stepData.label === 'string'
            ? stepData.label.toLowerCase().replaceAll(/\s+/g, '-')
            : stepIndex
        }`;
        const stepLabel =
          typeof stepData.label === 'string' ? stepData.label : `Step ${stepIndex + 1}`;

        return (
          <React.Fragment key={stepKey}>
            {/* Step wrapper */}
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
              <button
                type='button'
                style={getButtonStyle(isActive, isCompleted, isDisabled)}
                aria-label={ariaLabel || stepLabel}
                aria-current={isActive ? ariaCurrent || 'step' : undefined}
                aria-selected={isActive}
                onClick={() => handleStepClick(stepIndex)}
                onKeyDown={e => handleKeyDown(e, stepIndex)}
                onFocus={() => onFocus?.(stepIndex)}
                onBlur={() => onBlur?.(stepIndex)}
                disabled={isDisabled || !canNavigate}
                tabIndex={isActive ? 0 : -1}
              >
                {stepData.icon ?? <span>{stepIndex + 1}</span>}
              </button>

              {showStepLabels && (
                <span
                  style={{
                    fontSize: '12px',
                    color: isActive ? 'var(--color-info)' : 'var(--color-gray-500)',
                    textAlign: 'center',
                    maxWidth: '80px',
                    wordBreak: 'break-word',
                  }}
                >
                  {stepLabel}
                </span>
              )}
            </div>
            {/* Connector only between circles - NOT after last */}
            {stepIndex < steps.length - 1 && orientation === 'horizontal' && (
              <div
                style={{
                  flex: '1 1 0',
                  height: '2px',
                  marginTop: showStepLabels ? `calc(${cfg.size} / 2)` : undefined,
                  alignSelf: showStepLabels ? 'flex-start' : undefined,
                  backgroundColor: isCompleted ? 'var(--color-info)' : 'var(--color-gray-300)',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return title ? <Tooltip title={title}>{stepperContent}</Tooltip> : stepperContent;
};

export default Stepper;
