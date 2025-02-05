import { useEffect, useRef } from "react";
import { WaveSurferState } from "./useWaveSurfer";

const WAVE_SURFER_ZOOM_MIN = 0;
const WAVE_SURFER_ZOOM_MAX = 150;
const WAVE_SURFER_ZOOM_DEFAULT = 70;
const WAVE_SURFER_ZOOM_STEP = 0.1;

export const useWaveSurferZoom = ({ instance, isReady, containerRef }: WaveSurferState) => {
  const zoom = useRef<number>(WAVE_SURFER_ZOOM_DEFAULT);

  useEffect(() => {
    if (!instance || !isReady) return;

    const waveSurferContainer = containerRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();

        const newZoom = Math.min(
          Math.max(zoom.current + event.deltaY * -WAVE_SURFER_ZOOM_STEP, WAVE_SURFER_ZOOM_MIN),
          WAVE_SURFER_ZOOM_MAX
        );
        zoom.current = newZoom;
        instance.zoom(newZoom);
      }
    };

    waveSurferContainer?.addEventListener("wheel", handleWheel);

    return () => {
      waveSurferContainer?.removeEventListener("wheel", handleWheel);
    };
  }, [instance, isReady, containerRef]);
};
