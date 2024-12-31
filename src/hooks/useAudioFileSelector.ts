import { useRef, useState } from "react";

export const useAudioFileSelector = () => {
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

  return { audioRef, handleAudioFileChanged };
};
