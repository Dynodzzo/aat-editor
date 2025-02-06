import { useRef } from "react";
import { AudioContext, AudioContextState } from "../../context/audio.context";
import { useAudioWaveformPlayer } from "../../hooks/useAudioWaveFormPlayer";
import { selectAudioSource } from "../../store/features/audio.slice";
import { useAppSelector } from "../../store/hooks";
import { CuesPanel } from "./CuesPanel/CuesPanel";
import { AudioFileImporter } from "./Form/AudioFileImporter/AudioFileImporter";
import { ExportButton } from "./Form/ExportButton/ExportButton";
import { SidePanel } from "./SidePanel/SidePanel";
import { Waveform } from "./WaveForm/WaveForm";

export const TranscriptionEditor = () => {
  const currentTimeRef = useRef<number>(0);
  const source = useAppSelector(selectAudioSource);

  const { containerRef, isPlaying, instance, playRegion, playNextRegion, playPreviousRegion, play, pause } =
    useAudioWaveformPlayer(source, currentTimeRef);

  const audioContext: AudioContextState = {
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
  };

  return (
    <AudioContext.Provider value={audioContext}>
      <div className="flex flex-col h-full max-h-full">
        <div className="grid grid-rows-1 grid-cols-[1fr_470px] bg-zinc-200 flex-1 overflow-auto">
          <CuesPanel />
          <SidePanel />
        </div>
        <div className="flex flex-col bg-zinc-100">
          <div className="flex flex-row gap-4 justify-between">
            <AudioFileImporter />
            <ExportButton />
          </div>
          <Waveform containerRef={containerRef} />
        </div>
      </div>
    </AudioContext.Provider>
  );
};
