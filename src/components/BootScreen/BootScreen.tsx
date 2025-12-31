import { useState, useEffect } from 'react';
import './BootScreen.css';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  { text: 'Initializing system...', delay: 0 },
  { text: 'Loading kernel modules...', delay: 300 },
  { text: 'Starting portfolio services...', delay: 600 },
  { text: 'Mounting /home/yusuf...', delay: 900 },
  { text: 'Loading React components...', delay: 1200 },
  { text: 'Initializing TypeScript runtime...', delay: 1500 },
  { text: 'Starting window manager...', delay: 1800 },
  { text: 'Loading desktop environment...', delay: 2100 },
  { text: 'System ready.', delay: 2400 },
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_MESSAGES.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, BOOT_MESSAGES[index].delay);
      timers.push(timer);
    });

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 2800);
    timers.push(completeTimer);

    const exitTimer = setTimeout(() => {
      onComplete();
    }, 3500);
    timers.push(exitTimer);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="boot-content">
        <div className="boot-logo">
          <span className="boot-logo-icon">💻</span>
          <span className="boot-logo-text">YusufOS</span>
        </div>
        
        <div className="boot-terminal">
          {BOOT_MESSAGES.slice(0, visibleLines).map((msg, index) => (
            <div 
              key={index} 
              className={`boot-line ${index === visibleLines - 1 ? 'latest' : ''}`}
            >
              <span className="boot-prefix">[{String(index).padStart(2, '0')}]</span>
              <span className="boot-status">OK</span>
              <span className="boot-message">{msg.text}</span>
            </div>
          ))}
          {visibleLines < BOOT_MESSAGES.length && (
            <div className="boot-cursor">_</div>
          )}
        </div>

        <div className="boot-progress-container">
          <div 
            className="boot-progress-bar" 
            style={{ 
              width: `${(visibleLines / BOOT_MESSAGES.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}

