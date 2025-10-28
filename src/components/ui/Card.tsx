import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn('rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-300', className)}
      {...props}
    />
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  );
};

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={cn('p-6 pt-0 dark:text-gray-100', className)} {...props} />;
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
  );
};

