import { useCallback, useRef, useState } from "react";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { ConfigPanel } from "./ConfigPanel/ConfigPanel";
import { AudioCurrentTimeContext } from "./Context/AudioCurrentTimeContext";
import { CuesPanel } from "./CuesPanel/CuesPanel";
import { AudioFileForm } from "./Form/AudioFile/AudioFile";
import { ExportActions } from "./Form/ExportActions/ExportActions";

export const TranscriptionEditor = () => {
  const [play, setPlay] = useState<((id?: string) => void) | undefined>();
  const currentTimeRef = useRef<number>(0);

  const handleAudioPlayerReady = useCallback((playFunction: (id?: string) => void) => {
    setPlay(() => playFunction);
  }, []);

  return (
    <AudioCurrentTimeContext.Provider value={currentTimeRef}>
      <div className="flex flex-col h-full max-h-full">
        <div className="grid grid-rows-1 grid-cols-[1fr_470px] bg-zinc-200 flex-1 overflow-auto">
          <CuesPanel playSprite={play} />
          <ConfigPanel />
        </div>
        <div>
          <AudioFileForm />
          <AudioPlayer onReady={handleAudioPlayerReady} />
          <ExportActions />
        </div>
      </div>
    </AudioCurrentTimeContext.Provider>
  );
};
