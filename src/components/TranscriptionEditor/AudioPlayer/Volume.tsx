import clsx from "clsx";
import { SoundHigh } from "iconoir-react";
import { useContext, useState } from "react";
import { AudioContext } from "../../../context/audio.context";
import { Slider } from "../../ui/Slider/Slider";

export const Volume = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [volume, setVolume] = useState(100);
  const { waveSurferInstance } = useContext(AudioContext);

  const handleClick = () => {
    if (isHidden) return setIsHidden(false);
  };

  const handleVolumeBarClick = (newValue: number) => {
    if (newValue) {
      setVolume(newValue);
      waveSurferInstance?.setVolume?.(newValue / 100);
    }
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
        className={clsx("transition-all ", {
          "w-0 opacity-0": isHidden,
          "w-15 opacity-100": !isHidden,
        })}
      >
        <Slider value={volume} onChange={handleVolumeBarClick} />
      </div>
      <span className="text-gray-600 text-xs font-normal">{volume}%</span>
    </div>
  );
};
