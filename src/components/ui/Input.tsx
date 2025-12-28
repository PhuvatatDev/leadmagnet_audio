'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-charcoal"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3
            bg-cream border-2 rounded-xl
            text-foreground placeholder:text-gray
            transition-all duration-200
            focus-ring
            ${error
              ? 'border-error focus:border-error'
              : 'border-beige focus:border-primary hover:border-primary-muted'
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-beige
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
