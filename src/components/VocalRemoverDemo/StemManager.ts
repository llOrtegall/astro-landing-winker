import type { StemState } from './types';

export class StemManager {
  private muteStates: Map<string, boolean> = new Map();

  initialize(stemIds: string[]): void {
    stemIds.forEach((id) => {
      this.muteStates.set(id, false);
    });
  }

  toggleMute(stemId: string): boolean {
    const currentState = this.muteStates.get(stemId) ?? false;
    const newState = !currentState;
    this.muteStates.set(stemId, newState);
    this.updateButtonStyles(stemId, newState);
    return newState;
  }

  isMuted(stemId: string): boolean {
    return this.muteStates.get(stemId) ?? false;
  }

  getStates(): StemState[] {
    return Array.from(this.muteStates.entries()).map(([id, isMuted]) => ({
      id,
      isMuted,
      progress: 0,
    }));
  }

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

  unmuteAll(): void {
    this.muteStates.forEach((_, id) => {
      if (this.muteStates.get(id)) {
        this.toggleMute(id);
      }
    });
  }
}
