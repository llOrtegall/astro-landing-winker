/**
 * Constantes para el demo del Vocal Remover
 */

import vocalsAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Vocals.mp3';
import drumsAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Drums.mp3';
import bassAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Bass.mp3';
import pianoAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Piano.mp3';
import guitarAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Guitar.mp3';
import otherAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Other.mp3';

export const STEM_IDS = [
  'vocals',
  'drums',
  'bass',
  'piano',
  'guitar',
  'other',
] as const;

export const STEMS_CONFIG = [
  {
    id: 'vocals',
    name: 'Vocals',
    file: vocalsAudio,
    spectrum: '/src/assets/voice/vocal.webp',
  },
  {
    id: 'drums',
    name: 'Drums',
    file: drumsAudio,
    spectrum: '/src/assets/voice/drums.webp',
  },
  {
    id: 'bass',
    name: 'Bass',
    file: bassAudio,
    spectrum: '/src/assets/voice/bass.webp',
  },
  {
    id: 'piano',
    name: 'Piano',
    file: pianoAudio,
    spectrum: '/src/assets/voice/piano.webp',
  },
  {
    id: 'guitar',
    name: 'Guitar',
    file: guitarAudio,
    spectrum: '/src/assets/voice/guitar.webp',
  },
  {
    id: 'other',
    name: 'Other',
    file: otherAudio,
    spectrum: '/src/assets/voice/other.webp',
  },
] as const;

export const ANIMATION_DELAYS = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35] as const;
