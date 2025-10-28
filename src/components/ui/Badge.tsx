import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variant === 'default' && 'border-transparent bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'border-transparent bg-gray-200 text-gray-900 hover:bg-gray-300',
        variant === 'destructive' && 'border-transparent bg-red-600 text-white hover:bg-red-700',
        variant === 'outline' && 'text-gray-900',
        className
      )}
      {...props}
    />
  );
};

