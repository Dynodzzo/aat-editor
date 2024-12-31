import { PropsWithChildren, useState } from "react";
import { CuesForm } from "./CuesForm/CuesForm";
import { LanguagesForm } from "./LanguagesForm/LanguagesForm";
import { MetadataForm } from "./MetadataForm/MetadataForm";
import { TranscriptionFormProvider, useTranscriptionForm } from "./TranscriptionFormContext/TranscriptionFormContext";
import { VoicesForm } from "./VoicesForm/VoicesForm";
import { AudioFileForm } from "./AudioFileForm/AudioFileForm";

type TranscriptionFormProps = {};

export const TranscriptionForm = ({}: TranscriptionFormProps) => {
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAudioFileLoaded = (duration: number) => {
    setAudioDuration(duration);
  };

  return (
    <TranscriptionFormProvider>
      <TranscriptionFormWrapper>
        <AudioFileForm onDurationUpdated={handleAudioFileLoaded} />
        <form onSubmit={handleFormSubmit}>
          <MetadataForm />
          <LanguagesForm />
          <VoicesForm />
          <CuesForm audioDuration={audioDuration} />
        </form>
      </TranscriptionFormWrapper>
    </TranscriptionFormProvider>
  );
};

const TranscriptionFormWrapper = ({ children }: PropsWithChildren) => {
  const { cues } = useTranscriptionForm();
  return (
    <>
      {children}
      <pre>{JSON.stringify(cues, null, 2)}</pre>
    </>
  );
};
