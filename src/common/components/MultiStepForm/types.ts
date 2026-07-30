/**
 * Multi-Step Form Types
 *
 * TypeScript interfaces and types for the reusable multi-step form system.
 * Supports JSON-based form configuration using existing common components.
 */

import React from 'react';

// Form data structure - flexible object that can hold any step data
export interface FormData {
  [stepId: string]: unknown;
}

// Field validation rules from JSON config
export interface ValidationRule {
  value: unknown;
  errorMessage: string;
}

export interface ValidationRules {
  required?: ValidationRule;
  maxLength?: ValidationRule;
  minLength?: ValidationRule;
  pattern?: ValidationRule;
  [key: string]: ValidationRule | undefined;
}

// Field configuration from JSON
export interface FieldConfig {
  id: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file';
  name: string;
  label: string;
  placeholder?: string;
  value: unknown;
  isRequired: boolean;
  hasError: boolean;
  errorMessage: string;
  validationRules?: ValidationRules;
  options?: Array<{ value: string; label: string }>; // For select, radio
  'aria-label'?: string;
  'aria-describedby'?: string;
  tooltip?: string;
  disabled?: boolean;
  multiple?: boolean; // For select
}

// Step configuration from JSON
export interface JsonStepConfig {
  title: string;
  description?: string;
  fields: {
    [fieldName: string]: FieldConfig;
  };
  validationEnabled?: boolean;
  submitLabel?: string;
}

// Complete form configuration from JSON
export interface JsonFormConfig {
  formTitle: string;
  totalSteps: number;
  steps: {
    [stepKey: string]: JsonStepConfig;
  };
  submitButtonName?: string;
  allowBack?: boolean;
  showProgress?: boolean;
}

// Props that each step component will receive (for custom step components)
export interface StepContentProps {
  // Current form data from all steps
  data: FormData;
  // Function to update data for this step
  onDataChange: (data: unknown) => void;
  // Function to control navigation (enable/disable next button)
  shouldGoNext?: (shouldGoNext: boolean) => void;
  // Ref to access next/submit button functionality
  onOk?: React.MutableRefObject<(() => void) | null>;
  // Step configuration from JSON
  stepConfig?: JsonStepConfig;
  // Current step index
  currentStep?: number;
}

// Configuration for each step (supports both JSON and custom components)
export interface StepData {
  // Display title for the step
  title: string;
  // Unique identifier for the step
  id: string;
  // JSON configuration for auto-generated fields OR custom React component
  jsonConfig?: JsonStepConfig;
  content?: React.ComponentType<StepContentProps>;
  // Whether this step requires validation before proceeding
  shouldValidate?: boolean;
}

// Props for the main MultiStepForm component
export interface MultiStepFormProps {
  // Test identifier for testing purposes
  testId: string;
  // JSON configuration for the entire form OR array of step configurations
  jsonConfig?: JsonFormConfig;
  stepData?: StepData[];
  // Function called when form is submitted (on last step)
  onSubmit: (data: FormData) => void;
  // Custom text for the submit button (default: "Submit")
  submitButtonName?: string;
  // Optional callback when user cancels/exits the form
  onCancel?: () => void;
  // Optional initial form data
  initialData?: FormData;
  // Optional initial step index
  initialStep?: number;
  // Show labels below stepper circles
  showStepLabels?: boolean;
  // Optional callback when user clicks back on the first step
  onFirstStepBack?: () => void;
}

// Navigation parameters for URL routing (if needed)
export interface NavigationParams {
  step?: string;
}
