type AudioPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

export const AudioPlayer = ({ audioRef }: AudioPlayerProps) => {
  return (
    <div className="audio-player">
      <audio controls ref={audioRef}></audio>
    </div>
  );
};
