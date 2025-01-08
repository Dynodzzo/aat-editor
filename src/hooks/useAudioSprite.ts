import { useCallback, useRef } from "react";
import { useAudioFile } from "./useAudioFile";

export const useAudioSprite = (audioObjectURL: string) => {
  const { audioRef, duration, currentTime, play, pause, stop, seek } = useAudioFile(audioObjectURL);
  const spriteUpdateHandler = useRef<(() => void) | null>(null);

  const initializeEventListeners = () => {
    if (!audioRef.current || !spriteUpdateHandler.current) return;

    audioRef.current.addEventListener("timeupdate", spriteUpdateHandler.current);
  };

  const removeEventListeners = () => {
    if (!audioRef.current || !spriteUpdateHandler.current) return;

    audioRef.current.removeEventListener("timeupdate", spriteUpdateHandler.current);
  };

  const playSprite = useCallback(
    (start: number, end: number) => {
      if (!audioRef.current) return;

      resetSprite(start);
      play();

      spriteUpdateHandler.current = () => {
        if (audioRef.current && audioRef.current.currentTime >= end) {
          resetSprite(start);
        }
      };

      initializeEventListeners();
    },
    [audioRef]
  );

  const resetSprite = useCallback((start: number) => {
    pause();
    seek(start);
    removeEventListeners();
    spriteUpdateHandler.current = null;
  }, []);

  return {
    audioRef,
    duration,
    currentTime,
    play,
    pause,
    stop,
    playSprite,
  };
};
