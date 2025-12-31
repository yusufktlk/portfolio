import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'green';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const themes = {
  dark: {
    '--bg-primary': '#1C1D1C',
    '--bg-secondary': '#232423',
    '--bg-tertiary': '#282928',
    '--menubar-bg': 'rgba(28, 29, 28, 0.85)',
    '--menubar-text': '#f5f5f5',
    '--dropdown-bg': '#252625',
    '--text-primary': '#f5f5f5',
    '--text-secondary': 'rgba(255, 255, 255, 0.75)',
    '--text-muted': 'rgba(255, 255, 255, 0.4)',
    '--accent-color': '#8B9A7D',
    '--accent-hover': '#7a8a6d',
    '--border-color': 'rgba(255, 255, 255, 0.08)',
  },
  light: {
    '--bg-primary': '#f5f5f5',
    '--bg-secondary': '#ffffff',
    '--bg-tertiary': '#e8e8e8',
    '--menubar-bg': 'rgba(255, 255, 255, 0.85)',
    '--menubar-text': '#1a1a1a',
    '--dropdown-bg': '#ffffff',
    '--text-primary': '#1a1a1a',
    '--text-secondary': 'rgba(0, 0, 0, 0.7)',
    '--text-muted': 'rgba(0, 0, 0, 0.4)',
    '--accent-color': '#5a7052',
    '--accent-hover': '#4a6042',
    '--border-color': 'rgba(0, 0, 0, 0.1)',
  },
  green: {
    '--bg-primary': '#0d1f0d',
    '--bg-secondary': '#132613',
    '--bg-tertiary': '#1a331a',
    '--menubar-bg': 'rgba(13, 31, 13, 0.9)',
    '--menubar-text': '#a8d5a2',
    '--dropdown-bg': '#132613',
    '--text-primary': '#c8e6c2',
    '--text-secondary': 'rgba(168, 213, 162, 0.8)',
    '--text-muted': 'rgba(168, 213, 162, 0.5)',
    '--accent-color': '#4a9c4a',
    '--accent-hover': '#3d843d',
    '--border-color': 'rgba(168, 213, 162, 0.15)',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    const themeVars = themes[theme];
    
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

