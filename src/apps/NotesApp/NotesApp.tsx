import './NotesApp.css';

interface NotesAppProps {
  windowId: string;
}

export function NotesApp({ windowId: _windowId }: NotesAppProps) {
  return (
    <div className="notes-app">
      <div className="notes-content">
        <h2>📝 Welcome to YusufOS</h2>
        <div className="note">
          <p>Hey! Welcome to my interactive portfolio.</p>
          <p>Double-click on desktop icons to open applications.</p>
          <br />
          <p><strong>Applications:</strong></p>
          <p>🌐 Browser - My portfolio & projects</p>
          <p>💻 Terminal - Interactive command line</p>
          <p>🎵 Music - Listen to my playlist</p>
          <p>🐍 Snake - Play the classic game</p>
          <p>🔢 Calculator - Do some math</p>
          <p>📅 Calendar - View dates</p>
          <p>🎨 Paint - Draw something</p>
          <p>🎹 Piano - Play some music</p>
          <p>⏱️ Pomodoro - Focus timer</p>
          <p>⚙️ Settings - Customize wallpaper & theme</p>
          <br />
          <p><strong>Tips:</strong></p>
          <p>• Right-click on desktop for context menu</p>
          <p>• Drag icons to rearrange them</p>
          <p>• Try different themes in Settings!</p>
        </div>
      </div>
    </div>
  );
}
