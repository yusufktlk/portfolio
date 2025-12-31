import './NotesApp.css';

interface NotesAppProps {
  windowId: string;
}

export function NotesApp({ windowId: _windowId }: NotesAppProps) {
  return (
    <div className="notes-app">
      <div className="notes-content">
        <h2>📝 My Notes</h2>
        <div className="note">
          <p>Welcome to my portfolio!</p>
          <p>You can double-click on desktop icons to open applications.</p>
          <br />
          <p>🌐 Internet - Shows my portfolio</p>
          <p>📁 Projects - Lists my projects</p>
          <p>📧 Contact - Get in touch with me</p>
        </div>
      </div>
    </div>
  );
}
