import { createContext, MutableRefObject } from "react";
import WaveSurfer from "wavesurfer.js";

export type AudioContextControls = {
  play?: (from?: number) => Promise<void>;
  pause?: (to?: number) => void;
  playRegion?: (id: string) => Promise<void>;
  playNextRegion?: () => Promise<void>;
  playPreviousRegion?: () => Promise<void>;
};

export type AudioContextState = {
  currentTimeRef: MutableRefObject<number>;
  isPlaying: boolean;
  playerControls: AudioContextControls;
  waveSurferInstance?: WaveSurfer | null;
};

export const INITIAL_STATE: AudioContextState = {
  currentTimeRef: { current: 0 },
  isPlaying: false,
  playerControls: {},
};

export const AudioContext = createContext<AudioContextState>(INITIAL_STATE);
