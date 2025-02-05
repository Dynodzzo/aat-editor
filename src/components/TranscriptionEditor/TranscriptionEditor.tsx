/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef } from "react";
import { useAudioWaveformPlayer } from "../../hooks/useAudioWaveFormPlayer";
import { selectAudioSource } from "../../store/features/audio.slice";
import { useAppSelector } from "../../store/hooks";
import { AudioCurrentTimeContext } from "./Context/AudioCurrentTimeContext";
import { CuesPanel } from "./CuesPanel/CuesPanel";
import { AudioFileImporter } from "./Form/AudioFileImporter/AudioFileImporter";
import { ExportButton } from "./Form/ExportButton/ExportButton";
import { SidePanel } from "./SidePanel/SidePanel";
import { Waveform } from "./WaveForm/WaveForm";

export const TranscriptionEditor = () => {
  const currentTimeRef = useRef<number>(0);
  const source = useAppSelector(selectAudioSource);

  const { containerRef, playRegion, play, pause, isPlaying } = useAudioWaveformPlayer(source, currentTimeRef);

  return (
    <AudioCurrentTimeContext.Provider value={currentTimeRef}>
      <div className="flex flex-col h-full max-h-full">
        <div className="grid grid-rows-1 grid-cols-[1fr_470px] bg-zinc-200 flex-1 overflow-auto">
          <CuesPanel playSprite={playRegion} />
          <SidePanel play={() => play()} pause={pause} isPlaying={isPlaying} />
        </div>
        <div>
          <AudioFileImporter />
          <Waveform containerRef={containerRef} />
          <ExportButton />
        </div>
      </div>
    </AudioCurrentTimeContext.Provider>
  );
};
