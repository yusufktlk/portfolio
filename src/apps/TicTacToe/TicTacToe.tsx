import { useState, useCallback } from 'react';
import './TicTacToe.css';

interface TicTacToeProps {
  windowId: string;
}

type Player = 'X' | 'O' | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: Board): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export function TicTacToe({ windowId: _windowId }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = calculateWinner(board);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = useCallback((index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newResult = calculateWinner(newBoard);
    if (newResult?.winner) {
      setScores(prev => ({
        ...prev,
        [newResult.winner as 'X' | 'O']: prev[newResult.winner as 'X' | 'O'] + 1,
      }));
    } else if (newBoard.every(square => square !== null)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  }, [board, isXNext, winner]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }, []);

  const resetScores = useCallback(() => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  }, [resetGame]);

  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a Draw!";
    return `Next: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="tictactoe-app">
      <div className="tictactoe-header">
        <h2>Tic Tac Toe</h2>
        <div className={`tictactoe-status ${winner ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>
          {getStatus()}
        </div>
      </div>

      <div className="tictactoe-scores">
        <div className="score-item x">
          <span className="score-label">X</span>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="score-item draws">
          <span className="score-label">Draws</span>
          <span className="score-value">{scores.draws}</span>
        </div>
        <div className="score-item o">
          <span className="score-label">O</span>
          <span className="score-value">{scores.O}</span>
        </div>
      </div>

      <div className="tictactoe-board">
        {board.map((square, index) => (
          <button
            key={index}
            className={`tictactoe-cell ${square || ''} ${winningLine.includes(index) ? 'winning' : ''}`}
            onClick={() => handleClick(index)}
            disabled={!!square || !!winner}
          >
            {square}
          </button>
        ))}
      </div>

      <div className="tictactoe-controls">
        <button className="tictactoe-btn" onClick={resetGame}>
          New Game
        </button>
        <button className="tictactoe-btn secondary" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
}

