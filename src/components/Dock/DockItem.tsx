import { useState, useCallback } from 'react';
import type { DockItem as DockItemType } from '../../types';
import './DockItem.css';

interface DockItemProps {
  item: DockItemType;
}

export function DockItem({ item }: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    item.onClick();
  }, [item]);

  return (
    <div
      className={`dock-item ${item.isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`dock-item-tooltip ${isHovered ? 'visible' : ''}`}>
        {item.title}
      </div>
      <div className="dock-item-icon">
        {item.icon.startsWith('/') ? (
          <img src={item.icon} alt={item.title} className="dock-icon-img" />
        ) : (
          item.icon
        )}
      </div>
      {item.isOpen && <div className="dock-item-indicator" />}
    </div>
  );
}

