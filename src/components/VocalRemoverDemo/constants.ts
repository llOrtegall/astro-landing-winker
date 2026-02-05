/**
 * Constantes para el demo del Vocal Remover
 */

export const STEM_IDS = ["vocals", "drums", "bass", "piano", "guitar", "other"] as const;

export const STEMS_CONFIG = [
  { id: "vocals", name: "Vocals", file: "/demo/Billie_Eilish_-_bad_guy_Vocals_by_vipremixer_q5xbFCP.wav" },
  { id: "drums", name: "Drums", file: "/demo/Billie_Eilish_-_bad_guy_Drums_by_vipremixer.wav" },
  { id: "bass", name: "Bass", file: "/demo/Billie_Eilish_-_bad_guy_Bass_by_vipremixer.wav" },
  { id: "piano", name: "Piano", file: "/demo/Billie_Eilish_-_bad_guy_Piano_by_vipremixer.wav" },
  { id: "guitar", name: "Guitar", file: "/demo/Billie_Eilish_-_bad_guy_Guitar_by_vipremixer.wav" },
  { id: "other", name: "Other", file: "/demo/Billie_Eilish_-_bad_guy_Other_by_vipremixer.wav" },
] as const;

export const ANIMATION_DELAYS = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35] as const;
