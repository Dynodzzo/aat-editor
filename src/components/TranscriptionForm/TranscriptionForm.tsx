import { PropsWithChildren, useRef } from "react";
import { CuesForm } from "./CuesForm/CuesForm";
import { LanguagesForm } from "./LanguagesForm/LanguagesForm";
import { MetadataForm } from "./MetadataForm/MetadataForm";
import { TranscriptionFormProvider, useTranscriptionForm } from "./TranscriptionFormContext/TranscriptionFormContext";
import { VoicesForm } from "./VoicesForm/VoicesForm";
import { AudioFileForm } from "./AudioFileForm/AudioFileForm";
import { ExportActions } from "./ExportActions/ExportActions";
import { TranscriptionState } from "../../model/TranscriptionModel";
import { formatDurationToISOTime } from "../../utils/time.utils";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

type TranscriptionFormProps = {
  initialFormState?: TranscriptionState;
};

export const TranscriptionForm = ({ initialFormState }: TranscriptionFormProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAudioFileChanged = (audioObjectURL: string) => {
    console.log("Audio file changed", audioObjectURL);
    if (audioObjectURL && audioRef.current) {
      audioRef.current.src = audioObjectURL;
    }
  };

  const handleGetAudioDuration = () => {
    return audioRef.current?.duration || 0;
  };

  const handleGetCurrentTime = () => {
    return formatDurationToISOTime(audioRef.current?.currentTime || 0);
  };

  const handlePlaySprite = (start: number, end: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = start;
    audioRef.current.play();

    audioRef.current.addEventListener("timeupdate", function onTimeUpdate() {
      if (!audioRef.current) return;

      if (audioRef.current.currentTime >= end) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", onTimeUpdate);
      }
    });
  };

  return (
    <TranscriptionFormProvider initialFormState={initialFormState}>
      <TranscriptionFormWrapper>
        <AudioFileForm onAudioFileChanged={handleAudioFileChanged} />
        <AudioPlayer audioRef={audioRef} />
        <form onSubmit={handleFormSubmit}>
          <MetadataForm />
          <LanguagesForm />
          <VoicesForm />
          <CuesForm
            onGetAudioDuration={handleGetAudioDuration}
            onGetCurrentTime={handleGetCurrentTime}
            onPlaySprite={handlePlaySprite}
          />
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
