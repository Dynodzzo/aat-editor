import { Separator } from "radix-ui";
import { memo, useMemo, useRef } from "react";
import { AudioContext, AudioContextState } from "../../context/audio.context";
import { useAudioWaveformPlayer } from "../../hooks/useAudioWaveFormPlayer";
import { selectAudioSource } from "../../store/features/audio.slice";
import { useAppSelector } from "../../store/hooks";
import { CuesPanel } from "./CuesPanel/CuesPanel";
import { AudioFileImporter } from "./Form/AudioFileImporter/AudioFileImporter";
import { RightActions } from "./RightActions/RightActions";
import { SidePanel } from "./SidePanel/SidePanel";
import { TopActions } from "./TopActions/TopActions";
import { Waveform } from "./WaveForm/WaveForm";

export const TranscriptionEditor = memo(function TranscriptionEditor() {
  const currentTimeRef = useRef<number>(0);
  const source = useAppSelector(selectAudioSource);

  const {
    containerRef,
    isPlaying,
    loadingState,
    instance,
    playRegion,
    playNextRegion,
    playPreviousRegion,
    play,
    pause,
  } = useAudioWaveformPlayer(source, currentTimeRef);

  const audioContext: AudioContextState = useMemo(
    () => ({
      currentTimeRef,
      isPlaying,
      waveSurferInstance: instance,
      playerControls: {
        play,
        pause,
        playRegion,
        playNextRegion,
        playPreviousRegion,
      },
    }),
    [currentTimeRef, isPlaying, instance, play, pause, playRegion, playNextRegion, playPreviousRegion]
  );

  return (
    <AudioContext.Provider value={audioContext}>
      <div className="flex flex-row items-stretch h-full max-h-full w-full">
        <div className="flex flex-col flex-1 bg-neutral-100 overflow-hidden">
          <TopActions />

          <div className="flex flex-row flex-1 border-t-1 border-r-1 border-b-1 border-neutral-200 rounded-tr-lg overflow-hidden">
            <CuesPanel />
            <Separator.Root orientation="vertical" className="w-px bg-neutral-200" />
            <SidePanel />
          </div>

          <div className="flex flex-col border-r-1 border-neutral-200 p-1 bg-white">
            {!source && <AudioFileImporter />}
            <Waveform containerRef={containerRef} loadingState={loadingState} />
          </div>
        </div>
        <RightActions />
      </div>
    </AudioContext.Provider>
  );
});
