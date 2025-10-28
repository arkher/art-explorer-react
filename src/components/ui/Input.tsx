import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 px-3 py-2',
          'text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'text-gray-900 dark:text-gray-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };

