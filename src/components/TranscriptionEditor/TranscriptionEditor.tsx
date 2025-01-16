import { useCallback, useState } from "react";
import { TranscriptionState } from "../../model/TranscriptionModel";
import { AppProvider } from "../Context/ContextProvider";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
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
    <AppProvider initialTranscriptionFormState={initialFormState}>
      <AudioPlayer onReady={handleAudioPlayerReady} />
      <TranscriptionForm onPlay={play} />;
    </AppProvider>
  );
};
