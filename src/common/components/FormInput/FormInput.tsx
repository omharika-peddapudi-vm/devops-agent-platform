import React, { forwardRef } from 'react';
export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  required?: boolean;
  isRequired?: boolean;
  error?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  helperText?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'standard';
  inputRef?: React.Ref<HTMLInputElement>;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
}
const sizeMap: Record<string, string> = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-4 py-3',
  lg: 'text-lg px-4 py-3',
};
const variantMap: Record<string, string> = {
  outlined: 'border border-gray-300 rounded-lg',
  filled: 'bg-gray-100 border-0 rounded-lg',
  standard: 'border-0 border-b border-gray-300 rounded-0',
};
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      name,
      className = '',
      type = 'text',
      placeholder,
      value,
      label,
      required = false,
      isRequired,
      disabled = false,
      readOnly = false,
      error = false,
      hasError = false,
      errorMessage,
      helperText,
      size = 'md',
      variant = 'outlined',
      inputRef,
      onChange,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-disabled': ariaDisabled,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      'aria-live': ariaLive,
      ...rest
    },
    ref,
  ) => {
    const isErrorState = error || hasError;
    const isFieldRequired = required || isRequired || false;
    const displayErrorText = errorMessage || (typeof helperText === 'string' ? helperText : '');
    const errorId = isErrorState && displayErrorText ? `${id || 'input'}-error` : undefined;
    const inputRef_ = ref || inputRef;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {label}
            {isFieldRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={inputRef_}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          required={isFieldRequired}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={errorId || (helperText ? `${id}-helper` : ariaDescribedby)}
          aria-disabled={ariaDisabled || disabled}
          aria-invalid={ariaInvalid || isErrorState}
          aria-required={ariaRequired || isFieldRequired}
          aria-live={ariaLive}
          className={`w-full transition-all duration-200 text-gray-900 placeholder-gray-400 focus:outline-none
            ${sizeMap[size]}
            ${variantMap[variant]}
            ${
              isErrorState
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-400'
            }
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
            ${className}`}
          {...rest}
        />
        {(helperText || (isErrorState && errorMessage)) && (
          <p
            id={errorId || `${id}-helper`}
            className={`text-xs mt-1 font-medium ${
              isErrorState ? 'text-red-500' : 'text-gray-500'
            }`}
            role={isErrorState ? 'alert' : undefined}
          >
            {isErrorState && errorMessage ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  },
);
FormInput.displayName = 'FormInput';
export default FormInput;

