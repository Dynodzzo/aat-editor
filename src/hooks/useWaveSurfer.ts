import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export type WaveSurferState = {
  instance: WaveSurfer | null;
  containerRef: React.RefObject<HTMLDivElement>;
  duration: number;
  isReady: boolean;
  isPlaying: boolean;
  play: (from?: number) => Promise<void>;
  pause: (to?: number) => void;
};

export const useWaveSurfer = (source: string, currentTimeRef: MutableRefObject<number>): WaveSurferState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current || !source) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "gainsboro",
      progressColor: "darkgrey",
      cursorColor: "red",
      cursorWidth: 2,
      mediaControls: false,
      url: source,
      backend: "MediaElement",
      height: 100,
    });

    ws.on("load", () => {
      setIsReady(false);
      setIsPlaying(false);
      currentTimeRef.current = 0;
    });

    ws.on("ready", (duration: number) => {
      ws.zoom(70);
      setIsReady(true);
      setDuration(duration);
      currentTimeRef.current = 0;
    });

    ws.on("play", () => {
      setIsPlaying(true);
    });

    ws.on("pause", () => {
      setIsPlaying(false);
    });

    ws.on("timeupdate", (time: number) => {
      currentTimeRef.current = time;
    });

    ws.on("destroy", () => {
      setIsReady(false);
      setIsPlaying(false);
      currentTimeRef.current = 0;
    });

    setWaveSurfer(ws);

    return () => {
      ws.unAll();
      ws.destroy();
      setWaveSurfer(null);
    };
  }, [currentTimeRef, source]);

  const play = useCallback(
    async (from?: number) => {
      if (!waveSurfer) return;

      // Makes sure the cursor starts from the correct position
      if (typeof from === "number" && from >= 0) waveSurfer.setTime(from);

      try {
        await waveSurfer.play();
      } catch (e) {
        console.log("Failed to play", e);
      }
    },
    [waveSurfer]
  );

  const pause = useCallback(
    (to?: number) => {
      if (!waveSurfer) return;

      waveSurfer.pause();
      // Makes sure the cursor stops at the correct position
      if (typeof to === "number" && to >= 0) waveSurfer.setTime(to);
    },
    [waveSurfer]
  );

  return {
    instance: waveSurfer,
    containerRef,
    duration,
    isReady,
    isPlaying,
    play,
    pause,
  };
};
