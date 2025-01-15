import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export const useWaveSurfer = (source: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current || !source) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "gainsboro",
      progressColor: "darkgrey",
      cursorColor: "red",
      cursorWidth: 1,
      mediaControls: true,
      url: source,
    });

    ws.on("load", () => {
      setIsReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
    });

    ws.on("ready", (duration: number) => {
      ws.zoom(70);
      setIsReady(true);
      setDuration(duration);
      setCurrentTime(0);
    });

    ws.on("play", () => {
      setIsPlaying(true);
    });

    ws.on("pause", () => {
      setIsPlaying(false);
    });

    ws.on("timeupdate", (time: number) => {
      setCurrentTime(time);
    });

    ws.on("destroy", () => {
      setIsReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
    });

    setWaveSurfer(ws);

    return () => {
      ws.unAll();
      ws.destroy();
      setWaveSurfer(null);
    };
  }, [source]);

  const play = useCallback(
    async (from?: number) => {
      if (!waveSurfer) return;

      if (typeof from === "number" && from >= 0) waveSurfer.setTime(from);
      try {
        await waveSurfer.play();
      } catch (e) {
        console.log("fail", e);
      }
    },
    [waveSurfer]
  );

  const pause = useCallback(
    (to?: number) => {
      if (waveSurfer) {
        waveSurfer.pause();
        // Makes sure the cursor stops at the right position
        if (typeof to === "number" && to >= 0) waveSurfer.setTime(to);
      }
    },
    [waveSurfer]
  );

  return {
    waveSurfer,
    containerRef,
    currentTime,
    duration,
    isReady,
    isPlaying,
    play,
    pause,
  };
};
