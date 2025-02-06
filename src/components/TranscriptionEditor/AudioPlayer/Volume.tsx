import clsx from "clsx";
import { SoundHigh } from "iconoir-react";
import { useContext, useState } from "react";
import { AudioContext } from "../Context/AudioContext";

export const Volume = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [volume, setVolume] = useState(100);
  const { waveSurferInstance } = useContext(AudioContext);

  const handleClick = () => {
    if (isHidden) return setIsHidden(false);
  };

  const handleVolumeBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const volumeBar = event.currentTarget;
    const { left, width } = volumeBar.getBoundingClientRect();
    const clickX = event.clientX - left;
    const newVolume = Number(((clickX / width) * 100).toFixed(0));

    setVolume(newVolume);
    waveSurferInstance?.setVolume?.(newVolume / 100);
  };

  const handleMouseLeave = () => {
    setIsHidden(true);
  };

  return (
    <div
      className={clsx("volume flex flex-row items-center cursor-pointer h-full", {
        "gap-2": !isHidden,
        "gap-1": isHidden,
      })}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <button className="grid place-items-center text-gray-600 cursor-pointer">
        <SoundHigh className="text-gray-600" width={16} height={16} strokeWidth={2.2} />
      </button>
      <div
        className={clsx("bar-container h-2 rounded-full bg-zinc-100 hover:w-15 transition-all", {
          "w-0": isHidden,
          "w-15": !isHidden,
        })}
        onClick={handleVolumeBarClick}
      >
        <div className="bar-indicator bg-gray-600 h-2 rounded-full" style={{ width: `${volume}%` }} />
      </div>
      <span className="text-gray-600 text-xs font-normal">{volume}%</span>
    </div>
  );
};
