import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import { Region } from "wavesurfer.js/dist/plugins/regions.js";
import { selectAllCues, updateCueEnd, updateCueStart } from "../store/features/cue.slice";
import { selectAllVoices } from "../store/features/voice.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { formatDurationToISOTime, formatISOTimeToDuration } from "../utils/time.utils";
import { WaveSurferState } from "./useWaveSurfer";

const DEFAULT_REGION_COLOR = "rgba(0, 0, 0, 0.2)";

export const useAudioWaveFormRegions = ({ play, pause }: WaveSurferState, currentTimeRef: MutableRefObject<number>) => {
  const dispatch = useAppDispatch();
  const cues = useAppSelector(selectAllCues);
  const voices = useAppSelector(selectAllVoices);
  const activeRegionId = useRef<string>("");

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

  const regionsHandlers = useMemo(() => {
    return {
      onRegionUpdated: handleRegionUpdated,
      onRegionOut: handleRegionOut,
    };
  }, [handleRegionUpdated, handleRegionOut]);

  const playRegion = async (regionId?: string) => {
    if (!regionId) return play();

    const region = regions.find((region) => region.id === regionId);
    if (!region) return;

    activeRegionId.current = regionId;
    await play(region.start);
  };

  const playNextRegion = async () => {
    const nextRegion = regions.find((region) => region.start > currentTimeRef.current);

    if (!nextRegion) return;

    await playRegion(nextRegion.id);
  };

  const playPreviousRegion = async () => {
    const previousRegionIndex = Math.max(
      ...regions.map((region, index) => (region.end < currentTimeRef.current ? index : 0))
    );
    const previousRegion = regions[previousRegionIndex];

    if (!previousRegion) return;

    await playRegion(previousRegion.id);
  };

  return { regions, regionsHandlers, playRegion, playNextRegion, playPreviousRegion };
};
