import { PropsWithChildren } from "react";
import { CuesForm } from "./CuesForm/CuesForm";
import { LanguagesForm } from "./LanguagesForm/LanguagesForm";
import { MetadataForm } from "./MetadataForm/MetadataForm";
import { TranscriptionFormProvider, useTranscriptionForm } from "./TranscriptionFormContext/TranscriptionFormContext";
import { VoicesForm } from "./VoicesForm/VoicesForm";
import { AudioFileForm } from "./AudioFileForm/AudioFileForm";

type TranscriptionFormProps = {};

export const TranscriptionForm = ({}: TranscriptionFormProps) => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <TranscriptionFormProvider>
      <TranscriptionFormWrapper>
        <AudioFileForm />
        <form onSubmit={handleFormSubmit}>
          <MetadataForm />
          <LanguagesForm />
          <VoicesForm />
          <CuesForm />
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
