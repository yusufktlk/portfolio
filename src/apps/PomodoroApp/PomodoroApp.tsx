import { useState, useEffect, useCallback, useRef } from 'react';
import './PomodoroApp.css';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const DEFAULT_SETTINGS: TimerSettings = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function PomodoroApp() {
  const [settings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(settings.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getModeLabel = (m: TimerMode) => {
    switch (m) {
      case 'work': return 'Focus Time';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
    }
  };

  const getModeColor = (m: TimerMode) => {
    switch (m) {
      case 'work': return '#ef4444';
      case 'shortBreak': return '#22c55e';
      case 'longBreak': return '#3b82f6';
    }
  };

  const playNotification = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(settings[newMode]);
    setIsRunning(false);
  }, [settings]);

  const handleTimerComplete = useCallback(() => {
    playNotification();
    setIsRunning(false);

    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      
      if (newSessions % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('work');
    }
  }, [mode, sessions, playNotification, switchMode]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, handleTimerComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings[mode]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((settings[mode] - timeLeft) / settings[mode]) * 100;

  return (
    <div className="pomodoro-app">
      <div className="pomodoro-header">
        <h2>🍅 Pomodoro Timer</h2>
        <p className="session-count">Sessions completed: {sessions}</p>
      </div>

      <div className="mode-tabs">
        {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
          <button
            key={m}
            className={`mode-tab ${mode === m ? 'active' : ''}`}
            onClick={() => switchMode(m)}
            style={{ '--mode-color': getModeColor(m) } as React.CSSProperties}
          >
            {getModeLabel(m)}
          </button>
        ))}
      </div>

      <div className="timer-container">
        <div 
          className="timer-ring"
          style={{ 
            '--progress': `${progress}%`,
            '--mode-color': getModeColor(mode)
          } as React.CSSProperties}
        >
          <div className="timer-inner">
            <span className="timer-mode">{getModeLabel(mode)}</span>
            <span className="timer-display">{formatTime(timeLeft)}</span>
            <span className="timer-status">{isRunning ? 'Running...' : 'Paused'}</span>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="control-btn reset" onClick={resetTimer}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
        
        <button 
          className={`control-btn play ${isRunning ? 'running' : ''}`} 
          onClick={toggleTimer}
          style={{ '--mode-color': getModeColor(mode) } as React.CSSProperties}
        >
          {isRunning ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </button>

        <button className="control-btn skip" onClick={handleTimerComplete}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 4 15 12 5 20 5 4"/>
            <line x1="19" y1="5" x2="19" y2="19"/>
          </svg>
        </button>
      </div>

      <div className="pomodoro-info">
        <div className="info-item">
          <span className="info-icon" style={{ color: getModeColor('work') }}>●</span>
          <span>Focus: 25 min</span>
        </div>
        <div className="info-item">
          <span className="info-icon" style={{ color: getModeColor('shortBreak') }}>●</span>
          <span>Short: 5 min</span>
        </div>
        <div className="info-item">
          <span className="info-icon" style={{ color: getModeColor('longBreak') }}>●</span>
          <span>Long: 15 min</span>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

