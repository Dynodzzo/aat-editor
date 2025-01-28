import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Region } from "wavesurfer.js/dist/plugins/regions.js";
import { useWaveSurfer } from "../../../hooks/useWaveSurfer";
import { useWaveSurferRegions } from "../../../hooks/useWaveSurferRegions";
import { formatDurationToISOTime, formatISOTimeToDuration } from "../../../utils/time.utils";
import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../Context/useContext";

type AudioPlayerProps = {
  onReady?: (play: () => Promise<void>) => void;
};

const WAVE_SURFER_ZOOM_MIN_ZOOM = 0;
const WAVE_SURFER_ZOOM_MAX_ZOOM = 150;
const WAVE_SURFER_ZOOM_DEFAULT_ZOOM = 70;
const WAVE_SURFER_ZOOM_STEP = 0.1;
const DEFAULT_REGION_COLOR = "rgba(0, 0, 0, 0.2)";

export const AudioPlayer = memo(function AudioPlayer({ onReady }: AudioPlayerProps) {
  const {
    transcriptionForm: { cues, voices },
    audioPlayer: { source },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();
  const activeRegionId = useRef<string>("");
  const zoom = useRef<number>(WAVE_SURFER_ZOOM_DEFAULT_ZOOM);

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
  }, [cues, voices]);

  const handleRegionUpdate = useCallback(
    ({ start }: Region) => {
      if (isPlaying) pause(start);
    },
    [isPlaying, pause]
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
    [isPlaying, cues, pause, dispatch]
  );

  const handleRegionOut = useCallback(
    ({ id, end }: Region) => {
      if (activeRegionId.current === id) {
        pause(end);
        activeRegionId.current = "";
      }
    },
    [pause]
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

    const playRegion = async (regionId?: string) => {
      if (!regionId) return play();

      const region = regions.find((region) => region.id === regionId);
      if (!region) return;

      activeRegionId.current = regionId;
      await play(region.start);
    };

    onReady(async (regionId?: string) => {
      await playRegion(regionId);
    });
  }, [isReady, regions, onReady, play]);

  useEffect(() => {
    if (!waveSurfer || !isReady) return;

    const waveSurferContainer = containerRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();

        const newZoom = Math.min(
          Math.max(zoom.current + event.deltaY * -WAVE_SURFER_ZOOM_STEP, WAVE_SURFER_ZOOM_MIN_ZOOM),
          WAVE_SURFER_ZOOM_MAX_ZOOM
        );
        zoom.current = newZoom;
        waveSurfer.zoom(newZoom);
      }
    };

    waveSurferContainer?.addEventListener("wheel", handleWheel);

    return () => {
      waveSurferContainer?.removeEventListener("wheel", handleWheel);
    };
  }, [waveSurfer, isReady, containerRef]);

  useEffect(() => {
    dispatch({ type: "UPDATE_AUDIO_DURATION", payload: duration });
  }, [dispatch, duration]);

  useEffect(() => {
    dispatch({ type: "UPDATE_AUDIO_CURRENT_TIME", payload: currentTimeRef });
  }, [dispatch, currentTimeRef]);

  return (
    <div className="audio-player" style={{ backgroundColor: "white" }}>
      <div ref={containerRef} className="wavesurfer-container"></div>
    </div>
  );
});
