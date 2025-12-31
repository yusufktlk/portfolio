import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useWallpaper } from '../../contexts/WallpaperContext';
import './SettingsApp.css';

interface SettingsAppProps {
  windowId: string;
}

type SettingsTab = 'wallpaper' | 'appearance' | 'about';

const WALLPAPERS = [
  { id: 'bg.png', name: 'Sonoma', preview: '/bg.png' },
  { id: 'bg2.jpg', name: 'Ventura', preview: '/bg2.jpg' },
  { id: 'bg3.jpg', name: 'Monterey', preview: '/bg3.jpg' },
  { id: 'bg4.png', name: 'Sequoia', preview: '/bg4.png' },
  { id: 'bg5.jpg', name: 'Catalina', preview: '/bg5.jpg' },
];

const THEMES = [
  { id: 'dark', name: 'Dark', icon: '🌙', description: 'Dark mode for comfortable viewing' },
  { id: 'light', name: 'Light', icon: '☀️', description: 'Light mode for bright environments' },
  { id: 'green', name: 'Forest', icon: '🌲', description: 'Nature-inspired green theme' },
] as const;

export function SettingsApp({ windowId: _windowId }: SettingsAppProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('wallpaper');
  const { theme, setTheme } = useTheme();
  const { wallpaper, setWallpaper } = useWallpaper();

  return (
    <div className="settings-app">
      <div className="settings-sidebar">
        <div className="settings-sidebar-header">
          <span className="settings-icon">⚙️</span>
          <span>Settings</span>
        </div>
        <nav className="settings-nav">
          <button
            className={`settings-nav-item ${activeTab === 'wallpaper' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallpaper')}
          >
            <span className="nav-icon">🖼️</span>
            <span>Wallpaper</span>
          </button>
          <button
            className={`settings-nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <span className="nav-icon">🎨</span>
            <span>Appearance</span>
          </button>
          <button
            className={`settings-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="nav-icon">ℹ️</span>
            <span>About</span>
          </button>
        </nav>
      </div>

      <div className="settings-content">
        {activeTab === 'wallpaper' && (
          <div className="settings-section">
            <h2>Desktop Wallpaper</h2>
            <p className="settings-description">
              Choose a wallpaper for your desktop background.
            </p>
            <div className="wallpaper-grid">
              {WALLPAPERS.map((wp) => (
                <div
                  key={wp.id}
                  className={`wallpaper-item ${wallpaper === wp.id ? 'selected' : ''}`}
                  onClick={() => setWallpaper(wp.id)}
                >
                  <div 
                    className="wallpaper-preview"
                    style={{ backgroundImage: `url(${wp.preview})` }}
                  />
                  <span className="wallpaper-name">{wp.name}</span>
                  {wallpaper === wp.id && (
                    <span className="wallpaper-check">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="settings-section">
            <h2>Appearance</h2>
            <p className="settings-description">
              Customize the look and feel of your desktop.
            </p>
            
            <h3>Theme</h3>
            <div className="theme-grid">
              {THEMES.map((t) => (
                <div
                  key={t.id}
                  className={`theme-item ${theme === t.id ? 'selected' : ''}`}
                  onClick={() => setTheme(t.id)}
                >
                  <div className="theme-icon">{t.icon}</div>
                  <div className="theme-info">
                    <span className="theme-name">{t.name}</span>
                    <span className="theme-description">{t.description}</span>
                  </div>
                  {theme === t.id && (
                    <span className="theme-check">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="settings-section">
            <h2>About This Portfolio</h2>
            
            <div className="about-card">
              <div className="about-logo">💻</div>
              <h3>YusufOS</h3>
              <p className="about-version">Version 1.0.0</p>
            </div>

            <div className="about-info">
              <div className="about-row">
                <span className="about-label">Developer</span>
                <span className="about-value">Yusuf Kıtlık</span>
              </div>
              <div className="about-row">
                <span className="about-label">Built with</span>
                <span className="about-value">React, TypeScript, Vite</span>
              </div>
              <div className="about-row">
                <span className="about-label">Inspired by</span>
                <span className="about-value">macOS</span>
              </div>
            </div>

            <div className="about-links">
              <a 
                href="https://github.com/yusufktlk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="about-link"
              >
                🐙 GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/yusuf-kitlik/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="about-link"
              >
                💼 LinkedIn
              </a>
              <a 
                href="mailto:yusufkitlik@hotmail.com"
                className="about-link"
              >
                📧 Email
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

