'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    gradient-gold text-white
    hover:shadow-gold hover:-translate-y-0.5
    active:translate-y-0
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
  `,
  secondary: `
    bg-secondary text-white
    hover:bg-secondary-light hover:-translate-y-0.5
    active:bg-secondary-dark
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  outline: `
    bg-transparent border-2 border-primary text-primary
    hover:bg-primary hover:text-white
    active:bg-primary-dark
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  ghost: `
    bg-transparent text-primary
    hover:bg-primary/10
    active:bg-primary/20
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          font-semibold tracking-wide
          transition-all duration-200 ease-out
          focus-ring
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Chargement...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
