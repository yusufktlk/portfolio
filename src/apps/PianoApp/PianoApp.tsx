import { useState, useEffect, useCallback, useRef } from 'react';
import './PianoApp.css';

interface Key {
  note: string;
  key: string;
  isBlack: boolean;
  frequency: number;
}

const KEYS: Key[] = [
  { note: 'C4', key: 'a', isBlack: false, frequency: 261.63 },
  { note: 'C#4', key: 'w', isBlack: true, frequency: 277.18 },
  { note: 'D4', key: 's', isBlack: false, frequency: 293.66 },
  { note: 'D#4', key: 'e', isBlack: true, frequency: 311.13 },
  { note: 'E4', key: 'd', isBlack: false, frequency: 329.63 },
  { note: 'F4', key: 'f', isBlack: false, frequency: 349.23 },
  { note: 'F#4', key: 't', isBlack: true, frequency: 369.99 },
  { note: 'G4', key: 'g', isBlack: false, frequency: 392.00 },
  { note: 'G#4', key: 'y', isBlack: true, frequency: 415.30 },
  { note: 'A4', key: 'h', isBlack: false, frequency: 440.00 },
  { note: 'A#4', key: 'u', isBlack: true, frequency: 466.16 },
  { note: 'B4', key: 'j', isBlack: false, frequency: 493.88 },
  { note: 'C5', key: 'k', isBlack: false, frequency: 523.25 },
  { note: 'C#5', key: 'o', isBlack: true, frequency: 554.37 },
  { note: 'D5', key: 'l', isBlack: false, frequency: 587.33 },
  { note: 'D#5', key: 'p', isBlack: true, frequency: 622.25 },
  { note: 'E5', key: ';', isBlack: false, frequency: 659.25 },
];

export default function PianoApp() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState(0.5);
  const [waveform, setWaveform] = useState<OscillatorType>('sine');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playNote = useCallback((key: Key) => {
    const audioContext = getAudioContext();
    
    if (oscillatorsRef.current.has(key.note)) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(key.frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    oscillatorsRef.current.set(key.note, oscillator);
    gainNodesRef.current.set(key.note, gainNode);

    setActiveKeys(prev => new Set([...prev, key.note]));
  }, [getAudioContext, volume, waveform]);

  const stopNote = useCallback((key: Key) => {
    const oscillator = oscillatorsRef.current.get(key.note);
    const gainNode = gainNodesRef.current.get(key.note);

    if (oscillator && gainNode) {
      const audioContext = getAudioContext();
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
      
      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
        oscillatorsRef.current.delete(key.note);
        gainNodesRef.current.delete(key.note);
      }, 100);
    }

    setActiveKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(key.note);
      return newSet;
    });
  }, [getAudioContext]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;
    
    const key = KEYS.find(k => k.key === e.key.toLowerCase());
    if (key) {
      playNote(key);
    }
  }, [playNote]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = KEYS.find(k => k.key === e.key.toLowerCase());
    if (key) {
      stopNote(key);
    }
  }, [stopNote]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      oscillatorsRef.current.forEach((osc) => {
        osc.stop();
        osc.disconnect();
      });
    };
  }, [handleKeyDown, handleKeyUp]);

  const whiteKeys = KEYS.filter(k => !k.isBlack);
  const blackKeys = KEYS.filter(k => k.isBlack);

  const getBlackKeyPosition = (note: string) => {
    const positions: Record<string, number> = {
      'C#4': 0, 'D#4': 1, 'F#4': 3, 'G#4': 4, 'A#4': 5,
      'C#5': 7, 'D#5': 8
    };
    const pos = positions[note];
    if (pos === undefined) return 0;
    
    const offset = pos * 60 + 40;
    return offset;
  };

  return (
    <div className="piano-app">
      <div className="piano-header">
        <h2>🎹 Piano</h2>
        <p className="piano-hint">Use keyboard keys (A-L) or click the keys</p>
      </div>

      <div className="piano-controls">
        <div className="control-group">
          <label>Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
          <span>{Math.round(volume * 100)}%</span>
        </div>

        <div className="control-group">
          <label>Sound</label>
          <select value={waveform} onChange={(e) => setWaveform(e.target.value as OscillatorType)}>
            <option value="sine">Sine (Soft)</option>
            <option value="triangle">Triangle</option>
            <option value="square">Square (8-bit)</option>
            <option value="sawtooth">Sawtooth</option>
          </select>
        </div>
      </div>

      <div className="piano-keyboard">
        <div className="white-keys">
          {whiteKeys.map((key) => (
            <div
              key={key.note}
              className={`piano-key white-key ${activeKeys.has(key.note) ? 'active' : ''}`}
              onMouseDown={() => playNote(key)}
              onMouseUp={() => stopNote(key)}
              onMouseLeave={() => stopNote(key)}
            >
              <span className="key-label">{key.key.toUpperCase()}</span>
              <span className="note-label">{key.note}</span>
            </div>
          ))}
          <div className="black-keys">
            {blackKeys.map((key) => (
              <div
                key={key.note}
                className={`piano-key black-key ${activeKeys.has(key.note) ? 'active' : ''}`}
                style={{ left: `${getBlackKeyPosition(key.note)}px` }}
                onMouseDown={() => playNote(key)}
                onMouseUp={() => stopNote(key)}
                onMouseLeave={() => stopNote(key)}
              >
                <span className="key-label">{key.key.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="keyboard-guide">
        <div className="guide-row">
          <span className="guide-label">White keys:</span>
          <span className="guide-keys">A S D F G H J K L ;</span>
        </div>
        <div className="guide-row">
          <span className="guide-label">Black keys:</span>
          <span className="guide-keys">W E T Y U O P</span>
        </div>
      </div>
    </div>
  );
}

