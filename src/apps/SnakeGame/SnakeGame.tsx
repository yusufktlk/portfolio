import { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css';

interface SnakeGameProps {
  windowId: string;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export function SnakeGame({ windowId: _windowId }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snake-high-score');
    return saved ? parseInt(saved) : 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setIsPaused(false);
  }, [generateFood]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snake-high-score', String(newScore));
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, gameOver, isPaused, generateFood, highScore]);

  useEffect(() => {
    if (isPlaying && !gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [isPlaying, gameOver, isPaused, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current !== 'DOWN') {
            directionRef.current = 'UP';
            setDirection('UP');
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current !== 'UP') {
            directionRef.current = 'DOWN';
            setDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current !== 'RIGHT') {
            directionRef.current = 'LEFT';
            setDirection('LEFT');
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current !== 'LEFT') {
            directionRef.current = 'RIGHT';
            setDirection('RIGHT');
          }
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
        case 'Escape':
          if (gameOver) resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, resetGame]);

  return (
    <div className="snake-game">
      <div className="snake-header">
        <div className="snake-score">
          <span>Score: {score}</span>
          <span className="high-score">Best: {highScore}</span>
        </div>
      </div>

      <div className="snake-board-container">
        {!isPlaying && !gameOver && (
          <div className="snake-overlay">
            <div className="snake-start-screen">
              <div className="snake-emoji">🐍</div>
              <h2>Snake Game</h2>
              <p>Use arrow keys or WASD to move</p>
              <p>Space to pause</p>
              <button onClick={resetGame}>Start Game</button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="snake-overlay">
            <div className="snake-game-over">
              <h2>Game Over!</h2>
              <p>Score: {score}</p>
              {score >= highScore && score > 0 && (
                <p className="new-high-score">🎉 New High Score!</p>
              )}
              <button onClick={resetGame}>Play Again</button>
            </div>
          </div>
        )}

        {isPaused && (
          <div className="snake-overlay">
            <div className="snake-paused">
              <h2>Paused</h2>
              <p>Press Space to continue</p>
            </div>
          </div>
        )}

        <div 
          className="snake-board"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`snake-segment ${index === 0 ? 'head' : ''}`}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
              }}
            />
          ))}
          <div
            className="snake-food"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        </div>
      </div>

      <div className="snake-controls">
        <div className="control-row">
          <button onClick={() => {
            if (directionRef.current !== 'DOWN') {
              directionRef.current = 'UP';
              setDirection('UP');
            }
          }}>↑</button>
        </div>
        <div className="control-row">
          <button onClick={() => {
            if (directionRef.current !== 'RIGHT') {
              directionRef.current = 'LEFT';
              setDirection('LEFT');
            }
          }}>←</button>
          <button onClick={() => {
            if (directionRef.current !== 'UP') {
              directionRef.current = 'DOWN';
              setDirection('DOWN');
            }
          }}>↓</button>
          <button onClick={() => {
            if (directionRef.current !== 'LEFT') {
              directionRef.current = 'RIGHT';
              setDirection('RIGHT');
            }
          }}>→</button>
        </div>
      </div>
    </div>
  );
}

