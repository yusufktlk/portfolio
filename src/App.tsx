import { useState, useMemo, useCallback, useEffect } from 'react';
import { WindowProvider, useWindows } from './contexts/WindowContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WallpaperProvider } from './contexts/WallpaperContext';
import { Desktop } from './components/Desktop';
import { Dock } from './components/Dock';
import { WindowManager } from './components/WindowManager';
import { MenuBar } from './components/MenuBar';
import { BootScreen } from './components/BootScreen';
import { Spotlight } from './components/Spotlight';
import { NotesApp } from './apps/NotesApp';
import { BrowserApp } from './apps/BrowserApp';
import { TerminalApp } from './apps/TerminalApp';
import { SettingsApp } from './apps/SettingsApp';
import { SnakeGame } from './apps/SnakeGame';
import { MusicPlayer } from './apps/MusicPlayer';
import { Calculator } from './apps/Calculator';
import { CalendarApp } from './apps/CalendarApp';
import { PaintApp } from './apps/PaintApp';
import { PianoApp } from './apps/PianoApp';
import { PomodoroApp } from './apps/PomodoroApp';
import { GTA6App } from './apps/GTA6App';
import { TicTacToe } from './apps/TicTacToe';
import type { DesktopIcon, DockItem } from './types';
import './App.css';

function DesktopEnvironment() {
  const { openWindow, windows, restoreWindow, closeWindow, minimizeWindow, activeWindowId } = useWindows();
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  const openNotes = useCallback(() => {
    openWindow({
      id: 'notes',
      title: 'Notes',
      icon: '📝',
      position: { x: 150, y: 80 },
      size: { width: 550, height: 450 },
      minSize: { width: 300, height: 200 },
      isMinimized: false,
      isMaximized: false,
      component: NotesApp,
    });
  }, [openWindow]);

  const openBrowser = useCallback(() => {
    openWindow({
      id: 'browser',
      title: 'Browser',
      icon: '🌐',
      position: { x: 160, y: 10 },
      size: { width: 1200, height: 600 },
      minSize: { width: 400, height: 300 },
      isMinimized: false,
      isMaximized: false,
      component: BrowserApp,
    });
  }, [openWindow]);

  const openTerminal = useCallback(() => {
    openWindow({
      id: 'terminal',
      title: 'Terminal',
      icon: '>_',
      position: { x: 200, y: 100 },
      size: { width: 750, height: 480 },
      minSize: { width: 400, height: 250 },
      isMinimized: false,
      isMaximized: false,
      component: TerminalApp,
    });
  }, [openWindow]);

  const openSettings = useCallback(() => {
    openWindow({
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      position: { x: 220, y: 30 },
      size: { width: 800, height: 550 },
      minSize: { width: 500, height: 350 },
      isMinimized: false,
      isMaximized: false,
      component: SettingsApp,
    });
  }, [openWindow]);

  const openSnakeGame = useCallback(() => {
    openWindow({
      id: 'snake',
      title: 'Snake Game',
      icon: '🐍',
      position: { x: 280, y: 50 },
      size: { width: 480, height: 680 },
      minSize: { width: 460, height: 600 },
      isMinimized: false,
      isMaximized: false,
      component: SnakeGame,
    });
  }, [openWindow]);

  const openMusicPlayer = useCallback(() => {
    openWindow({
      id: 'music',
      title: 'Music',
      icon: '🎵',
      position: { x: 1105, y: 30 },
      size: { width: 420, height: 650 },
      minSize: { width: 350, height: 500 },
      isMinimized: false,
      isMaximized: false,
      component: MusicPlayer,
    });
  }, [openWindow]);

  const openCalculator = useCallback(() => {
    openWindow({
      id: 'calculator',
      title: 'Calculator',
      icon: '🔢',
      position: { x: 350, y: 80 },
      size: { width: 320, height: 500 },
      minSize: { width: 280, height: 420 },
      isMinimized: false,
      isMaximized: false,
      component: Calculator,
    });
  }, [openWindow]);

  const openCalendar = useCallback(() => {
    openWindow({
      id: 'calendar',
      title: 'Calendar',
      icon: '📅',
      position: { x: 100, y: 30 },
      size: { width: 420, height: 650 },
      minSize: { width: 380, height: 520 },
      isMinimized: false,
      isMaximized: false,
      component: CalendarApp,
    });
  }, [openWindow]);

  const openPaint = useCallback(() => {
    openWindow({
      id: 'paint',
      title: 'Paint',
      icon: '🎨',
      position: { x: 150, y: 20 },
      size: { width: 900, height: 580 },
      minSize: { width: 600, height: 450 },
      isMinimized: false,
      isMaximized: false,
      component: PaintApp,
    });
  }, [openWindow]);

  const openPiano = useCallback(() => {
    openWindow({
      id: 'piano',
      title: 'Piano',
      icon: '🎹',
      position: { x: 180, y: 30 },
      size: { width: 750, height: 550 },
      minSize: { width: 650, height: 380 },
      isMinimized: false,
      isMaximized: false,
      component: PianoApp,
    });
  }, [openWindow]);

  const openPomodoro = useCallback(() => {
    openWindow({
      id: 'pomodoro',
      title: 'Pomodoro',
      icon: '⏱️',
      position: { x: 250, y: 10 },
      size: { width: 400, height: 600 },
      minSize: { width: 350, height: 500 },
      isMinimized: false,
      isMaximized: false,
      component: PomodoroApp,
    });
  }, [openWindow]);

  const openGTA6 = useCallback(() => {
    openWindow({
      id: 'gta6',
      title: 'GTA VI',
      icon: '/gta6.png',
      position: { x: 200, y: 50 },
      size: { width: 700, height: 500 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
      component: GTA6App,
    });
  }, [openWindow]);

  const openTicTacToe = useCallback(() => {
    openWindow({
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      icon: '⭕',
      position: { x: 300, y: 10 },
      size: { width: 800, height: 600 },
      minSize: { width: 350, height: 500 },
      isMinimized: false,
      isMaximized: false,
      component: TicTacToe,
    });
  }, [openWindow]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
      
      if (e.key === 'Escape') {
        if (spotlightOpen) {
          setSpotlightOpen(false);
        } else if (activeWindowId) {
          closeWindow(activeWindowId);
        }
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'm' && activeWindowId) {
        e.preventDefault();
        minimizeWindow(activeWindowId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spotlightOpen, activeWindowId, closeWindow, minimizeWindow]);

  useEffect(() => {
    const timer = setTimeout(() => {
      openBrowser();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const desktopIcons: DesktopIcon[] = useMemo(() => [
    {
      id: 'browser',
      title: 'Browser',
      icon: '🌐',
      type: 'app',
      position: { x: 24, y: 24 },
      onOpen: openBrowser,
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: '>_',
      type: 'app',
      position: { x: 24, y: 124 },
      onOpen: openTerminal,
    },
    {
      id: 'notes',
      title: 'Notes.txt',
      icon: '📝',
      type: 'file',
      position: { x: 24, y: 224 },
      onOpen: openNotes,
    },
    {
      id: 'music',
      title: 'Music',
      icon: '🎵',
      type: 'app',
      position: { x: 24, y: 324 },
      onOpen: openMusicPlayer,
    },
    {
      id: 'snake',
      title: 'Snake',
      icon: '🐍',
      type: 'app',
      position: { x: 124, y: 24 },
      onOpen: openSnakeGame,
    },
    {
      id: 'calculator',
      title: 'Calculator',
      icon: '🔢',
      type: 'app',
      position: { x: 124, y: 124 },
      onOpen: openCalculator,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      type: 'app',
      position: { x: 124, y: 224 },
      onOpen: openSettings,
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: '📅',
      type: 'app',
      position: { x: 224, y: 24 },
      onOpen: openCalendar,
    },
    {
      id: 'paint',
      title: 'Paint',
      icon: '🎨',
      type: 'app',
      position: { x: 224, y: 124 },
      onOpen: openPaint,
    },
    {
      id: 'piano',
      title: 'Piano',
      icon: '🎹',
      type: 'app',
      position: { x: 324, y: 24 },
      onOpen: openPiano,
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro',
      icon: '⏱️',
      type: 'app',
      position: { x: 324, y: 124 },
      onOpen: openPomodoro,
    },
    {
      id: 'gta6',
      title: 'Grand Theft Auto VI',
      icon: '/gta6.png',
      type: 'app',
      position: { x: 424, y: 24 },
      onOpen: openGTA6,
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      icon: '⭕',
      type: 'app',
      position: { x: 424, y: 124 },
      onOpen: openTicTacToe,
    },
  ], [openNotes, openBrowser, openTerminal, openSettings, openSnakeGame, openMusicPlayer, openCalculator, openCalendar, openPaint, openPiano, openPomodoro, openGTA6, openTicTacToe]);

  const handleDockClick = useCallback((id: string, openFn: () => void) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMinimized) {
      restoreWindow(id);
    } else if (win && activeWindowId === id) {
      minimizeWindow(id);
    } else {
      openFn();
    }
  }, [windows, activeWindowId, restoreWindow, minimizeWindow]);

  const dockItems: DockItem[] = useMemo(() => [
    {
      id: 'browser',
      title: 'Browser',
      icon: '🌐',
      isOpen: windows.some(w => w.id === 'browser'),
      onClick: () => handleDockClick('browser', openBrowser),
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: '>_',
      isOpen: windows.some(w => w.id === 'terminal'),
      onClick: () => handleDockClick('terminal', openTerminal),
    },
    {
      id: 'music',
      title: 'Music',
      icon: '🎵',
      isOpen: windows.some(w => w.id === 'music'),
      onClick: () => handleDockClick('music', openMusicPlayer),
    },
    {
      id: 'calculator',
      title: 'Calculator',
      icon: '🔢',
      isOpen: windows.some(w => w.id === 'calculator'),
      onClick: () => handleDockClick('calculator', openCalculator),
    },
    {
      id: 'notes',
      title: 'Notes',
      icon: '📝',
      isOpen: windows.some(w => w.id === 'notes'),
      onClick: () => handleDockClick('notes', openNotes),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      isOpen: windows.some(w => w.id === 'settings'),
      onClick: () => handleDockClick('settings', openSettings),
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: '📅',
      isOpen: windows.some(w => w.id === 'calendar'),
      onClick: () => handleDockClick('calendar', openCalendar),
    },
    {
      id: 'paint',
      title: 'Paint',
      icon: '🎨',
      isOpen: windows.some(w => w.id === 'paint'),
      onClick: () => handleDockClick('paint', openPaint),
    },
    {
      id: 'piano',
      title: 'Piano',
      icon: '🎹',
      isOpen: windows.some(w => w.id === 'piano'),
      onClick: () => handleDockClick('piano', openPiano),
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro',
      icon: '⏱️',
      isOpen: windows.some(w => w.id === 'pomodoro'),
      onClick: () => handleDockClick('pomodoro', openPomodoro),
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      icon: '⭕',
      isOpen: windows.some(w => w.id === 'tictactoe'),
      onClick: () => handleDockClick('tictactoe', openTicTacToe),
    },
  ], [windows, handleDockClick, openBrowser, openNotes, openTerminal, openSettings, openMusicPlayer, openCalculator, openCalendar, openPaint, openPiano, openPomodoro, openTicTacToe]);

  const spotlightApps = useMemo(() => 
    desktopIcons.map(icon => ({
      id: icon.id,
      title: icon.title,
      icon: icon.icon,
      onOpen: icon.onOpen,
    })),
  [desktopIcons]);

  return (
    <>
      <MenuBar />
      <Desktop icons={desktopIcons} />
      <WindowManager />
      <Dock items={dockItems} />
      <Spotlight 
        isOpen={spotlightOpen} 
        onClose={() => setSpotlightOpen(false)} 
        apps={spotlightApps}
      />
    </>
  );
}

function App() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  return (
    <ThemeProvider>
      <WallpaperProvider>
        {isBooting && <BootScreen onComplete={handleBootComplete} />}
        <WindowProvider>
          <DesktopEnvironment />
        </WindowProvider>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
