import { useContext, useState } from "react";
import { useRequestAnimationFrame } from "../../../hooks/useRequestAnimationFrame";
import { selectAudioDuration } from "../../../store/features/audio.slice";
import { useAppSelector } from "../../../store/hooks";
import { AudioCurrentTimeContext } from "../Context/AudioCurrentTimeContext";

type AudioPlayerProps = {
  play?: () => void;
  pause?: () => void;
  isPlaying?: boolean;
};

export const AudioPlayer = ({ play, pause, isPlaying }: AudioPlayerProps) => {
  // const dispatch = useAppDispatch();
  const duration = useAppSelector(selectAudioDuration);
  const [progress, setProgress] = useState<number>(0);

  const currentTimeRef = useContext(AudioCurrentTimeContext);

  const handleTogglePlay = () => {
    if (!play || !pause) return;

    if (isPlaying) return pause();
    play();
  };

  useRequestAnimationFrame(() => {
    const currentTime = currentTimeRef?.current;
    setProgress((currentTime / duration) * 100);
  });

  return (
    <div className="flex flex-col">
      <div className="progress">{progress}</div>
      <div className="controls">
        <button onClick={handleTogglePlay}>{!isPlaying ? "Play" : "Pause"}</button>
      </div>
    </div>
  );
};
