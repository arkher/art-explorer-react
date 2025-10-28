import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="bg-white dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-900"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

