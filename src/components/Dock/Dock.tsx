import type { DockItem as DockItemType } from '../../types';
import { DockItem } from './DockItem';
import './Dock.css';

interface DockProps {
  items: DockItemType[];
}

export function Dock({ items }: DockProps) {
  return (
    <div className="dock-container">
      <div className="dock">
        {items.map((item) => (
          <DockItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

