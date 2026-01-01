import { useState, useRef, useEffect, useCallback } from 'react';
import './TerminalApp.css';

interface TerminalAppProps {
  windowId: string;
}

interface HistoryItem {
  command: string;
  output: string[];
  isError?: boolean;
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    '',
    '  about       - Learn about me',
    '  skills      - View my technical skills',
    '  projects    - See my projects',
    '  experience  - View work experience',
    '  education   - View education',
    '  contact     - Get my contact info',
    '  whoami      - Who am I?',
    '  clear       - Clear terminal',
    '  date        - Show current date',
    '  echo <msg>  - Echo a message',
    '  matrix      - 🐇 Follow the white rabbit...',
    '',
    'Type a command and press Enter.',
  ],
  about: () => [
    '┌─────────────────────────────────────────────────────────┐',
    '│                      ABOUT ME                          │',
    '└─────────────────────────────────────────────────────────┘',
    '',
    "Hi! I'm Yusuf, a Frontend Developer based in Antalya, Turkey.",
    '',
    'I specialize in building interactive web applications with',
    'TypeScript and React. Always learning and passionate about',
    'delivering high-quality user experiences.',
    '',
    "Recently, I've been exploring AI tools and integrating them",
    'into my development process to enhance application functionality.',
  ],
  skills: () => [
    '┌─────────────────────────────────────────────────────────┐',
    '│                    TECHNICAL SKILLS                    │',
    '└─────────────────────────────────────────────────────────┘',
    '',
    '  FRONTEND',
    '  ├── HTML, CSS, JavaScript, TypeScript',
    '  ├── React.js, Next.js',
    '  ├── Tailwind CSS',
    '  └── Vite.js',
    '',
    '  BACKEND',
    '  ├── Python',
    '  └── Django',
    '',
    '  TOOLS',
    '  └── Git',
  ],
  projects: () => [
    '┌─────────────────────────────────────────────────────────┐',
    '│                      PROJECTS                          │',
    '└─────────────────────────────────────────────────────────┘',
    '',
    '  🎵 Tracklistd',
    '     A Letterboxd-style web app for music.',
    '     Tech: React, Tailwind CSS, Firebase',
    '',
    '  📝 Blog App',
    '     Fullstack blog application.',
    '     Tech: React, Django',
    '',
    '  🍽️  Restaurant API',
    '     REST API for restaurant management.',
    '     Tech: Django, REST Framework',
  ],
  experience: () => [
    '┌─────────────────────────────────────────────────────────┐',
    '│                  WORK EXPERIENCE                       │',
    '└─────────────────────────────────────────────────────────┘',
    '',
    '  📍 Teknodev | Frontend Developer',
    '     2024/08 - Present | Antalya, Turkey',
    '     React, TypeScript, ERP, Website Builder',
    '',
    '  📍 Softalya Software Inc. | Fullstack Developer Intern',
    '     2024/02 - 2024/06 | Antalya, Turkey',
    '     Food Ordering App with React & Django',
    '',
    '  📍 Klonbits | Frontend Developer Intern',
    '     2023/07 - 2023/08 | Antalya, Turkey',
    '     Frontend development experience',
  ],
  education: () => [
    '┌─────────────────────────────────────────────────────────┐',
    '│                     EDUCATION                          │',
    '└─────────────────────────────────────────────────────────┘',
    '',
    '  🎓 Antalya Belek University',
    '     Management Information Systems',
    '     2020/09 - 2024/06',
    '',
    '     Courses: Information Technologies, Algorithm,',
    '     Web Programming, Database Management Systems',
  ],
  contact: () => [
    '┌─────────────────────────────────────────────────────────┐',
    '│                      CONTACT                           │',
    '└─────────────────────────────────────────────────────────┘',
    '',
    '  📧 Email:    yusufkitlik@hotmail.com',
    '  🐙 GitHub:   github.com/yusufktlk',
    '  💼 LinkedIn: linkedin.com/in/yusuf-kitlik',
    '',
    '  Feel free to reach out!',
  ],
  whoami: () => [
    'yusuf - Frontend Developer',
  ],
  date: () => [
    new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  ],
};

const WELCOME_MESSAGE = [
  '╔═══════════════════════════════════════════════════════════╗',
  '║                                                           ║',
  '║   Welcome to Yusuf\'s Terminal Portfolio                   ║',
  '║                                                           ║',
  '║   Type "help" to see available commands.                  ║',
  '║                                                           ║',
  '╚═══════════════════════════════════════════════════════════╝',
  '',
];

export function TerminalApp({ windowId: _windowId }: TerminalAppProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const timeout = setTimeout(() => {
      setShowMatrix(false);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [showMatrix]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    if (command === '') {
      return;
    }

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (command === 'matrix') {
      setShowMatrix(true);
      setHistory(prev => [...prev, {
        command: cmd,
        output: ['Entering the Matrix... (Press any key or wait 10s to exit)'],
      }]);
      return;
    }

    if (command === 'echo') {
      setHistory(prev => [...prev, {
        command: cmd,
        output: [args || ''],
      }]);
      return;
    }

    const commandFn = COMMANDS[command];
    if (commandFn) {
      setHistory(prev => [...prev, {
        command: cmd,
        output: commandFn(),
      }]);
    } else {
      setHistory(prev => [...prev, {
        command: cmd,
        output: [`Command not found: ${command}`, 'Type "help" for available commands.'],
        isError: true,
      }]);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      if (input.trim()) {
        setCommandHistory(prev => [...prev, input]);
      }
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = Object.keys(COMMANDS);
      const match = commands.find(c => c.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  }, [input, executeCommand, commandHistory, historyIndex]);

  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal-app" onClick={handleTerminalClick}>
      {showMatrix && (
        <canvas 
          ref={canvasRef} 
          className="matrix-canvas"
          onClick={() => setShowMatrix(false)}
        />
      )}
      <div className="terminal-output" ref={terminalRef}>
        <div className="terminal-welcome">
          {WELCOME_MESSAGE.map((line, i) => (
            <div key={i} className="terminal-line">{line}</div>
          ))}
        </div>

        {history.map((item, index) => (
          <div key={index} className="terminal-entry">
            <div className="terminal-prompt-line">
              <span className="terminal-prompt">
                <span className="prompt-user">guest</span>
                <span className="prompt-at">@</span>
                <span className="prompt-host">yusuf.dev</span>
                <span className="prompt-symbol">:~$</span>
              </span>
              <span className="terminal-command">{item.command}</span>
            </div>
            <div className={`terminal-result ${item.isError ? 'error' : ''}`}>
              {item.output.map((line, i) => (
                <div key={i} className="terminal-line">{line}</div>
              ))}
            </div>
          </div>
        ))}

        <div className="terminal-input-line">
          <span className="terminal-prompt">
            <span className="prompt-user">guest</span>
            <span className="prompt-at">@</span>
            <span className="prompt-host">yusuf.dev</span>
            <span className="prompt-symbol">:~$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

