/**
 * Multi-Step Form Module
 * 
 * Exports the reusable multi-step form component and related types.
 * Provides a clean API for implementing multi-step forms throughout the application.
 */

export { default } from './MultiStepForm';

export { useMultiStepForm } from './useMultiStepForm';
export type { 
  FormData, 
  StepData, 
  StepContentProps, 
  MultiStepFormProps, 
  NavigationParams 
} from './types';