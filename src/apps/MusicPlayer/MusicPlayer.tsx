import { useState, useRef, useEffect, useCallback } from 'react';
import './MusicPlayer.css';

interface MusicPlayerProps {
  windowId: string;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  file: string;
}

const SONGS: Song[] = [
  { id: 1, title: 'Back To Black', artist: 'Amy Winehouse', file: '/songs/Amy Winehouse - Back To Black.mp3' },
  { id: 2, title: 'Flying', artist: 'Anathema', file: '/songs/Anathema - Flying.mp3' },
  { id: 3, title: 'Armistice', artist: 'Phoenix', file: '/songs/Armistice · Phoenix.mp3' },
  { id: 4, title: '505', artist: 'Arctic Monkeys', file: '/songs/Artic Monkeys - 505.mp3' },
  { id: 5, title: 'WILDFLOWER', artist: 'Billie Eilish', file: '/songs/Billie Eilish - WILDFLOWER.mp3' },
  { id: 6, title: 'Kletka', artist: 'Molchat Doma', file: '/songs/Molchat Doma - Kletka (Official Lyrics Video) Молчат Дома - Клетка.mp3' },
  { id: 7, title: 'Showbiz', artist: 'Muse', file: '/songs/Muse - Showbiz [HD].mp3' },
  { id: 8, title: 'Everything In Its Right Place', artist: 'Radiohead', file: '/songs/Radiohead - Everything In Its Right Place.mp3' },
  { id: 9, title: 'Saint Pablo', artist: 'Kanye West', file: '/songs/Saint Pablo - Kanye West [LYRICS].mp3' },
  { id: 10, title: 'Civilian', artist: 'Wye Oak', file: '/songs/Wye Oak Civilian.mp3' },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);

const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
  </svg>
);

const RepeatOneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>
  </svg>
);

const VolumeHighIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const VolumeLowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
  </svg>
);

const VolumeMuteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
);

const MusicNoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

export function MusicPlayer({ windowId: _windowId }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = SONGS[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSongIndex]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const playNext = useCallback(() => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * SONGS.length);
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    }
  }, [isShuffled]);

  const playPrevious = useCallback(() => {
    if (currentTime > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    }
  }, [currentTime]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === 'all' || currentSongIndex < SONGS.length - 1) {
      playNext();
    } else {
      setIsPlaying(false);
    }
  }, [repeatMode, currentSongIndex, playNext]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const selectSong = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  }, []);

  const VolumeIcon = volume === 0 ? VolumeMuteIcon : volume < 0.5 ? VolumeLowIcon : VolumeHighIcon;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="now-playing">
        <div className={`album-art ${isPlaying ? 'playing' : ''}`}>
          <div className="album-icon">
            <MusicNoteIcon />
          </div>
        </div>
        <div className="song-info">
          <h2 className="song-title">{currentSong.title}</h2>
          <p className="song-artist">{currentSong.artist}</p>
        </div>
      </div>

      <div className="progress-container">
        <span className="time-current">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
        />
        <span className="time-duration">{formatTime(duration)}</span>
      </div>

      <div className="player-controls">
        <button 
          className={`control-btn ${isShuffled ? 'active' : ''}`}
          onClick={() => setIsShuffled(!isShuffled)}
          title="Shuffle"
        >
          <ShuffleIcon />
        </button>
        <button className="control-btn" onClick={playPrevious} title="Previous">
          <PrevIcon />
        </button>
        <button className="control-btn play-btn" onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="control-btn" onClick={playNext} title="Next">
          <NextIcon />
        </button>
        <button 
          className={`control-btn ${repeatMode !== 'none' ? 'active' : ''}`}
          onClick={() => {
            const modes: ('none' | 'all' | 'one')[] = ['none', 'all', 'one'];
            const currentIndex = modes.indexOf(repeatMode);
            setRepeatMode(modes[(currentIndex + 1) % modes.length]);
          }}
          title={`Repeat: ${repeatMode}`}
        >
          {repeatMode === 'one' ? <RepeatOneIcon /> : <RepeatIcon />}
        </button>
      </div>

      <div className="volume-container">
        <span className="volume-icon">
          <VolumeIcon />
        </span>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>

      <div className="playlist">
        <h3>Playlist</h3>
        <div className="playlist-items">
          {SONGS.map((song, index) => (
            <div
              key={song.id}
              className={`playlist-item ${index === currentSongIndex ? 'active' : ''}`}
              onClick={() => selectSong(index)}
            >
              <span className="playlist-index">
                {index === currentSongIndex && isPlaying ? (
                  <span className="playing-indicator">
                    <span></span><span></span><span></span>
                  </span>
                ) : (
                  index + 1
                )}
              </span>
              <div className="playlist-song-info">
                <span className="playlist-title">{song.title}</span>
                <span className="playlist-artist">{song.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
