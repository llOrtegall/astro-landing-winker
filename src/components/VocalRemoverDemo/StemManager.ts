/**
 * Gestor de estados individuales de stems (vocales, drums, etc)
 */

import type { StemState } from './types';

export class StemManager {
  private muteStates: Map<string, boolean> = new Map();

  /**
   * Inicializa los estados de mute para todos los stems
   */
  initialize(stemIds: string[]): void {
    stemIds.forEach((id) => {
      this.muteStates.set(id, false);
    });
  }

  /**
   * Alterna el estado de mute de un stem
   */
  toggleMute(stemId: string): boolean {
    const currentState = this.muteStates.get(stemId) ?? false;
    const newState = !currentState;
    this.muteStates.set(stemId, newState);
    this.updateButtonStyles(stemId, newState);
    return newState;
  }

  /**
   * Verifica si un stem está muteado
   */
  isMuted(stemId: string): boolean {
    return this.muteStates.get(stemId) ?? false;
  }

  /**
   * Obtiene el estado de todos los stems
   */
  getStates(): StemState[] {
    return Array.from(this.muteStates.entries()).map(([id, isMuted]) => ({
      id,
      isMuted,
      progress: 0,
    }));
  }

  /**
   * Actualiza los estilos visuales del botón de mute
   */
  private updateButtonStyles(stemId: string, isMuted: boolean): void {
    const button = document.querySelector(`[data-stem-mute="${stemId}"]`);
    const volumeOn = button?.querySelector('.volume-on');
    const volumeOff = button?.querySelector('.volume-off');

    if (!button) return;

    if (isMuted) {
      // Estado muteado - agregar clase y cambiar iconos
      button.classList.add('muted');
      volumeOn?.classList.add('hidden');
      volumeOff?.classList.remove('hidden');
    } else {
      // Estado activo - remover clase y cambiar iconos
      button.classList.remove('muted');
      volumeOn?.classList.remove('hidden');
      volumeOff?.classList.add('hidden');
    }
  }

  /**
   * Desmutea todos los stems
   */
  unmuteAll(): void {
    this.muteStates.forEach((_, id) => {
      if (this.muteStates.get(id)) {
        this.toggleMute(id);
      }
    });
  }
}
