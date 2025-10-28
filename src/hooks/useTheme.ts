import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const applyTheme = () => {
      const storedTheme = localStorage.getItem('theme') || 'light';
      const html = document.documentElement;
      
      // Force remove dark first
      html.classList.remove('dark');
      html.removeAttribute('data-theme');
      html.setAttribute('data-theme', 'light');
      
      if (storedTheme === 'dark') {
        html.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };
    
    applyTheme();

    // Simple interval check instead of observer
    const interval = setInterval(() => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      setIsDark(isCurrentlyDark);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = !isDark;
    
    if (newTheme) {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
        
    setIsDark(newTheme);
  };

  return { isDark, toggleTheme };
};

