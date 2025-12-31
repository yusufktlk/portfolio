import type { ComponentType } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  position: Position;
  size: Size;
  minSize: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  component: ComponentType<{ windowId: string }>;
}

export interface DesktopIcon {
  id: string;
  title: string;
  icon: string;
  type: 'app' | 'file' | 'folder';
  position: Position;
  onOpen: () => void;
}

export interface DockItem {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  onClick: () => void;
}

