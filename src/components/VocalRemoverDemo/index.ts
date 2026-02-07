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
    this.setupControlButtons();
    this.setupProgressBars();
    this.setupMuteButtons();
  }

  /**
   * Configura los botones de control (Play, Stop, Reset)
   */
  private setupControlButtons(): void {
    document.getElementById('playPauseBtn')?.addEventListener('click', () => {
      this.togglePlayPause();
    });

    document.getElementById('stopBtn')?.addEventListener('click', () => {
      this.stop();
    });

    document.getElementById('resetBtn')?.addEventListener('click', () => {
      this.reset();
    });
  }

  /**
   * Configura el seek en las barras de progreso (principal y de stems)
   */
  private setupProgressBars(): void {
    // Barra de progreso principal
    const mainProgressContainer = document.getElementById(
      'mainProgressContainer',
    ) as HTMLElement;
    if (mainProgressContainer) {
      mainProgressContainer.addEventListener('click', (e) => {
        this.handleProgressSeek(e, mainProgressContainer);
      });
    }

    // Barras de progreso de stems
    document.querySelectorAll('[data-progress]').forEach((bar) => {
      const container = bar.parentElement as HTMLElement;
      if (!container) return;

      container.addEventListener('click', (e) => {
        this.handleProgressSeek(e, container);
      });
    });
  }

  /**
   * Maneja el evento de seek en cualquier barra de progreso
   */
  private handleProgressSeek(event: MouseEvent, container: HTMLElement): void {
    const rect = container.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    this.audioPlayer.seek(Math.max(0, Math.min(100, percent)));
  }

  /**
   * Configura los botones de mute de cada stem
   */
  private setupMuteButtons(): void {
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
