/**
 * JSON-based Field Renderer
 * 
 * Renders form fields dynamically based on JSON configuration.
 * Uses existing common components like Login.tsx - spreading field config directly.
 * 
 * Follows the same pattern as Login.tsx for consistency.
 */

import React from 'react';
import type { FieldConfig, FormData } from './types';

// Import common components
import TextField from '../TextField/TextField';
import Select from '../Select/Select';
import Checkbox from '../Checkbox/Checkbox';
import NumberField from '../NumberField/NumberField';

interface FieldRendererProps {
  fieldConfig: FieldConfig;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

/**
 * Renders a single form field based on its configuration
 * Following the same pattern as Login.tsx
 */
const FieldRenderer: React.FC<FieldRendererProps> = ({
  fieldConfig,
  onChange
}) => {
  const { type, value, validationRules, ...restConfig } = fieldConfig;

  // Convert unknown value to appropriate type for each component
  const convertValue = (val: unknown, fieldType: string): string | number | undefined => {
    if (val === null || val === undefined) return undefined;
    
    if (fieldType === 'number') {
      return typeof val === 'number' ? val : Number(val) || undefined;
    }
    
    return String(val);
  };

  const convertedValue = convertValue(value, type);
  const fieldProps = { ...restConfig, value: convertedValue, onChange };

  // Render based on field type, spreading the config with converted value
  if (type === 'text' || type === 'email' || type === 'textarea') {
    return <TextField {...fieldProps} />;
  }
  
  if (type === 'select') {
    return <Select {...fieldProps} />;
  }
  
  if (type === 'number') {
    return <NumberField {...fieldProps} />;
  }
  
  if (type === 'checkbox') {
    return <Checkbox {...fieldProps} />;
  }

  // Default fallback to TextField
  return <TextField {...fieldProps} />;
};

interface JsonStepRendererProps {
  stepConfig: {
    title: string;
    description?: string;
    fields: { [fieldName: string]: FieldConfig };
  };
  stepData: FormData;
  onDataChange: (fieldName: string, value: unknown) => void;
  onValidationChange?: (isValid: boolean) => void;
}

/**
 * Renders an entire step based on JSON configuration
 * Following the same pattern as Login.tsx
 */
export const JsonStepRenderer: React.FC<JsonStepRendererProps> = ({
  stepConfig,
  onDataChange
}) => {
  const { fields, description } = stepConfig;

  // Handle input change like Login.tsx does
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    onDataChange(id, value);
  };

  return (
    <div className="space-y-6">
      {description && (
        <div className="text-sm text-gray-600 mb-4">
          {description}
        </div>
      )}
      
      <div className="space-y-4">
        {Object.entries(fields).map(([fieldName, fieldConfig]) => (
          <FieldRenderer
            key={fieldName}
            fieldConfig={fieldConfig}
            onChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FieldRenderer;
