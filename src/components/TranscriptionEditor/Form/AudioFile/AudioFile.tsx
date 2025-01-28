import { useEffect } from "react";
import { useAudioFileSelector } from "../../../../hooks/useAudioFileSelector";
import { useTranscriptionEditorDispatch } from "../../Context/useContext";

export const AudioFileForm = () => {
  const { audioObjectURL, handleAudioFileChanged } = useAudioFileSelector();
  const dispatch = useTranscriptionEditorDispatch();

  useEffect(() => {
    if (audioObjectURL) {
      dispatch({ type: "UPDATE_AUDIO_SOURCE", payload: audioObjectURL });
    }
  }, [audioObjectURL, dispatch]);

  return (
    <>
      <input type="file" accept="audio/*" onChange={handleAudioFileChanged} />
    </>
  );
};
