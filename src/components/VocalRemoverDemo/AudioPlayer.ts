/**
 * Gestor de reproducción de audio sincronizada para múltiples stems
 */

import { formatTime } from './utils';
import type { AudioPlayerState } from './types';

export class AudioPlayer {
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private isPlaying: boolean = false;
  private updateCallback: ((state: AudioPlayerState) => void) | null = null;
  private animationFrameId: number | null = null;

  /**
   * Inicializa los elementos de audio
   */
  initializeAudio(stemIds: string[]): void {
    stemIds.forEach((id) => {
      const audio = document.getElementById(`audio-${id}`) as HTMLAudioElement;
      if (audio) {
        this.audioElements.set(id, audio);
        this.setupAudioListeners(id, audio);
      }
    });
  }

  /**
   * Configura los listeners de eventos para un audio
   */
  private setupAudioListeners(stemId: string, audio: HTMLAudioElement): void {
    // Listener para actualizar progreso
    audio.addEventListener('timeupdate', () => {
      this.updateProgress(stemId, audio);
    });

    // Listener para cargar metadata
    audio.addEventListener('loadedmetadata', () => {
      this.updateDuration(audio);
    });

    // Listener para cuando termina la canción
    audio.addEventListener('ended', () => {
      this.handleAudioEnd();
    });
  }

  /**
   * Actualiza el progreso de un stem
   */
  private updateProgress(stemId: string, audio: HTMLAudioElement): void {
    const progressBar = document.querySelector(`[data-progress="${stemId}"]`) as HTMLElement;
    if (progressBar && audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }

  /**
   * Actualiza la duración total
   */
  private updateDuration(audio: HTMLAudioElement): void {
    const durationEl = document.getElementById('duration');
    if (durationEl && audio.duration) {
      durationEl.textContent = formatTime(audio.duration);
    }
  }

  /**
   * Reproduce todos los stems de forma sincronizada
   */
  play(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startProgressAnimation();

    // Sincronizar reproducción
    this.audioElements.forEach((audio, index) => {
      if (audio.readyState >= 2) {
        audio.play().catch(err => console.error(`Error playing audio ${index}:`, err));
      } else {
        audio.addEventListener('canplay', () => {
          audio.play().catch(err => console.error(`Error playing audio ${index}:`, err));
        }, { once: true });
      }
    });

    this.notifyStateChange();
  }

  /**
   * Pausa todos los stems
   */
  pause(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    this.audioElements.forEach(audio => audio.pause());
    this.stopProgressAnimation();
    this.notifyStateChange();
  }

  /**
   * Detiene la reproducción y reinicia todos los audios a 0
   */
  stop(): void {
    this.audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    this.isPlaying = false;
    this.stopProgressAnimation();
    this.resetProgressBars();
    this.notifyStateChange();
  }

  /**
   * Reinicia todos los audios a tiempo 0 sin detener la reproducción
   */
  reset(): void {
    this.audioElements.forEach(audio => {
      audio.currentTime = 0;
    });

    this.resetProgressBars();
    this.notifyStateChange();
  }

  /**
   * Silencia o dessilencia un stem específico
   */
  toggleMute(stemId: string): boolean {
    const audio = this.audioElements.get(stemId);
    if (!audio) return false;

    audio.muted = !audio.muted;
    return audio.muted;
  }

  /**
   * Obtiene el estado actual del reproductor
   */
  getState(): AudioPlayerState {
    const firstAudio = Array.from(this.audioElements.values())[0];
    return {
      isPlaying: this.isPlaying,
      currentTime: firstAudio?.currentTime ?? 0,
      duration: firstAudio?.duration ?? 0,
    };
  }

  /**
   * Verifica si el reproductor está en reproducción
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Salta a una posición específica (en porcentaje)
   */
  seek(percentage: number): void {
    const firstAudio = Array.from(this.audioElements.values())[0];
    if (!firstAudio || !firstAudio.duration) return;

    const newTime = (percentage / 100) * firstAudio.duration;
    this.audioElements.forEach(audio => {
      audio.currentTime = newTime;
    });
  }

  /**
   * Maneja el evento de fin de canción
   */
  private handleAudioEnd(): void {
    if (this.isPlaying) {
      // Loop automático
      this.audioElements.forEach(audio => {
        audio.currentTime = 0;
        audio.play();
      });
    }
  }

  /**
   * Inicia la animación continua de progreso
   */
  private startProgressAnimation(): void {
    if (this.animationFrameId) return;

    const updateProgress = () => {
      const firstAudio = Array.from(this.audioElements.values())[0];
      if (firstAudio?.duration) {
        const progress = (firstAudio.currentTime / firstAudio.duration) * 100;
        const totalProgress = document.getElementById('totalProgress') as HTMLElement;
        const currentTimeEl = document.getElementById('currentTime');

        if (totalProgress) {
          totalProgress.style.width = `${progress}%`;
        }

        if (currentTimeEl) {
          currentTimeEl.textContent = formatTime(firstAudio.currentTime);
        }
      }

      this.animationFrameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
  }

  /**
   * Detiene la animación de progreso
   */
  private stopProgressAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Reinicia los visores de progreso
   */
  private resetProgressBars(): void {
    document.querySelectorAll('[data-progress]').forEach(bar => {
      (bar as HTMLElement).style.width = '0%';
    });

    const totalProgress = document.getElementById('totalProgress') as HTMLElement;
    if (totalProgress) totalProgress.style.width = '0%';

    const currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
  }

  /**
   * Notifica cambios de estado a través del callback
   */
  private notifyStateChange(): void {
    if (this.updateCallback) {
      this.updateCallback(this.getState());
    }
  }

  /**
   * Registra un callback para cambios de estado
   */
  onStateChange(callback: (state: AudioPlayerState) => void): void {
    this.updateCallback = callback;
  }
}
