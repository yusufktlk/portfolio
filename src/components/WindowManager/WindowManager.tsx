import { useWindows } from '../../contexts/WindowContext';
import { Window } from '../Window';
import './WindowManager.css';

export function WindowManager() {
  const { windows } = useWindows();

  return (
    <div className="window-manager">
      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}
    </div>
  );
}

