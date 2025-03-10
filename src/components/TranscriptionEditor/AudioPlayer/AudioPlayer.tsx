import clsx from "clsx";
import { ForwardSolid, PauseSolid, PlaySolid } from "iconoir-react";
import { useContext } from "react";
import { AudioContext } from "../../../context/audio.context";
import { selectAudioSource } from "../../../store/features/audio.slice";
import { useAppSelector } from "../../../store/hooks";
import { PlaybackRate } from "./PlaybackRate";
import { ProgressBar } from "./ProgressBar";
import { Volume } from "./Volume";

export const AudioPlayer = () => {
  const source = useAppSelector(selectAudioSource);

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

  return (
    <div className="flex flex-col relative">
      <ProgressBar />
      <div className="controls bg-gray-300 flex flex-row justify-center items-center px-6 py-4 relative">
        <div className="absolute left-6 h-full">
          <Volume />
        </div>
        <div className="playback-controls flex flex-row gap-4">
          <button
            className="grid place-items-center text-gray-600 cursor-pointer"
            onClick={() => void handlePreviousRegionClick()}
          >
            <ForwardSolid className="rotate-180" width={20} height={20} />
          </button>
          <button
            className="bg-gray-600 rounded-full w-10 h-10 grid place-items-center text-zinc-100 cursor-pointer"
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
        <div className="absolute right-6 h-full">
          <PlaybackRate />
        </div>
      </div>
      <div
        className={clsx("bg-gray-500/60 size-full absolute top-0 left-0", {
          hidden: !!source,
        })}
      />
    </div>
  );
};
