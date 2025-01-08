import { useCallback, useEffect, useRef, useState } from "react";

export const useAudioFile = (audioObjectURL: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    changeAudioSource(audioObjectURL);
    initializeEventListeners();

    return () => removeEventListeners();
  }, [audioObjectURL]);

  const changeAudioSource = (audioObjectURL: string) => {
    if (audioObjectURL && audioRef.current) {
      audioRef.current.src = audioObjectURL;
    }
  };

  const initializeEventListeners = () => {
    if (!audioRef.current) return;

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
  };

  const removeEventListeners = () => {
    if (!audioRef.current) return;

    audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play();
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    if (!audioRef.current.paused) audioRef.current.pause();
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    pause();
    seek(0);
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }, []);

  return { audioRef, duration, currentTime, play, pause, stop, seek };
};
