import { useState, useRef, useCallback, useEffect } from 'react';
import type { WindowState } from '../../types';
import { useWindows } from '../../contexts/WindowContext';
import './Window.css';

interface WindowProps {
  window: WindowState;
}

export function Window({ window: windowState }: WindowProps) {
  const { 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    restoreWindow,
    focusWindow, 
    moveWindow, 
    resizeWindow,
    activeWindowId,
    minimizingWindowId,
    closingWindowId
  } = useWindows();
  
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const isActive = activeWindowId === windowState.id;
  const isClosing = closingWindowId === windowState.id;
  const isMinimizing = minimizingWindowId === windowState.id;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    focusWindow(windowState.id);
    
    if (windowState.isMaximized) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - windowState.position.x,
      y: e.clientY - windowState.position.y,
    });
  }, [focusWindow, windowState.id, windowState.position, windowState.isMaximized]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, e.clientX - dragOffset.x);
      const newY = Math.max(0, e.clientY - dragOffset.y);
      moveWindow(windowState.id, { x: newX, y: newY });
    }
    if (isResizing) {
      const newWidth = Math.max(windowState.minSize.width, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(windowState.minSize.height, resizeStart.height + (e.clientY - resizeStart.y));
      resizeWindow(windowState.id, { width: newWidth, height: newHeight });
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, windowState, moveWindow, resizeWindow]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (windowState.isMaximized) return;
    
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowState.size.width,
      height: windowState.size.height,
    });
  }, [windowState.isMaximized, windowState.size]);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleDoubleClick = useCallback(() => {
    if (windowState.isMaximized) {
      restoreWindow(windowState.id);
    } else {
      maximizeWindow(windowState.id);
    }
  }, [windowState.isMaximized, windowState.id, restoreWindow, maximizeWindow]);

  if (windowState.isMinimized) return null;

  const WindowComponent = windowState.component;

  const style = windowState.isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: windowState.zIndex,
      }
    : {
        top: windowState.position.y,
        left: windowState.position.x,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      };

  const windowClassName = [
    'window',
    isActive ? 'active' : '',
    windowState.isMaximized ? 'maximized' : '',
    isClosing ? 'closing' : '',
    isMinimizing ? 'minimizing' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={windowRef}
      className={windowClassName}
      style={style}
      onMouseDown={() => focusWindow(windowState.id)}
    >
      <div 
        className="window-titlebar" 
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="window-controls">
          <button 
            className="window-control close" 
            onClick={() => closeWindow(windowState.id)}
            title="Close"
          />
          <button 
            className="window-control minimize" 
            onClick={() => minimizeWindow(windowState.id)}
            title="Minimize"
          />
          <button 
            className="window-control maximize" 
            onClick={() => windowState.isMaximized ? restoreWindow(windowState.id) : maximizeWindow(windowState.id)}
            title={windowState.isMaximized ? "Restore" : "Maximize"}
          />
        </div>
        <div className="window-title">
          <span className="window-icon">
            {windowState.icon.startsWith('/') ? (
              <img src={windowState.icon} alt="" className="window-icon-img" />
            ) : (
              windowState.icon
            )}
          </span>
          <span>{windowState.title}</span>
        </div>
        <div className="window-titlebar-spacer" />
      </div>
      <div className="window-content">
        <WindowComponent windowId={windowState.id} />
      </div>
      {!windowState.isMaximized && (
        <div 
          className="window-resize-handle" 
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
}

