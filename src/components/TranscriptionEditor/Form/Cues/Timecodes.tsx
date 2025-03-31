import { ArrowRight } from "iconoir-react";
import { memo, useCallback, useId } from "react";
import {
  selectCueEndById,
  selectCueStartById,
  updateCueEnd,
  updateCueStart,
} from "../../../../store/features/cue.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { AutoHeightTextarea } from "../../../ui/Input/AutoHeightTextarea";

type TimecodesProps = {
  cueId: string;
};

// const DEFAULT_TIME_INPUT_VALUE = "00:00:00.000";
// const TIME_INPUTS_STEP = "0.001";

export const Timecodes = memo(function Timecodes({ cueId }: TimecodesProps) {
  const startId = useId();
  const endId = useId();

  const dispatch = useAppDispatch();
  const start = useAppSelector((state) => selectCueStartById(state, cueId));
  const end = useAppSelector((state) => selectCueEndById(state, cueId));

  const handleChangeStart = useCallback(
    (value: string) => {
      dispatch(updateCueStart({ id: cueId, start: value }));
    },
    [dispatch, cueId]
  );

  const handleChangeEnd = useCallback(
    (value: string) => {
      dispatch(updateCueEnd({ id: cueId, end: value }));
    },
    [dispatch, cueId]
  );

  return (
    <div className="flex flex-row gap-2 items-center">
      <AutoHeightTextarea
        id={startId}
        value={start}
        label="From"
        className="w-20 text-xs text-neutral-500"
        onChange={handleChangeStart}
      />
      <ArrowRight className="text-neutral-500" width={10} height={10} />
      <AutoHeightTextarea
        id={endId}
        value={end}
        label="To"
        className="w-20 text-xs text-neutral-500"
        onChange={handleChangeEnd}
      />
    </div>
  );
});
