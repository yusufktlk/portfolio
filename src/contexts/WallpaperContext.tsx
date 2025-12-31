import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WallpaperContextType {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
}

const WallpaperContext = createContext<WallpaperContextType | null>(null);

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<string>(() => {
    const saved = localStorage.getItem('portfolio-wallpaper');
    return saved || 'bg4.png';
  });

  const setWallpaper = (newWallpaper: string) => {
    setWallpaperState(newWallpaper);
    localStorage.setItem('portfolio-wallpaper', newWallpaper);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--wallpaper-url', `url('/${wallpaper}')`);
  }, [wallpaper]);

  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error('useWallpaper must be used within a WallpaperProvider');
  }
  return context;
}

