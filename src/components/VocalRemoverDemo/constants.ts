/**
 * Constantes para el demo del Vocal Remover
 */

export const STEM_IDS = [
  'vocals',
  'drums',
  'bass',
  'piano',
  'guitar',
  'other',
] as const;

// Base URL para los archivos de audio externos
const AUDIO_BASE_URL =
  'https://vocalremover.winkermind.com/media/examples/Billie_Eilish_-_bad_guy.flac';

export const STEMS_CONFIG = [
  {
    id: 'vocals',
    name: 'Vocals',
    file: `${AUDIO_BASE_URL}/Billie_Eilish_-_bad_guy_Vocals_by_vipremixer_q5xbFCP.wav`,
    spectrum: '/src/assets/voice/vocal.webp',
  },
  {
    id: 'drums',
    name: 'Drums',
    file: `${AUDIO_BASE_URL}/Billie_Eilish_-_bad_guy_Drums_by_vipremixer.wav`,
    spectrum: '/src/assets/voice/drums.webp',
  },
  {
    id: 'bass',
    name: 'Bass',
    file: `${AUDIO_BASE_URL}/Billie_Eilish_-_bad_guy_Bass_by_vipremixer.wav`,
    spectrum: '/src/assets/voice/bass.webp',
  },
  {
    id: 'piano',
    name: 'Piano',
    file: `${AUDIO_BASE_URL}/Billie_Eilish_-_bad_guy_Piano_by_vipremixer.wav`,
    spectrum: '/src/assets/voice/piano.webp',
  },
  {
    id: 'guitar',
    name: 'Guitar',
    file: `${AUDIO_BASE_URL}/Billie_Eilish_-_bad_guy_Guitar_by_vipremixer.wav`,
    spectrum: '/src/assets/voice/guitar.webp',
  },
  {
    id: 'other',
    name: 'Other',
    file: `${AUDIO_BASE_URL}/Billie_Eilish_-_bad_guy_Other_by_vipremixer.wav`,
    spectrum: '/src/assets/voice/other.webp',
  },
] as const;

export const ANIMATION_DELAYS = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35] as const;
