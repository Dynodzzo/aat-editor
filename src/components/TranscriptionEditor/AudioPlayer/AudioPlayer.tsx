import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Region } from "wavesurfer.js/dist/plugins/regions.js";
import { useAppContext, useAppDispatch } from "../../Context/Context";
import { formatDurationToISOTime, formatISOTimeToDuration } from "../../../utils/time.utils";
import { useWaveSurfer } from "../../../hooks/useWaveSurfer";
import { useWaveSurferRegions } from "../../../hooks/useWaveSurferRegions";

type AudioPlayerProps = {
  onReady?: (play: () => void) => void;
};

const WAVE_SURFER_ZOOM_MIN_ZOOM: number = 0;
const WAVE_SURFER_ZOOM_MAX_ZOOM: number = 150;
const WAVE_SURFER_ZOOM_DEFAULT_ZOOM: number = 70;
const WAVE_SURFER_ZOOM_STEP: number = 0.1;
const DEFAULT_REGION_COLOR: string = "rgba(0, 0, 0, 0.2)";

export const AudioPlayer = memo(({ onReady }: AudioPlayerProps) => {
  const {
    transcriptionForm: { cues, voices },
    audioPlayer: { source },
  } = useAppContext();
  const dispatch = useAppDispatch();
  const [activeRegionId, setActiveRegionId] = useState<string>("");
  const [zoom, setZoom] = useState<number>(WAVE_SURFER_ZOOM_DEFAULT_ZOOM);

  const { waveSurfer, containerRef, currentTimeRef, duration, isReady, isPlaying, play, pause } = useWaveSurfer(source);

  const regions = useMemo(() => {
    return cues.map((cue) => {
      const voice = voices.find((voice) => voice.id === cue.voice);
      return {
        id: cue.key,
        start: formatISOTimeToDuration(cue.start),
        end: formatISOTimeToDuration(cue.end),
        color: voice ? voice.color + "44" : DEFAULT_REGION_COLOR,
        content: voice?.id,
        drag: true,
        resize: true,
      };
    });
  }, [isReady, cues, voices]);

  const handleRegionUpdate = useCallback(
    ({ start }: Region) => {
      if (isPlaying) pause(start);
    },
    [waveSurfer, isPlaying, pause]
  );

  const handleRegionUpdated = useCallback(
    ({ id, start, end }: Region) => {
      if (isPlaying) pause(start);

      const doesCueExists = cues.some((cue) => cue.key === id);

      if (doesCueExists) {
        dispatch({
          type: "UPDATE_TRANSCRIPTION_CUES",
          payload: cues.map((cue) => {
            if (cue.key === id) {
              return {
                ...cue,
                start: formatDurationToISOTime(start),
                end: formatDurationToISOTime(end),
              };
            }

            return cue;
          }),
        });
      }
    },
    [waveSurfer, isPlaying, cues, pause, dispatch]
  );

  const handleRegionOut = useCallback(
    ({ id, end }: Region) => {
      setActiveRegionId((currentActiveRegionId) => {
        if (currentActiveRegionId === id) {
          pause(end);
          return "";
        }

        return currentActiveRegionId;
      });
    },
    [waveSurfer, pause]
  );

  const waveSurferRegionsHandlers = useMemo(() => {
    return {
      onRegionUpdate: handleRegionUpdate,
      onRegionUpdated: handleRegionUpdated,
      onRegionOut: handleRegionOut,
    };
  }, [handleRegionUpdate, handleRegionUpdated, handleRegionOut]);

  useWaveSurferRegions(waveSurfer, regions, isReady, waveSurferRegionsHandlers);

  useEffect(() => {
    if (!isReady || !onReady) return;

    const playRegion = (regionId?: string) => {
      if (!regionId) return play();

      const region = regions.find((region) => region.id === regionId);
      if (!region) return;

      setActiveRegionId(regionId);
      play(region.start);
    };

    onReady((regionId?: string) => {
      playRegion(regionId);
    });
  }, [isReady, regions, onReady, play]);

  useEffect(() => {
    if (!waveSurfer || !isReady) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();

        setZoom((currentZoom) => {
          const newZoom = Math.min(
            Math.max(currentZoom + event.deltaY * -WAVE_SURFER_ZOOM_STEP, WAVE_SURFER_ZOOM_MIN_ZOOM),
            WAVE_SURFER_ZOOM_MAX_ZOOM
          );

          waveSurfer.zoom(newZoom);
          return newZoom;
        });
      }
    };

    containerRef.current?.addEventListener("wheel", handleWheel);

    return () => {
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [waveSurfer, isReady]);

  useEffect(() => {
    dispatch({ type: "UPDATE_AUDIO_DURATION", payload: duration });
  }, [duration]);

  useEffect(() => {
    dispatch({ type: "UPDATE_AUDIO_CURRENT_TIME", payload: currentTimeRef });
  }, [isReady]);

  return (
    <div className="audio-player" style={{ position: "sticky", top: 0, backgroundColor: "white" }}>
      <div ref={containerRef} className="wavesurfer-container"></div>
    </div>
  );
});
