import { ForwardSolid, PauseSolid, PlaySolid, SoundHigh, Timer } from "iconoir-react";
import { useContext } from "react";
import { Typography } from "../../ui/Typography/Typography";
import { AudioContext } from "../Context/AudioContext";
import { Progress } from "./Progress";

export const AudioPlayer = () => {
  // const dispatch = useAppDispatch();

  const {
    isPlaying,
    playerControls: { play, pause, playNextRegion, playPreviousRegion },
  } = useContext(AudioContext);

  const handleTogglePlay = async () => {
    if (!play || !pause) return;

    if (isPlaying) return pause();
    await play();
  };

  const handlePreviousRegionClick = async () => {
    await playPreviousRegion?.();
  };

  const handleNextRegionClick = async () => {
    await playNextRegion?.();
  };

  const handleVolumeClick = () => {
    // dispatch(toggleVolume());
  };

  const handlePlaybackRateClick = () => {
    // dispatch(toggleVolume());
  };

  // TODO: increase tap target size for buttons
  return (
    <div className="flex flex-col">
      <Progress />
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
          <button
            className="grid place-items-center text-gray-600 cursor-pointer"
            onClick={() => void handlePreviousRegionClick()}
          >
            <ForwardSolid className="rotate-180" width={20} height={20} />
          </button>
          <button
            className="bg-gray-600 rounded-full w-10 h-10 grid place-items-center text-zinc-50 cursor-pointer"
            onClick={() => void handleTogglePlay()}
          >
            {!isPlaying ? <PlaySolid className="translate-x-[1px]" /> : <PauseSolid />}
          </button>
          <button
            className="grid place-items-center text-gray-600 cursor-pointer"
            onClick={() => void handleNextRegionClick()}
          >
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
