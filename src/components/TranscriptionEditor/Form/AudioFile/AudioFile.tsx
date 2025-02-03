import { useEffect } from "react";
import { useAudioFileSelector } from "../../../../hooks/useAudioFileSelector";
import { updateAudioSource } from "../../../../store/features/audio.slice";
import { useAppDispatch } from "../../../../store/hooks";

export const AudioFileForm = () => {
  const { audioObjectURL, handleAudioFileChanged } = useAudioFileSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (audioObjectURL) {
      dispatch(updateAudioSource(audioObjectURL));
    }
  }, [audioObjectURL, dispatch]);

  return (
    <>
      <input type="file" accept="audio/*" onChange={handleAudioFileChanged} />
    </>
  );
};
