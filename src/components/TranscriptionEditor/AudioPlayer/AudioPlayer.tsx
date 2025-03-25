import { ForwardSolid, PauseSolid, PlaySolid } from "iconoir-react";
import { Separator } from "radix-ui";
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

  if (!source) return null;

  return (
    <div className="flex flex-col relative">
      <Separator.Root orientation="horizontal" className="w-full h-px bg-neutral-200" />
      <ProgressBar />
      <Separator.Root orientation="horizontal" className="w-full h-px bg-neutral-200" />
      <div className="controls flex flex-row justify-center items-center px-6 py-1 relative">
        <div className="absolute left-6 h-full">
          <Volume />
        </div>
        <div className="playback-controls flex flex-row gap-2 text-neutral-800">
          <button className="grid place-items-center cursor-pointer" onClick={() => void handlePreviousRegionClick()}>
            <ForwardSolid className="rotate-180" width={16} height={16} />
          </button>
          <button className="w-8 h-8 grid place-items-center cursor-pointer" onClick={() => void handleTogglePlay()}>
            {!isPlaying ? (
              <PlaySolid className="translate-x-[1px]" width={16} height={16} />
            ) : (
              <PauseSolid width={16} height={16} />
            )}
          </button>
          <button className="grid place-items-center cursor-pointer" onClick={() => void handleNextRegionClick()}>
            <ForwardSolid width={16} height={16} />
          </button>
        </div>
        <div className="absolute right-6 h-full">
          <PlaybackRate />
        </div>
      </div>
    </div>
  );
};
