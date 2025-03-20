import { useState } from "react";

export const useAudioFileSelector = () => {
  const [audioObjectURL, setAudioObjectURL] = useState<string>("");

  const handleAudioFileChanged = (file: File) => {
    if (!file) return;

    if (audioObjectURL) URL.revokeObjectURL(audioObjectURL);
    const currentAudioObjectURL = URL.createObjectURL(file);
    setAudioObjectURL(currentAudioObjectURL);
  };

  return { audioObjectURL, handleAudioFileChanged };
};
