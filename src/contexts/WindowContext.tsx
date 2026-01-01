import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { WindowState, Position, Size } from '../types';

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  minimizingWindowId: string | null;
  closingWindowId: string | null;
  openWindow: (window: Omit<WindowState, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: Position) => void;
  resizeWindow: (id: string, size: Size) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [minimizingWindowId, setMinimizingWindowId] = useState<string | null>(null);
  const [closingWindowId, setClosingWindowId] = useState<string | null>(null);
  const [topZIndex, setTopZIndex] = useState(100);

  const openWindow = useCallback((window: Omit<WindowState, 'zIndex'>) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === window.id);
      if (existing) {
        return prev.map(w => 
          w.id === window.id 
            ? { ...w, isMinimized: false, zIndex: topZIndex + 1 }
            : w
        );
      }
      return [...prev, { ...window, zIndex: topZIndex + 1 }];
    });
    setTopZIndex(prev => prev + 1);
    setActiveWindowId(window.id);
  }, [topZIndex]);

  const closeWindow = useCallback((id: string) => {
    setClosingWindowId(id);
    setActiveWindowId(prev => prev === id ? null : prev);
    setTimeout(() => {
      setWindows(prev => prev.filter(w => w.id !== id));
      setClosingWindowId(null);
    }, 200);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setMinimizingWindowId(id);
    setActiveWindowId(prev => prev === id ? null : prev);
    setTimeout(() => {
      setWindows(prev => prev.map(w => 
        w.id === id ? { ...w, isMinimized: true } : w
      ));
      setMinimizingWindowId(null);
    }, 300);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: true } : w
    ));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: false, isMinimized: false, zIndex: topZIndex + 1 } : w
    ));
    setTopZIndex(prev => prev + 1);
    setActiveWindowId(id);
  }, [topZIndex]);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: topZIndex + 1 } : w
    ));
    setTopZIndex(prev => prev + 1);
    setActiveWindowId(id);
  }, [topZIndex]);

  const moveWindow = useCallback((id: string, position: Position) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const resizeWindow = useCallback((id: string, size: Size) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  }, []);

  return (
    <WindowContext.Provider value={{
      windows,
      activeWindowId,
      minimizingWindowId,
      closingWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      focusWindow,
      moveWindow,
      resizeWindow,
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
}

