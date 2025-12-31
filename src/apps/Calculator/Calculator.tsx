import { useState, useCallback } from 'react';
import './Calculator.css';

interface CalculatorProps {
  windowId: string;
}

export function Calculator({ windowId: _windowId }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const toggleSign = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  }, [display]);

  const inputPercent = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  }, [display]);

  const performOperation = useCallback((nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue;
      let result: number;

      switch (operator) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = currentValue / inputValue;
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, operator, previousValue]);

  const calculate = useCallback(() => {
    if (operator === null || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result: number;

    switch (operator) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        result = previousValue / inputValue;
        break;
      default:
        result = inputValue;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }, [display, operator, previousValue]);

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    if (Math.abs(num) > 999999999999) {
      return num.toExponential(5);
    }
    
    if (value.includes('.')) {
      const [integer, decimal] = value.split('.');
      return parseInt(integer).toLocaleString() + '.' + decimal;
    }
    
    return num.toLocaleString();
  };

  return (
    <div className="calculator">
      <div className="calc-display">
        <span className="calc-display-value">{formatDisplay(display)}</span>
      </div>
      <div className="calc-buttons">
        <button className="calc-btn function" onClick={clear}>
          {display === '0' && previousValue === null ? 'AC' : 'C'}
        </button>
        <button className="calc-btn function" onClick={toggleSign}>±</button>
        <button className="calc-btn function" onClick={inputPercent}>%</button>
        <button 
          className={`calc-btn operator ${operator === '÷' ? 'active' : ''}`}
          onClick={() => performOperation('÷')}
        >
          ÷
        </button>

        <button className="calc-btn" onClick={() => inputDigit('7')}>7</button>
        <button className="calc-btn" onClick={() => inputDigit('8')}>8</button>
        <button className="calc-btn" onClick={() => inputDigit('9')}>9</button>
        <button 
          className={`calc-btn operator ${operator === '×' ? 'active' : ''}`}
          onClick={() => performOperation('×')}
        >
          ×
        </button>

        <button className="calc-btn" onClick={() => inputDigit('4')}>4</button>
        <button className="calc-btn" onClick={() => inputDigit('5')}>5</button>
        <button className="calc-btn" onClick={() => inputDigit('6')}>6</button>
        <button 
          className={`calc-btn operator ${operator === '-' ? 'active' : ''}`}
          onClick={() => performOperation('-')}
        >
          −
        </button>

        <button className="calc-btn" onClick={() => inputDigit('1')}>1</button>
        <button className="calc-btn" onClick={() => inputDigit('2')}>2</button>
        <button className="calc-btn" onClick={() => inputDigit('3')}>3</button>
        <button 
          className={`calc-btn operator ${operator === '+' ? 'active' : ''}`}
          onClick={() => performOperation('+')}
        >
          +
        </button>

        <button className="calc-btn zero" onClick={() => inputDigit('0')}>0</button>
        <button className="calc-btn" onClick={inputDecimal}>.</button>
        <button className="calc-btn operator" onClick={calculate}>=</button>
      </div>
    </div>
  );
}

