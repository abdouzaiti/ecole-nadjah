import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-light shadow-md hover:shadow-lg',
    navy: 'bg-navy text-white hover:bg-navy-light',
    accent: 'bg-blue-accent text-white hover:bg-blue-accent/90 shadow-md',
    secondary: 'bg-white text-navy hover:bg-gray-50 border border-gray-200',
    outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
    ghost: 'text-navy hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg font-medium'
  };

  return (
    <button 
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  key?: React.Key;
}

export function Card({ children, className, hoverEffect = true, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        'bg-white rounded-2xl p-6 border border-gray-100 premium-shadow transition-all duration-300',
        hoverEffect && 'hover:translate-y-[-4px] hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'navy', className }: { children: ReactNode, variant?: 'navy' | 'accent' | 'red' | 'green', className?: string }) {
  const colors = {
    navy: 'bg-navy/10 text-navy',
    accent: 'bg-blue-accent/10 text-blue-accent',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600'
  };
  
  return (
    <span className={cn('px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider', colors[variant], className)}>
      {children}
    </span>
  );
}
