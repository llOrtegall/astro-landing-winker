import type { ImageMetadata } from 'astro';

export type StemId = 'vocals' | 'drums' | 'bass' | 'piano' | 'guitar' | 'other';

export interface Stem {
  id: StemId;
  name: string;
  file: string;
  spectrum: ImageMetadata;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export interface StemState {
  id: StemId;
  isMuted: boolean;
  progress: number;
}
