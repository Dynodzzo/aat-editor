import { PropsWithChildren } from "react";
import { CuesForm } from "./CuesForm/CuesForm";
import { LanguagesForm } from "./LanguagesForm/LanguagesForm";
import { MetadataForm } from "./MetadataForm/MetadataForm";
import {
  TranscriptionFormProvider,
  TranscriptionFormState,
  useTranscriptionForm,
} from "./TranscriptionFormContext/TranscriptionFormContext";
import { VoicesForm } from "./VoicesForm/VoicesForm";
import { AudioFileForm } from "./AudioFileForm/AudioFileForm";
import { ExportActions } from "./ExportActions/ExportActions";

type TranscriptionFormProps = {
  initialFormState?: TranscriptionFormState;
};

export const TranscriptionForm = ({ initialFormState }: TranscriptionFormProps) => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <TranscriptionFormProvider initialFormState={initialFormState}>
      <TranscriptionFormWrapper>
        <AudioFileForm />
        <form onSubmit={handleFormSubmit}>
          <MetadataForm />
          <LanguagesForm />
          <VoicesForm />
          <CuesForm />
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
