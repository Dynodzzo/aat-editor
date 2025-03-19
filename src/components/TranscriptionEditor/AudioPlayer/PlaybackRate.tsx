import { Timer } from "iconoir-react";
import { useContext, useId, useState } from "react";
import { AudioContext } from "../../../context/audio.context";
import { IconTrigger } from "../../ui/Select/IconTrigger";
import { Select, SelectItem } from "../../ui/Select/Select";

const PLAYBACK_RATES = ["0.5", "0.75", "1", "1.25", "1.5", "2"] as const;

export const PlaybackRate = () => {
  const [rate, setRate] = useState("1");
  const selectId = useId();
  const { waveSurferInstance } = useContext(AudioContext);

  const handleRateChange = (newRate: string) => {
    setRate(newRate);
    waveSurferInstance?.setPlaybackRate(Number(newRate));
  };

  return (
    <div className="playback-rate flex flex-row items-center cursor-pointer h-full">
      <Select
        value={rate}
        trigger={
          <IconTrigger
            id={selectId}
            icon={<Timer className="text-neutral-500" width={16} height={16} strokeWidth={2.2} />}
            className="text-neutral-500 font-normal text-[10px] h-full"
          />
        }
        onChange={handleRateChange}
      >
        {PLAYBACK_RATES.map((playbackRate, index) => (
          <SelectItem key={index} value={playbackRate}>
            x{playbackRate}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
