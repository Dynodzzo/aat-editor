import { useRef, useState } from "react";

type AudioFileFormProps = {
  onDurationUpdated: (duration: number) => void;
};

export const AudioFileForm = ({ onDurationUpdated }: AudioFileFormProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioObjectURL, setAudioObjectURL] = useState<string>("");

  const handleAudioFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioFile = event.target.files?.[0];
    if (!audioFile) return;

    if (audioObjectURL) URL.revokeObjectURL(audioObjectURL);
    const currentAudioObjectURL = URL.createObjectURL(audioFile);
    setAudioObjectURL(currentAudioObjectURL);

    if (audioRef?.current) {
      audioRef.current.src = currentAudioObjectURL;
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef?.current) {
      onDurationUpdated(audioRef.current.duration);
    }
  };

  return (
    <>
      <input type="file" accept="audio/*" onChange={handleAudioFileChanged} />
      <audio controls ref={audioRef} onLoadedMetadata={handleAudioLoadedMetadata}></audio>
    </>
  );
};
