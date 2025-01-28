import { useCallback, useState } from "react";
import { TranscriptionState } from "../../model/TranscriptionModel";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { ConfigPanel } from "./ConfigPanel/ConfigPanel";
import { TranscriptionEditorProvider } from "./Context/ContextProvider";
import { CuesPanel } from "./CuesPanel/CuesPanel";
import { AudioFileForm } from "./Form/AudioFile/AudioFile";

type TranscriptionEditorProps = {
  initialFormState?: TranscriptionState;
};

export const TranscriptionEditor = ({ initialFormState }: TranscriptionEditorProps) => {
  const [play, setPlay] = useState<((id?: string) => void) | undefined>();

  const handleAudioPlayerReady = useCallback((playFunction: (id?: string) => void) => {
    setPlay(() => playFunction);
  }, []);

  return (
    <div className="flex flex-col h-full max-h-full">
      <TranscriptionEditorProvider initialFormState={initialFormState}>
        <div className="grid grid-rows-1 grid-cols-[1fr_470px] bg-zinc-200 flex-1 overflow-auto">
          <CuesPanel playSprite={play} />
          <ConfigPanel />
        </div>
        <div>
          <AudioFileForm />
          <AudioPlayer onReady={handleAudioPlayerReady} />
        </div>
      </TranscriptionEditorProvider>
    </div>
  );
};
