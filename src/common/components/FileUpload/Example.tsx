import React, { useState } from 'react';
import FileUpload from './index';
const Example: React.FC = () => {
  const [lastChange, setLastChange] = useState<string>('');
  return (
    <div className="p-4">
      <FileUpload
        id="demo-upload"
        name="demo"
        label="Attach file"
        helperText="Allowed types: png, jpg, pdf"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastChange(e.target.files ? Array.from(e.target.files).map((f) => f.name).join(', ') : '')}
      />
      <div className="mt-3 text-sm text-gray-600">Selected: {lastChange || '—'}</div>
    </div>
  );
};
export default Example;

