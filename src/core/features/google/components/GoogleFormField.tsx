'use client';

import { ChangeEvent, useState } from 'react';

import { cn } from '@/core/utils';

import { InfoIcon } from '@/core/features/google/components/icons/InfoIcon';
import './GoogleFormField.css';

type GoogleFormFieldProps = {
  label: string;
  name: string;
  type?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

const GoogleFormField = ({
  label,
  name,
  type = 'text',
  inputRef,
  error,
  onChange,
  onPressEnter,
}: GoogleFormFieldProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setIsActive(!!e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && event.key === 'Enter') {
      event.preventDefault();
      onPressEnter();
    }
  };

  return (
    <div
      className={cn(`g-form-field`, {
        error: !!error,
        active: isActive,
      })}
    >
      <input
        ref={inputRef}
        className="g-form-field_input"
        id={name}
        name={name}
        type={type}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <label className="g-form-field_label" htmlFor={name}>
        {label}
      </label>
      {error && (
        <div className="g-form-field_error">
          <InfoIcon />
          {error}
        </div>
      )}
    </div>
  );
};

export default GoogleFormField;
