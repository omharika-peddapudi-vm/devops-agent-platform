import React from 'react';

import MultiStepForm from '../MultiStepForm/MultiStepForm';

import type { PageEngineProps } from './types';

const PageEngine: React.FC<PageEngineProps> = ({
  steps,
  testId = 'page-engine',
  submitButtonName,
  initialData,
  initialStep,
  onSubmit,
  onCancel,
  showStepLabels,
  onFirstStepBack,
}) => {
  const stepData = steps.map(step => ({
    id: step.id,
    title: step.title,
    content: step.component,
  }));

  return (
    <MultiStepForm
      testId={testId}
      stepData={stepData}
      submitButtonName={submitButtonName}
      initialData={initialData}
      initialStep={initialStep}
      onSubmit={onSubmit}
      onCancel={onCancel}
      showStepLabels={showStepLabels}
      onFirstStepBack={onFirstStepBack}
    />
  );
};

export default PageEngine;
