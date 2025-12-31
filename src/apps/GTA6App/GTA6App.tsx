import { useState, useEffect } from 'react';
import './GTA6App.css';

export default function GTA6App() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const releaseDate = new Date('2026-11-19');
    
    const calculateDays = () => {
      const now = new Date();
      const diff = releaseDate.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gta6-app">
      <div className="gta6-content">
        <img src="/gta6.png" alt="GTA VI" className="gta6-image" />
        <div className="gta6-overlay">
          <p className="gta6-subtitle">November 19, 2026</p>
          <div className="gta6-countdown">
            <p>Days until release:</p>
            <span className="countdown-number">{daysLeft}</span>
          </div>
          <button 
            className="gta6-preorder"
            onClick={() => window.open('https://www.rockstargames.com/VI', '_blank')}
          >
            Pre-order Now
          </button>
        </div>
      </div>
    </div>
  );
}
