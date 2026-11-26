import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'wrotx_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  // Sync state on client mount with DOM and localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || (saved !== 'light' && document.documentElement.classList.contains('dark'))) {
        setThemeState('dark');
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#090D16');
      }
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#FFFFFF');
      }
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage write errors (e.g. incognito)
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
