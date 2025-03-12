import { ArrowRight } from "iconoir-react";
import { useId } from "react";
import { TransformableInput } from "../../../ui/Input/TransformableInput";

type TimecodesProps = {
  startTime: string;
  endTime: string;
  onChangeStartTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEndTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// const DEFAULT_TIME_INPUT_VALUE = "00:00:00.000";
// const TIME_INPUTS_STEP = "0.001";

export const Timecodes = ({ startTime, endTime, onChangeStartTime, onChangeEndTime }: TimecodesProps) => {
  const startId = useId();
  const endId = useId();

  return (
    <div className="flex flex-row gap-2 items-center">
      <TransformableInput
        id={startId}
        value={startTime}
        label="From"
        className="w-20 text-xs text-neutral-500"
        onChange={onChangeStartTime}
      />
      <ArrowRight className="text-neutral-500" width={10} height={10} />
      <TransformableInput
        id={endId}
        value={endTime}
        label="To"
        className="w-20 text-xs text-neutral-500"
        onChange={onChangeEndTime}
      />
    </div>
  );
};
