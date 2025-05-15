
import { createContext, useContext, useEffect, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode, setMode } = useThemeStore();
  const [theme, setThemeState] = useState<string>(mode || 'system');

  const setTheme = (mode: 'light' | 'dark' | 'system') => {
    setMode(mode);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
      
    const themeToApply = mode === 'system' ? systemTheme : mode;
    
    root.classList.remove('light', 'dark');
    root.classList.add(themeToApply);
    setThemeState(themeToApply);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'system') {
        const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(newSystemTheme);
        setThemeState(newSystemTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
