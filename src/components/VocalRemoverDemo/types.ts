export interface Stem {
  id: string;
  name: string;
  file: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export interface StemState {
  id: string;
  isMuted: boolean;
  progress: number;
}
