import { useState, useCallback, useEffect, useRef } from 'react';
import type { DesktopIcon as DesktopIconType, Position } from '../../types';
import { DesktopIcon } from './DesktopIcon';
import { useWallpaper } from '../../contexts/WallpaperContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ContextMenu } from '../ContextMenu';
import type { ContextMenuItem } from '../ContextMenu';
import './Desktop.css';

interface DesktopProps {
  icons: DesktopIconType[];
}

const ICON_POSITIONS_VERSION = 7;

interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
}

export function Desktop({ icons: initialIcons }: DesktopProps) {
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [iconPositions, setIconPositions] = useState<Record<string, Position>>(() => {
    const savedVersion = localStorage.getItem('desktop-icon-positions-version');
    if (savedVersion !== String(ICON_POSITIONS_VERSION)) {
      localStorage.removeItem('desktop-icon-positions');
      localStorage.setItem('desktop-icon-positions-version', String(ICON_POSITIONS_VERSION));
      return {};
    }
    const saved = localStorage.getItem('desktop-icon-positions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ isOpen: false, x: 0, y: 0 });
  const desktopRef = useRef<HTMLDivElement>(null);
  const { wallpaper } = useWallpaper();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const desktop = desktopRef.current;
    if (!desktop) return;

    const handleNativeContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({
        isOpen: true,
        x: e.clientX,
        y: e.clientY,
      });
      return false;
    };

    desktop.addEventListener('contextmenu', handleNativeContextMenu);
    return () => {
      desktop.removeEventListener('contextmenu', handleNativeContextMenu);
    };
  }, []);

  const handleDesktopClick = useCallback(() => {
    setSelectedIconId(null);
  }, []);

  const handleIconSelect = useCallback((id: string) => {
    setSelectedIconId(id);
  }, []);

  const handleIconMove = useCallback((id: string, position: Position) => {
    setIconPositions(prev => {
      const newPositions = { ...prev, [id]: position };
      localStorage.setItem('desktop-icon-positions', JSON.stringify(newPositions));
      return newPositions;
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu({ isOpen: false, x: 0, y: 0 });
  }, []);

  const resetIconPositions = useCallback(() => {
    localStorage.removeItem('desktop-icon-positions');
    setIconPositions({});
  }, []);

  const contextMenuItems: ContextMenuItem[] = [
    {
      id: 'refresh',
      label: 'Refresh',
      icon: '🔄',
      shortcut: 'F5',
      onClick: () => window.location.reload(),
    },
    { id: 'divider1', label: '', divider: true },
    {
      id: 'reset-icons',
      label: 'Reset Icon Positions',
      icon: '📍',
      onClick: resetIconPositions,
    },
    {
      id: 'sort-icons',
      label: 'Sort Icons by Name',
      icon: '📋',
      onClick: resetIconPositions,
    },
    { id: 'divider2', label: '', divider: true },
    {
      id: 'theme-dark',
      label: 'Dark Theme',
      icon: theme === 'dark' ? '✓' : ' ',
      onClick: () => setTheme('dark'),
    },
    {
      id: 'theme-light',
      label: 'Light Theme',
      icon: theme === 'light' ? '✓' : ' ',
      onClick: () => setTheme('light'),
    },
    {
      id: 'theme-forest',
      label: 'Forest Theme',
      icon: theme === 'green' ? '✓' : ' ',
      onClick: () => setTheme('green'),
    },
    { id: 'divider3', label: '', divider: true },
    {
      id: 'about',
      label: 'About YusufOS',
      icon: 'ℹ️',
      onClick: () => {
        const settingsIcon = initialIcons.find(i => i.id === 'settings');
        settingsIcon?.onOpen();
      },
    },
  ];

  const getIconPosition = (icon: DesktopIconType): Position => {
    return iconPositions[icon.id] || icon.position;
  };

  return (
    <div 
      ref={desktopRef}
      className="desktop" 
      onClick={handleDesktopClick}
      style={{ backgroundImage: `url('/${wallpaper}')` }}
    >
      <div className="desktop-icons">
        {initialIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={{ ...icon, position: getIconPosition(icon) }}
            isSelected={selectedIconId === icon.id}
            onSelect={handleIconSelect}
            onMove={handleIconMove}
          />
        ))}
      </div>

      {contextMenu.isOpen && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}
