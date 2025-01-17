import { useCallback, useEffect, useRef, useState } from "react";

export const useAudioFile = (audioObjectURL: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  }, []);

  const initializeEventListeners = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
  }, [handleTimeUpdate, handleLoadedMetadata]);

  const removeEventListeners = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [handleTimeUpdate, handleLoadedMetadata]);

  useEffect(() => {
    changeAudioSource(audioObjectURL);
    initializeEventListeners();

    return () => removeEventListeners();
  }, [audioObjectURL, initializeEventListeners, removeEventListeners]);

  const changeAudioSource = (audioObjectURL: string) => {
    if (audioObjectURL && audioRef.current) {
      audioRef.current.src = audioObjectURL;
    }
  };

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    await audioRef.current.play();
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    if (!audioRef.current.paused) audioRef.current.pause();
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    pause();
    seek(0);
  }, [pause, seek]);

  return { audioRef, duration, currentTime, play, pause, stop, seek };
};
