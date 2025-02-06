import { MutableRefObject, useEffect } from "react";
import { updateAudioDuration } from "../store/features/audio.slice";
import { useAppDispatch } from "../store/hooks";
import { useAudioWaveFormRegions } from "./useAudioWaveFormRegions";
import { useWaveSurfer } from "./useWaveSurfer";
import { useWaveSurferRegions } from "./useWaveSurferRegions";
import { useWaveSurferZoom } from "./useWaveSurferZoom";

export const useAudioWaveformPlayer = (source: string, currentTimeRef: MutableRefObject<number>) => {
  const dispatch = useAppDispatch();

  const waveSurferState = useWaveSurfer(source, currentTimeRef);

  useWaveSurferZoom(waveSurferState);

  const { regions, regionsHandlers, playRegion, playNextRegion, playPreviousRegion } = useAudioWaveFormRegions(
    waveSurferState,
    currentTimeRef
  );
  useWaveSurferRegions(waveSurferState, regions, regionsHandlers);

  useEffect(() => {
    dispatch(updateAudioDuration(waveSurferState.duration));
  }, [dispatch, waveSurferState.duration]);

  return {
    ...waveSurferState,
    playRegion,
    playNextRegion,
    playPreviousRegion,
  };
};
