import { useAudioFileSelector } from "../../../hooks/useAudioFileSelector";
import { useTranscriptionFormDispatch } from "../TranscriptionFormContext/TranscriptionFormContext";

type AudioFileFormProps = {};

export const AudioFileForm = ({}: AudioFileFormProps) => {
  const dispatch = useTranscriptionFormDispatch();

  const { audioRef, handleAudioFileChanged } = useAudioFileSelector();

  const handleAudioLoadedMetadata = () => {
    if (audioRef?.current) {
      dispatch({ type: "UPDATE_DURATION", payload: audioRef.current.duration });
    }
  };

  return (
    <>
      <input type="file" accept="audio/*" onChange={handleAudioFileChanged} />
      <audio controls ref={audioRef} onLoadedMetadata={handleAudioLoadedMetadata}></audio>
    </>
  );
};
