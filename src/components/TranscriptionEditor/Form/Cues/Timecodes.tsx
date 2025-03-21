import { ArrowRight } from "iconoir-react";
import { useId } from "react";
import { AutoHeightTextarea } from "../../../ui/Input/AutoHeightTextarea";

type TimecodesProps = {
  startTime: string;
  endTime: string;
  onChangeStartTime: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeEndTime: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

// const DEFAULT_TIME_INPUT_VALUE = "00:00:00.000";
// const TIME_INPUTS_STEP = "0.001";

export const Timecodes = ({ startTime, endTime, onChangeStartTime, onChangeEndTime }: TimecodesProps) => {
  const startId = useId();
  const endId = useId();

  return (
    <div className="flex flex-row gap-2 items-center">
      <AutoHeightTextarea
        id={startId}
        value={startTime}
        label="From"
        className="w-20 text-xs text-neutral-500"
        onChange={onChangeStartTime}
      />
      <ArrowRight className="text-neutral-500" width={10} height={10} />
      <AutoHeightTextarea
        id={endId}
        value={endTime}
        label="To"
        className="w-20 text-xs text-neutral-500"
        onChange={onChangeEndTime}
      />
    </div>
  );
};
