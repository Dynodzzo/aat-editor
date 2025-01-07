import { useEffect } from "react";
import { useAudioFileSelector } from "../../../hooks/useAudioFileSelector";

type AudioFileFormProps = {
  onAudioFileChanged: (audioObjectURL: string) => void;
};

export const AudioFileForm = ({ onAudioFileChanged }: AudioFileFormProps) => {
  const { audioObjectURL, handleAudioFileChanged } = useAudioFileSelector();

  useEffect(() => {
    if (audioObjectURL) {
      onAudioFileChanged(audioObjectURL);
    }
  }, [audioObjectURL]);

  return (
    <>
      <input type="file" accept="audio/*" onChange={handleAudioFileChanged} />
    </>
  );
};
