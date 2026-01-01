import { useState, useEffect, useRef, useMemo } from 'react';
import './Spotlight.css';

interface SpotlightApp {
  id: string;
  title: string;
  icon: string;
  onOpen: () => void;
}

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  apps: SpotlightApp[];
}

export function Spotlight({ isOpen, onClose, apps }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredApps = useMemo(() => {
    if (!query.trim()) return apps;
    const lowerQuery = query.toLowerCase();
    return apps.filter(app => 
      app.title.toLowerCase().includes(lowerQuery)
    );
  }, [query, apps]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredApps.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredApps[selectedIndex]) {
          filteredApps[selectedIndex].onOpen();
          onClose();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="spotlight-overlay" onClick={onClose}>
      <div className="spotlight-container" onClick={e => e.stopPropagation()}>
        <div className="spotlight-search">
          <span className="spotlight-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="spotlight-input"
            placeholder="Search apps..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="spotlight-shortcut">ESC</span>
        </div>
        
        {filteredApps.length > 0 && (
          <div className="spotlight-results">
            {filteredApps.map((app, index) => (
              <div
                key={app.id}
                className={`spotlight-result ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  app.onOpen();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="spotlight-result-icon">
                  {app.icon.startsWith('/') ? (
                    <img src={app.icon} alt={app.title} />
                  ) : (
                    app.icon
                  )}
                </span>
                <span className="spotlight-result-title">{app.title}</span>
                {index === selectedIndex && (
                  <span className="spotlight-result-hint">↵</span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {query && filteredApps.length === 0 && (
          <div className="spotlight-empty">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}

