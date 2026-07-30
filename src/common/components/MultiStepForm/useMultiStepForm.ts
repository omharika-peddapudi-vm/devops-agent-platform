
import { useState, useCallback } from 'react';
import type { FormData } from './types';

interface UseMultiStepFormOptions {
  initialData?: FormData;
  totalSteps: number;
  onStepChange?: (currentStep: number, stepData: unknown) => void;
  onComplete?: (formData: FormData) => void;
}

interface UseMultiStepFormReturn {
  // State
  formData: FormData;
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  
  // Actions
  setFormData: (data: FormData) => void;
  updateStepData: (stepId: string, data: unknown) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  complete: () => void;
}

export const useMultiStepForm = ({
  initialData = {},
  totalSteps,
  onStepChange,
  onComplete
}: UseMultiStepFormOptions): UseMultiStepFormReturn => {
  const [formData, setFormDataState] = useState<FormData>(initialData);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Computed values
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  /**
   * Update the entire form data
   */
  const setFormData = useCallback((data: FormData) => {
    setFormDataState(data);
  }, []);

  /**
   * Update data for a specific step
   */
  const updateStepData = useCallback((stepId: string, data: unknown) => {
    setFormDataState(prev => ({
      ...prev,
      [stepId]: data
    }));
    
    onStepChange?.(currentStep, data);
  }, [currentStep, onStepChange]);

  /**
   * Navigate to the next step
   */
  const goToNext = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
  }, [isLastStep]);

  /**
   * Navigate to the previous step
   */
  const goToPrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  }, [isFirstStep]);

  /**
   * Navigate to a specific step
   */
  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  /**
   * Reset the form to initial state
   */
  const reset = useCallback(() => {
    setFormDataState(initialData);
    setCurrentStep(0);
  }, [initialData]);

  /**
   * Complete the form (trigger onComplete callback)
   */
  const complete = useCallback(() => {
    onComplete?.(formData);
  }, [formData, onComplete]);

  return {
    // State
    formData,
    currentStep,
    isFirstStep,
    isLastStep,
    progress,
    
    // Actions
    setFormData,
    updateStepData,
    goToNext,
    goToPrevious,
    goToStep,
    reset,
    complete
  };
};