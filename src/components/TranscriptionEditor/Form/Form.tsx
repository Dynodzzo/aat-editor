import { PropsWithChildren } from "react";
import { useAppContext, useAppDispatch } from "../../Context/useContext";
import { AudioFileForm } from "./AudioFile/AudioFile";
import { CuesForm } from "./Cues/Cues";
import { ExportActions } from "./ExportActions/ExportActions";
import { LanguagesForm } from "./Languages/Languages";
import { MetadataForm } from "./Metadata/Metadata";
import { VoicesForm } from "./Voices/Voices";

type TranscriptionFormProps = {
  onPlay?: (id?: string) => void;
};

export const TranscriptionForm = ({ onPlay }: TranscriptionFormProps) => {
  const dispatch = useAppDispatch();
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAudioSourceChanged = (currentAudioSource: string) => {
    dispatch({ type: "UPDATE_AUDIO_SOURCE", payload: currentAudioSource });
  };

  return (
    <TranscriptionFormVisualizer>
      <AudioFileForm onAudioFileChanged={handleAudioSourceChanged} />
      <form onSubmit={handleFormSubmit}>
        <MetadataForm />
        <LanguagesForm />
        <VoicesForm />
        <CuesForm onPlaySprite={onPlay} />
      </form>
      <ExportActions />
    </TranscriptionFormVisualizer>
  );
};

const TranscriptionFormVisualizer = ({ children }: PropsWithChildren) => {
  const state = useAppContext();
  return (
    <>
      {children}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
