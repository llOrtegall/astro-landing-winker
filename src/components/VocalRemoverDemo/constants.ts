/**
 * Constantes para el demo del Vocal Remover
 */

import vocalsAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Vocals.mp3';
import drumsAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Drums.mp3';
import bassAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Bass.mp3';
import pianoAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Piano.mp3';
import guitarAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Guitar.mp3';
import otherAudio from '../../assets/audios/Billie_Eilish_-_bad_guy_Other.mp3';
import vocalImg from '../../assets/voice/vocal.webp';
import drumsImg from '../../assets/voice/drums.webp';
import bassImg from '../../assets/voice/bass.webp';
import pianoImg from '../../assets/voice/piano.webp';
import guitarImg from '../../assets/voice/guitar.webp';
import otherImg from '../../assets/voice/other.webp';
import type { Stem, StemId } from './types';

export const STEM_IDS = [
  'vocals',
  'drums',
  'bass',
  'piano',
  'guitar',
  'other',
] as const satisfies readonly StemId[];

export const STEMS_CONFIG: readonly Stem[] = [
  {
    id: 'vocals',
    name: 'Vocals',
    file: vocalsAudio,
    spectrum: vocalImg,
  },
  {
    id: 'drums',
    name: 'Drums',
    file: drumsAudio,
    spectrum: drumsImg,
  },
  {
    id: 'bass',
    name: 'Bass',
    file: bassAudio,
    spectrum: bassImg,
  },
  {
    id: 'piano',
    name: 'Piano',
    file: pianoAudio,
    spectrum: pianoImg,
  },
  {
    id: 'guitar',
    name: 'Guitar',
    file: guitarAudio,
    spectrum: guitarImg,
  },
  {
    id: 'other',
    name: 'Other',
    file: otherAudio,
    spectrum: otherImg,
  },
] as const;

export const ANIMATION_DELAYS = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35] as const;
