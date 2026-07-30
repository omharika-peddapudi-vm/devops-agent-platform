 
import React, { useMemo, useRef, useState } from 'react';
import Button from '../Button/Button';
import  FileUploadInput  from './FileUploadInput';
import '../../../styles/tokens.css';
import { FiUpload } from 'react-icons/fi';
export type Size = 'small' | 'medium' | 'large';
export type Variant = 'contained' | 'outlined' | 'text';
export interface FileUploadProps {
  id?: string;
  name?: string;
  className?: string;
  value?: File | File[] | null;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
  error?: boolean | string;
  hasError?: boolean;
  errorMessage?: string;
  size?: Size;
  variant?: Variant;
  helperText?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  showFileName?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  title?: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-required'?: boolean;
}
const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  className = '',
  label,
  required,
  disabled,
  readOnly,
  tabIndex,
  error,
  hasError = false,
  errorMessage,
  size = 'medium',
  variant = 'contained',
  helperText,
  accept,
  multiple = false,
  showFileName = true,
  onChange,
  onFocus,
  onBlur,
  title,
  value,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-live': ariaLive,
  'aria-required': ariaRequired,
}) => {
  const isErrorState = Boolean(error) || hasError;
  const displayError = typeof error === 'string' ? error : errorMessage || '';
  const errorId = displayError ? `${id || 'fileupload'}-error` : undefined;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const getInitialFiles = (): File[] => {
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
  };
  const [files, setFiles] = useState<File[]>(getInitialFiles());
  const [isDragActive, setIsDragActive] = useState(false);
  const handleClick = () => {
    if (disabled || readOnly) return;
    inputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const uniqueFiles = selectedFiles.filter(
      file =>
        !files.some(
          existingFile => existingFile.name === file.name && existingFile.size === file.size,
        ),
    );
    setFiles(prev => [...prev, ...uniqueFiles]);
    if (onChange) {
      const event = {
        ...e,
        target: {
          ...e.target,
          files: {
            ...e.target.files,
            item: (index: number) => uniqueFiles[index] || null,
            length: uniqueFiles.length,
          } as FileList,
        },
      };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    const uniqueFiles = droppedFiles.filter(
      file =>
        !files.some(
          existingFile => existingFile.name === file.name && existingFile.size === file.size,
        ),
    );
    if (uniqueFiles.length) {
      setFiles(prev => [...prev, ...uniqueFiles]);
      if (onChange) {
        const event = {
          target: {
            files: {
              item: (index: number) => uniqueFiles[index] || null,
              length: uniqueFiles.length,
            } as FileList,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }
  };
  const clearFiles = () => {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = '';
    if (onChange) {
      const event = { target: { files: null } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };
  const fileNames = useMemo(() => {
    return files.length > 0 ? files.map(f => f.name).join(', ') : '';
  }, [files]);
  const showError = Boolean(error);
  const shouldShowClear = !!(files && files.length > 0) || value;
  const labelStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--text-primary)',
  };
  const fieldsetStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    border: 'none',
    padding: 0,
    margin: 0,
    position: 'relative',
  };
  const fileDisplayStyles: React.CSSProperties = {
    minWidth: '120px',
    width: 'auto',
  };
  const fileNameDisplayStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: `var(--space-2) var(--space-3)`,
    borderRadius: 'var(--radius-md)',
    border: `var(--border-width-sm) solid ${showError ? 'var(--color-error)' : 'var(--border-color)'
      }`,
    backgroundColor: 'var(--bg-surface)',
    color: showError ? 'var(--color-error)' : 'var(--text-primary)',
    transition: `all var(--transition-normal)`,
    boxShadow: isDragActive ? '0 0 0 3px var(--color-primary)' : 'none',
  };
  // const placeholderTextStyles: React.CSSProperties = {
  //   color: 'var(--text-muted)',
  // };
  const clearButtonStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-secondary)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: `color var(--transition-normal)`,
    padding: `var(--space-1) var(--space-2)`,
  };
  const helperTextStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-xs)',
    color: showError ? 'var(--color-error)' : 'var(--text-muted)',
    marginTop: 'var(--space-1)',
  };
  const errorMessageStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-error)',
    marginTop: 'var(--space-1)',
  };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
      className={className}
    >
      {label ? (
        <label style={labelStyles} htmlFor={id}>
          {label} {required ? <span style={{ color: 'var(--color-error)' }}>*</span> : null}
        </label>
      ) : null}
      <fieldset
        style={fieldsetStyles}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <legend className='sr-only'>{ariaLabel || 'File upload dropzone'}</legend>
        <FileUploadInput
          ref={inputRef}
          id={id}
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          tabIndex={tabIndex}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={errorId || ariaDescribedby}
          aria-disabled={ariaDisabled ?? disabled}
          aria-invalid={isErrorState}
          aria-live={ariaLive}
          aria-required={ariaRequired ?? required}
        />
        <Button
          onClick={handleClick}
          variant={variant}
          size={size}
          disabled={disabled}
          aria-disabled={disabled}
          className='!px-4'
          startIcon={<FiUpload className="w-5 h-5" />}
        >
          Upload files
        </Button>
{showFileName && (
  <div style={fileDisplayStyles}>
    <div
      style={fileNameDisplayStyles}
      title={typeof title === 'string' ? title : fileNames}
      aria-live={ariaLive}
    >
      {fileNames ? fileNames : 'No files selected'}
    </div>
  </div>
)}
        {shouldShowClear ? (
          <button
            type='button'
            onClick={clearFiles}
            style={clearButtonStyles}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            }}
            aria-label='Clear files'
          >
            Clear
          </button>
        ) : null}
      </fieldset>
      {helperText ? <div style={helperTextStyles}>{helperText}</div> : null}
      {isErrorState && displayError ? (
        <div id={errorId} style={errorMessageStyles} role='alert'>
          {displayError}
        </div>
      ) : null}
    </div>
  );
};
export default FileUpload;
 
 