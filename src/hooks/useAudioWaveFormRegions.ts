import { MutableRefObject, useCallback, useDeferredValue, useMemo, useRef } from "react";
import { Region } from "wavesurfer.js/dist/plugins/regions.js";
import { selectCuesTranslationsByLanguageId } from "../store/features/cue-translation.slice";
import { selectAllCues, updateCueEnd, updateCueStart } from "../store/features/cue.slice";
import { selectContentLanguage } from "../store/features/metadata.slice";
import { selectAllVoices } from "../store/features/voice.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { formatDurationToISOTime, formatISOTimeToDuration } from "../utils/time.utils";
import { WaveSurferState } from "./useWaveSurfer";

const DEFAULT_REGION_COLOR = "rgba(0, 0, 0, 0.2)";

export const useAudioWaveFormRegions = ({ play, pause }: WaveSurferState, currentTimeRef: MutableRefObject<number>) => {
  const dispatch = useAppDispatch();
  const contentLanguage = useAppSelector(selectContentLanguage);
  const cues = useAppSelector(selectAllCues);
  const deferredCues = useDeferredValue(cues);
  const transcriptions = useAppSelector((state) =>
    selectCuesTranslationsByLanguageId(state, { cueId: "", languageId: contentLanguage })
  );
  const deferredTranscriptions = useDeferredValue(transcriptions);
  const voices = useAppSelector(selectAllVoices);
  const deferredVoices = useDeferredValue(voices);
  const activeRegionId = useRef<string>("");

  const regions = useMemo(() => {
    return deferredCues.map((cue) => {
      const voice = deferredVoices.find((voice) => voice.id === cue.voiceId);
      const content = deferredTranscriptions
        .find((transcription) => transcription.cueId === cue.id)
        ?.text.padStart(1, " ");
      return {
        id: cue.id,
        start: formatISOTimeToDuration(cue.start),
        end: formatISOTimeToDuration(cue.end),
        // TODO Extract the magic constant
        color: voice ? voice.color + "44" : DEFAULT_REGION_COLOR,
        content,
        drag: true,
        resize: true,
      };
    });
  }, [deferredCues, deferredTranscriptions, deferredVoices]);

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
