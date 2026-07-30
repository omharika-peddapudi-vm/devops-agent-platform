import React from 'react';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  accept?: string;
  multiple?: boolean;
}
const FileUploadInput = React.forwardRef<HTMLInputElement, Props>(
  ({ accept, multiple, className, style, ...rest }, ref) => {
    const inputStyles: React.CSSProperties = {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      width: '1px',
      height: '1px',
      margin: 0,
      padding: 0,
      opacity: 0,
      pointerEvents: 'none',
      zIndex: -1,
      ...style,
    };
 
    return (
      <input
        ref={ref}
        type="file"
        accept={accept}
        {...(multiple ? { multiple: true } : {})}
        {...rest}
        style={inputStyles}
        className={className}
      />
    );
  }
);
FileUploadInput.displayName = 'FileUploadInput';
export default FileUploadInput;