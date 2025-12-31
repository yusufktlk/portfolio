import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './MenuBar.css';

export function MenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'green') => {
    setTheme(newTheme);
    setShowAppleMenu(false);
  };

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">
        <div 
          className="menu-item apple-menu"
          onClick={() => setShowAppleMenu(!showAppleMenu)}
        >
          <span className="apple-logo">🍎</span>
          {showAppleMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-header">Yusuf's Portfolio</div>
              <div className="dropdown-divider" />
              <div className="dropdown-section">Theme</div>
              <div 
                className={`dropdown-item ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                <span className="dropdown-icon">🌙</span> Dark
              </div>
              <div 
                className={`dropdown-item ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                <span className="dropdown-icon">☀️</span> Light
              </div>
              <div 
                className={`dropdown-item ${theme === 'green' ? 'active' : ''}`}
                onClick={() => handleThemeChange('green')}
              >
                <span className="dropdown-icon">🌲</span> Forest
              </div>
              <div className="dropdown-divider" />
              <a 
                href="https://github.com/yusufktlk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                <span className="dropdown-icon">🐙</span> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/yusuf-kitlik/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                <span className="dropdown-icon">💼</span> LinkedIn
              </a>
            </div>
          )}
        </div>
        <span className="menu-item app-name">Finder</span>
      </div>
      <div className="menu-bar-right">
        <span className="menu-item status-icon">🔋</span>
        <span className="menu-item status-icon">📶</span>
        <span className="menu-item datetime">
          {formatDate(currentTime)} {formatTime(currentTime)}
        </span>
      </div>
      {showAppleMenu && (
        <div 
          className="menu-backdrop" 
          onClick={() => setShowAppleMenu(false)} 
        />
      )}
    </div>
  );
}

