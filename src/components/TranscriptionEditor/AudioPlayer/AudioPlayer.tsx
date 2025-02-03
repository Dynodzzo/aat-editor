import { memo, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { Region } from "wavesurfer.js/dist/plugins/regions.js";
import { useWaveSurfer } from "../../../hooks/useWaveSurfer";
import { useWaveSurferRegions } from "../../../hooks/useWaveSurferRegions";
import { selectAudioSource, updateAudioDuration } from "../../../store/features/audio.slice";
import { selectAllCues, updateCueEnd, updateCueStart } from "../../../store/features/cue.slice";
import { selectAllVoices } from "../../../store/features/voice.slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { formatDurationToISOTime, formatISOTimeToDuration } from "../../../utils/time.utils";
import { AudioCurrentTimeContext } from "../Context/AudioCurrentTimeContext";

type AudioPlayerProps = {
  onReady?: (play: () => Promise<void>) => void;
};

const WAVE_SURFER_ZOOM_MIN_ZOOM = 0;
const WAVE_SURFER_ZOOM_MAX_ZOOM = 150;
const WAVE_SURFER_ZOOM_DEFAULT_ZOOM = 70;
const WAVE_SURFER_ZOOM_STEP = 0.1;
const DEFAULT_REGION_COLOR = "rgba(0, 0, 0, 0.2)";

export const AudioPlayer = memo(function AudioPlayer({ onReady }: AudioPlayerProps) {
  const dispatch = useAppDispatch();
  const source = useAppSelector(selectAudioSource);
  const cues = useAppSelector(selectAllCues);
  const voices = useAppSelector(selectAllVoices);
  const activeRegionId = useRef<string>("");
  const zoom = useRef<number>(WAVE_SURFER_ZOOM_DEFAULT_ZOOM);

  const currentTimeRef = useContext(AudioCurrentTimeContext);
  const { waveSurfer, containerRef, duration, isReady, play, pause } = useWaveSurfer(source, currentTimeRef);

  const regions = useMemo(() => {
    return cues.map((cue) => {
      const voice = voices.find((voice) => voice.id === cue.voiceId);
      return {
        id: cue.id,
        start: formatISOTimeToDuration(cue.start),
        end: formatISOTimeToDuration(cue.end),
        // TODO Extract the magic constant
        color: voice ? voice.color + "44" : DEFAULT_REGION_COLOR,
        content: voice?.name,
        drag: true,
        resize: true,
      };
    });
  }, [cues, voices]);

  const handleRegionUpdated = useCallback(
    ({ id, start, end }: Region) => {
      const doesCueExists = cues.some((cue) => cue.id === id);

      if (doesCueExists) {
        dispatch(updateCueStart({ id, start: formatDurationToISOTime(start) }));
        dispatch(updateCueEnd({ id, end: formatDurationToISOTime(end) }));
      }
    },
    [cues, dispatch]
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
      onRegionUpdated: handleRegionUpdated,
      onRegionOut: handleRegionOut,
    };
  }, [handleRegionUpdated, handleRegionOut]);

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
    dispatch(updateAudioDuration(duration));
  }, [dispatch, duration]);

  return (
    <div className="audio-player" style={{ backgroundColor: "white" }}>
      <div ref={containerRef} className="wavesurfer-container"></div>
    </div>
  );
});
