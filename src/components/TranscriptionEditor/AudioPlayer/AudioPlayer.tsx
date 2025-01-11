import { Cue } from "../../../model/TranscriptionModel";

type AudioPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
  onCueUpdated: (cue: Cue) => void;
};

export const AudioPlayer = ({ audioRef }: AudioPlayerProps) => {
  return (
    <div className="audio-player">
      <audio controls ref={audioRef}></audio>
    </div>
  );
};
