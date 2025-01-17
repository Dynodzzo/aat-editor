import { useCallback, useState } from "react";
import { TranscriptionState } from "../../model/TranscriptionModel";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { TranscriptionEditorProvider } from "./Context/ContextProvider";
import { TranscriptionForm } from "./Form/Form";

type TranscriptionEditorProps = {
  initialFormState?: TranscriptionState;
};

export const TranscriptionEditor = ({ initialFormState }: TranscriptionEditorProps) => {
  const [play, setPlay] = useState<((id?: string) => void) | undefined>();

  const handleAudioPlayerReady = useCallback((playFunction: (id?: string) => void) => {
    setPlay(() => playFunction);
  }, []);

  return (
    <TranscriptionEditorProvider initialFormState={initialFormState}>
      <AudioPlayer onReady={handleAudioPlayerReady} />
      <TranscriptionForm onPlay={play} />;
    </TranscriptionEditorProvider>
  );
};
