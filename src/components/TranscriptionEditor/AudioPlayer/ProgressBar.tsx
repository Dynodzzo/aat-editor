import { useContext, useState } from "react";
import { AudioContext } from "../../../context/audio.context";
import { useRequestAnimationFrame } from "../../../hooks/useRequestAnimationFrame";
import { selectAudioDuration } from "../../../store/features/audio.slice";
import { useAppSelector } from "../../../store/hooks";
import { formatDurationToISOTime } from "../../../utils/time.utils";
import { Progress } from "../../ui/Progress/Progress";
import { Typography } from "../../ui/Typography/Typography";

export const ProgressBar = () => {
  const duration = useAppSelector(selectAudioDuration);
  const { currentTimeRef, waveSurferInstance } = useContext(AudioContext);
  const [progress, setProgress] = useState<number>(0);

  useRequestAnimationFrame(() => {
    if (!duration) return;
    const currentTime = currentTimeRef?.current;
    const percentage = (currentTime / duration) * 100;
    setProgress(percentage);
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const { left, width } = progressBar.getBoundingClientRect();
    const clickX = event.clientX - left;
    const newTime = (clickX / width) * duration;
    waveSurferInstance?.setTime?.(newTime);
  };

  return (
    <div className="progress flex flex-col items-stretch px-6 pt-3 pb-2">
      <Progress progress={progress} onClick={handleClick} />
      <div className="flex flex-row justify-between">
        <Typography>
          <span className="text-neutral-500 font-normal text-[10px]">
            {formatDurationToISOTime(currentTimeRef.current, { includeMilliseconds: false })}
          </span>
        </Typography>
        <Typography>
          <span className="text-neutral-500 font-normal text-[10px]">
            {formatDurationToISOTime(duration, { includeMilliseconds: false })}
          </span>
        </Typography>
      </div>
    </div>
  );
};
