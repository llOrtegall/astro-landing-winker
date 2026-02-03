/**
 * Inicializador del demo de Vocal Remover
 * Orquesta toda la lógica de reproducción y gestión de stems
 */

import { AudioPlayer } from './AudioPlayer';
import { StemManager } from './StemManager';
import { STEM_IDS } from './constants';

export class VocalRemoverDemo {
  private audioPlayer: AudioPlayer;
  private stemManager: StemManager;

  constructor() {
    this.audioPlayer = new AudioPlayer();
    this.stemManager = new StemManager();
  }

  /**
   * Inicializa el demo
   */
  init(): void {
    this.audioPlayer.initializeAudio(Array.from(STEM_IDS));
    this.stemManager.initialize(Array.from(STEM_IDS));
    this.attachEventListeners();
  }

  /**
   * Adjunta los listeners a los elementos del DOM
   */
  private attachEventListeners(): void {
    // Botón Play/Pause
    document.getElementById('playPauseBtn')?.addEventListener('click', () => {
      this.togglePlayPause();
    });

    // Botón Stop
    document.getElementById('stopBtn')?.addEventListener('click', () => {
      this.stop();
    });

    // Botón Reset
    document.getElementById('resetBtn')?.addEventListener('click', () => {
      this.reset();
    });

    // Botones de mute
    STEM_IDS.forEach((id) => {
      const muteBtn = document.querySelector(`[data-stem-mute="${id}"]`);
      muteBtn?.addEventListener('click', () => {
        this.toggleMuteStem(id);
      });
    });
  }

  /**
   * Alterna entre play y pause
   */
  private togglePlayPause(): void {
    const isPlaying = this.audioPlayer.getIsPlaying();
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const playBtn = document.getElementById('playPauseBtn');

    if (isPlaying) {
      this.audioPlayer.pause();
      playIcon?.classList.remove('hidden');
      pauseIcon?.classList.add('hidden');
      playBtn?.classList.remove('pulse-active');
    } else {
      this.audioPlayer.play();
      playIcon?.classList.add('hidden');
      pauseIcon?.classList.remove('hidden');
      playBtn?.classList.add('pulse-active');
    }
  }

  /**
   * Detiene la reproducción
   */
  private stop(): void {
    this.audioPlayer.stop();
    this.updatePlayPauseUI();
  }

  /**
   * Reinicia la canción
   */
  private reset(): void {
    this.audioPlayer.reset();
  }

  /**
   * Alterna el mute de un stem
   */
  private toggleMuteStem(stemId: string): void {
    const isMuted = this.stemManager.toggleMute(stemId);
    this.audioPlayer.toggleMute(stemId);
  }

  /**
   * Actualiza la UI del botón play/pause
   */
  private updatePlayPauseUI(): void {
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const playBtn = document.getElementById('playPauseBtn');

    playIcon?.classList.remove('hidden');
    pauseIcon?.classList.add('hidden');
    playBtn?.classList.remove('pulse-active');
  }
}

/**
 * Inicialización automática cuando el DOM está listo
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const demo = new VocalRemoverDemo();
    demo.init();
  });
} else {
  // El DOM ya está listo
  const demo = new VocalRemoverDemo();
  demo.init();
}
