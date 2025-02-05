import { ForwardSolid, PauseSolid, PlaySolid, SoundHigh, Timer } from "iconoir-react";
import { useContext, useState } from "react";
import { useRequestAnimationFrame } from "../../../hooks/useRequestAnimationFrame";
import { selectAudioDuration } from "../../../store/features/audio.slice";
import { useAppSelector } from "../../../store/hooks";
import { formatDurationToISOTime } from "../../../utils/time.utils";
import { Typography } from "../../ui/Typography/Typography";
import { AudioCurrentTimeContext } from "../Context/AudioCurrentTimeContext";

type AudioPlayerProps = {
  play?: () => void;
  pause?: () => void;
  playNextRegion?: () => void;
  playPreviousRegion?: () => void;
  isPlaying?: boolean;
};

export const AudioPlayer = ({ play, pause, playNextRegion, playPreviousRegion, isPlaying }: AudioPlayerProps) => {
  // const dispatch = useAppDispatch();
  const duration = useAppSelector(selectAudioDuration);
  const [progress, setProgress] = useState<number>(0);

  const currentTimeRef = useContext(AudioCurrentTimeContext);

  const handleTogglePlay = () => {
    if (!play || !pause) return;

    if (isPlaying) return pause();
    play();
  };

  const handlePreviousRegionClick = () => {
    playPreviousRegion?.();
  };

  const handleNextRegionClick = () => {
    playNextRegion?.();
  };

  const handleVolumeClick = () => {
    // dispatch(toggleVolume());
  };

  const handlePlaybackRateClick = () => {
    // dispatch(toggleVolume());
  };

  useRequestAnimationFrame(() => {
    const currentTime = currentTimeRef?.current;
    setProgress((currentTime / duration) * 100);
  });

  // TODO: increase tap target size for buttons
  return (
    <div className="flex flex-col">
      <div className="progress flex flex-col gap-1 items-stretch px-6 pt-4 pb-2 bg-zinc-100">
        <div className="progress-bar bg-gray-600 h-2 rounded-full outline-2 outline-gray-600 ">
          <div className="progress-indicator bg-gray-300 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex flex-row justify-between">
          <Typography>
            <span className="text-zinc-500 font-normal text-sm">
              {formatDurationToISOTime(currentTimeRef.current, { includeMilliseconds: false })}
            </span>
          </Typography>
          <Typography>
            <span className="text-zinc-500 font-normal text-sm">
              {formatDurationToISOTime(duration, { includeMilliseconds: false })}
            </span>
          </Typography>
        </div>
      </div>
      <div className="controls bg-gray-300 flex flex-row justify-between items-center px-6 py-4">
        <div className="volume flex flex-row gap-2 items-center cursor-pointer w-15">
          <button className="grid place-items-center text-gray-600 cursor-pointer" onClick={handleVolumeClick}>
            <SoundHigh className="text-gray-600" width={16} height={16} strokeWidth={2.2} />
          </button>
          <Typography>
            <span className="text-gray-600 text-xs font-normal">100 %</span>
          </Typography>
        </div>
        <div className="playback-controls flex flex-row gap-4">
          <button className="grid place-items-center text-gray-600 cursor-pointer" onClick={handlePreviousRegionClick}>
            <ForwardSolid className="rotate-180" width={20} height={20} />
          </button>
          <button
            className="bg-gray-600 rounded-full w-10 h-10 grid place-items-center text-zinc-50 cursor-pointer"
            onClick={handleTogglePlay}
          >
            {!isPlaying ? <PlaySolid className="translate-x-[1px]" /> : <PauseSolid />}
          </button>
          <button className="grid place-items-center text-gray-600 cursor-pointer" onClick={handleNextRegionClick}>
            <ForwardSolid width={20} height={20} />
          </button>
        </div>
        <div className="rate flex flex-row gap-2 items-center justify-end cursor-pointer w-15">
          <Typography>
            <span className="text-gray-600 text-xs font-normal">x1</span>
          </Typography>
          <button className="grid place-items-center text-gray-600 cursor-pointer" onClick={handlePlaybackRateClick}>
            <Timer className="text-gray-600" width={16} height={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
};
