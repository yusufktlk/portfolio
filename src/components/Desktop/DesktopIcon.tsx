import { useState, useCallback, useRef, useEffect } from 'react';
import type { DesktopIcon as DesktopIconType, Position } from '../../types';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: DesktopIconType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, position: Position) => void;
}

export function DesktopIcon({ icon, isSelected, onSelect, onMove }: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(icon.position);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPosition(icon.position);
  }, [icon.position]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(icon.id);
    const startX = e.clientX;
    const startY = e.clientY;
    
    setDragOffset({
      x: startX - currentPosition.x,
      y: startY - currentPosition.y,
    });
    setIsDragging(true);
  }, [icon.id, onSelect, currentPosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = Math.max(0, e.clientX - dragOffset.x);
    const newY = Math.max(0, e.clientY - dragOffset.y);
    
    setCurrentPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onMove(icon.id, currentPosition);
    }
  }, [isDragging, icon.id, currentPosition, onMove]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      icon.onOpen();
    }
  }, [icon, isDragging]);

  return (
    <div
      ref={iconRef}
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
      }}
    >
      <div className="desktop-icon-image">
        {icon.icon.startsWith('/') ? (
          <img src={icon.icon} alt={icon.title} className="icon-img" />
        ) : (
          icon.icon
        )}
      </div>
      <div className="desktop-icon-title">
        {icon.title}
      </div>
    </div>
  );
}
