import { PropsWithChildren, useRef, useState } from "react";
import { CuesForm } from "./Cues/Cues";
import { LanguagesForm } from "./Languages/Languages";
import { MetadataForm } from "./Metadata/Metadata";
import { TranscriptionFormProvider, useTranscriptionForm } from "./FormContext/TranscriptionFormContext";
import { VoicesForm } from "./Voices/Voices";
import { AudioFileForm } from "./AudioFile/AudioFile";
import { ExportActions } from "./ExportActions/ExportActions";
import { TranscriptionState } from "../../../model/TranscriptionModel";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { useAudioSprite } from "../../../hooks/useAudioSprite";
import { useWaveSurfer } from "../../../hooks/useWaveSurfer";

type TranscriptionFormProps = {
  initialFormState?: TranscriptionState;
};

export const TranscriptionForm = ({ initialFormState }: TranscriptionFormProps) => {
  return (
    <TranscriptionFormProvider initialFormState={initialFormState}>
      <TranscriptionFormContent />
    </TranscriptionFormProvider>
  );
};

const TranscriptionFormVisualizer = ({ children }: PropsWithChildren) => {
  const state = useTranscriptionForm();
  return (
    <>
      {children}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

const TranscriptionFormContent = () => {
  const [audioObjectURL, setAudioObjectURL] = useState<string>("");
  const waveSurferContainerRef = useRef<HTMLDivElement>(null);
  //const { audioRef, duration, currentTime, playSprite } = useAudioSprite(audioObjectURL);
  const { currentTime, duration, play, playRegion } = useWaveSurfer(waveSurferContainerRef, audioObjectURL);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAudioSourceChanged = (audioObjectURL: string) => {
    setAudioObjectURL(audioObjectURL);
  };

  return (
    <TranscriptionFormVisualizer>
      <AudioFileForm onAudioFileChanged={handleAudioSourceChanged} />
      {/* <AudioPlayer audioRef={audioRef} /> */}
      <div className="wavesurfer" ref={waveSurferContainerRef}></div>
      <form onSubmit={handleFormSubmit}>
        <MetadataForm />
        <LanguagesForm />
        <VoicesForm />
        <CuesForm audioDuration={duration} currentTime={currentTime} onPlaySprite={playRegion} />
      </form>
      <ExportActions />
    </TranscriptionFormVisualizer>
  );
};
