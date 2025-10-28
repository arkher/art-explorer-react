import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const motionProps = props as HTMLMotionProps<'button'>;
    return (
      <motion.button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
          variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
          variant === 'outline' && 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100',
          variant === 'secondary' && 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600',
          variant === 'ghost' && 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100',
          variant === 'link' && 'text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline',
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-9 rounded-md px-3',
          size === 'lg' && 'h-11 rounded-md px-8',
          size === 'icon' && 'h-10 w-10',
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

