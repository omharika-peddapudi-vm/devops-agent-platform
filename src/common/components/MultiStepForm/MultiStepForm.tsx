import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Button from '../Button/Button';
import Stepper from '../Stepper/Stepper';
import { JsonStepRenderer } from './JsonFieldRenderer';

import type { FormData, MultiStepFormProps } from './types';

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  testId,
  jsonConfig,
  stepData,
  onSubmit,
  submitButtonName = 'Submit',
  onCancel,
  initialData = {},
  initialStep = 0,
  showStepLabels = false,
  onFirstStepBack,
}) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);

  const isJsonMode = !!jsonConfig;
  const totalSteps = isJsonMode ? jsonConfig!.totalSteps : stepData?.length || 0;

  let currentStepConfig;
  if (isJsonMode && jsonConfig) {
    currentStepConfig = jsonConfig.steps[`step${currentStep + 1}`];
  }

  const isLastStep = currentStep === totalSteps - 1;

  const handleStepChange = (stepName: string, data: unknown): void => {
    setFormData(prevData => ({ ...prevData, [stepName]: data }));
  };

  const handleSubmit = (): void => {
    onSubmit(formData);
  };

  const handleNext = (): void => {
    if (isLastStep) handleSubmit();
    else setCurrentStep(prev => prev + 1);
  };

  const handleBack = (): void => {
    if (currentStep === 0) {
      onFirstStepBack?.();
      return;
    }

    setIsNextDisabled(false);
    setCurrentStep(prev => prev - 1);
  };

  const setShouldGoNext = (shouldGoNext: boolean): void => {
    setIsNextDisabled(!shouldGoNext);
    if (shouldGoNext) {
      if (isLastStep) handleSubmit();
      else setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div data-testid={testId} style={{ width: '100%' }}>
      {/* ONE container for both stepper and content - guarantees same width */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: '2rem 2rem 0 2rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '896px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Stepper - same width as card below */}
          <Stepper
            steps={Array.from({ length: totalSteps }, (_, index) => ({
              label: showStepLabels
                ? ((isJsonMode && jsonConfig
                    ? jsonConfig.steps[`step${index + 1}`]?.title
                    : stepData?.[index]?.title) ?? `Step ${index + 1}`)
                : ``,
              completed: index < currentStep,
              description:
                isJsonMode && jsonConfig
                  ? jsonConfig.steps[`step${index + 1}`]?.title
                  : stepData?.[index]?.title,
            }))}
            activeStep={currentStep}
            orientation='horizontal'
            color='primary'
            size='md'
            showStepLabels={showStepLabels}
          />

          {/* Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {currentStep === 0 && (
              <Button
                variant='text'
                onClick={handleBack}
                ariaLabel='Go Back'
                style={{
                  minWidth: '40px',
                  width: '40px',
                  height: '40px',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <FiArrowLeft size={22} />
              </Button>
            )}

            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              {isJsonMode && currentStepConfig
                ? currentStepConfig.title
                : stepData?.[currentStep]?.title || `Step ${currentStep + 1}`}
            </h2>
          </div>

          {/* Step Content - same width as stepper */}
          <div style={{ paddingBottom: '2rem' }}>
            {isJsonMode && currentStepConfig ? (
              <JsonStepRenderer
                stepConfig={currentStepConfig}
                stepData={formData}
                onDataChange={(fieldName, value) => handleStepChange(fieldName, value)}
              />
            ) : stepData?.[currentStep]?.content ? (
              React.createElement(stepData[currentStep].content!, {
                data: formData,
                onDataChange: (data: unknown) => handleStepChange(stepData[currentStep].id, data),
                shouldGoNext: setShouldGoNext,
              })
            ) : (
              <div>No step configuration found</div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '896px',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {currentStep > 0 && (
              <Button variant='outlined' onClick={handleBack}>
                Back
              </Button>
            )}

            {onCancel && (
              <Button variant='text' onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
          <Button variant='contained' onClick={handleNext} disabled={isNextDisabled}>
            {isLastStep ? submitButtonName : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
