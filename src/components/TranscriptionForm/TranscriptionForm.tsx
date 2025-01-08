import { PropsWithChildren, useState } from "react";
import { CuesForm } from "./CuesForm/CuesForm";
import { LanguagesForm } from "./LanguagesForm/LanguagesForm";
import { MetadataForm } from "./MetadataForm/MetadataForm";
import { TranscriptionFormProvider, useTranscriptionForm } from "./TranscriptionFormContext/TranscriptionFormContext";
import { VoicesForm } from "./VoicesForm/VoicesForm";
import { AudioFileForm } from "./AudioFileForm/AudioFileForm";
import { ExportActions } from "./ExportActions/ExportActions";
import { TranscriptionState } from "../../model/TranscriptionModel";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { useAudioSprite } from "../../hooks/useAudioSprite";

type TranscriptionFormProps = {
  initialFormState?: TranscriptionState;
};

export const TranscriptionForm = ({ initialFormState }: TranscriptionFormProps) => {
  const [audioObjectURL, setAudioObjectURL] = useState<string>("");
  const { audioRef, duration, currentTime, playSprite } = useAudioSprite(audioObjectURL);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAudioSourceChanged = (audioObjectURL: string) => {
    setAudioObjectURL(audioObjectURL);
  };

  return (
    <TranscriptionFormProvider initialFormState={initialFormState}>
      <TranscriptionFormWrapper>
        <AudioFileForm onAudioFileChanged={handleAudioSourceChanged} />
        <AudioPlayer audioRef={audioRef} />
        <form onSubmit={handleFormSubmit}>
          <MetadataForm />
          <LanguagesForm />
          <VoicesForm />
          <CuesForm audioDuration={duration} currentTime={currentTime} onPlaySprite={playSprite} />
        </form>
        <ExportActions />
      </TranscriptionFormWrapper>
    </TranscriptionFormProvider>
  );
};

const TranscriptionFormWrapper = ({ children }: PropsWithChildren) => {
  const state = useTranscriptionForm();
  return (
    <>
      {children}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
