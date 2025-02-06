import clsx from "clsx";
import { PlaySolid, Trash } from "iconoir-react";
import { memo, useCallback, useContext, useId } from "react";
import { Language } from "../../../../model/transcription/language.model";
import {
  deleteCue,
  selectCueById,
  updateCueEnd,
  updateCueStart,
  updateCueVoiceId,
} from "../../../../store/features/cue.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { formatDurationToISOTime } from "../../../../utils/time.utils";
import { Button } from "../../../ui/Button/Button";
import { Input } from "../../../ui/Input/Input";
import { InputFieldInline } from "../../../ui/InputField/InputFieldInline";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { Typography } from "../../../ui/Typography/Typography";
import { AudioContext } from "../../Context/AudioContext";
import { CueTranslation } from "./CueTranslation";
import { CueVoice } from "./CueVoice";

const DEFAULT_TIME_INPUT_VALUE = "00:00:00.000";
const TIME_INPUTS_STEP = "0.001";

type CueProps = {
  index: string;
  cueId: string;
  languages: Language[];
  duration?: number;
  isBeingPlayed?: boolean;
};

export const Cue = memo(function Cue({ index, cueId, languages, duration, isBeingPlayed }: CueProps) {
  const startId = useId();
  const endId = useId();
  const dispatch = useAppDispatch();
  const cue = useAppSelector((state) => selectCueById(state, cueId));
  const {
    playerControls: { playRegion },
  } = useContext(AudioContext);

  const handleChangeStart = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateCueStart({ id: cue.id, start: event.target.value }));
    },
    [dispatch, cue]
  );

  const handleChangeEnd = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateCueEnd({ id: cue.id, end: event.target.value }));
    },
    [dispatch, cue]
  );

  const handleChangeVoice = useCallback(
    (voiceId: string) => {
      dispatch(updateCueVoiceId({ id: cue.id, voiceId }));
    },
    [dispatch, cue]
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteCue(cue.id));
  }, [dispatch, cue]);

  const handleListen = useCallback(async () => {
    await playRegion?.(cue.id);
  }, [playRegion, cue]);

  if (!cue) return null;

  return (
    <div
      className={clsx("px-6 py-4 flex flex-col gap-3 group-even:bg-zinc-50 group-odd:bg-zinc-100 rounded-sm ", {
        "inset-ring-2 inset-ring-slate-500": isBeingPlayed,
      })}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Typography variant="h3">#{index}</Typography>
          <CueVoice value={cue.voiceId} onChangeVoice={handleChangeVoice} />
          <InputFieldInline>
            <Label>
              <LabelText htmlFor={startId}>From</LabelText>
            </Label>
            <Input
              id={startId}
              type="time"
              value={cue.start}
              size="sm"
              min={DEFAULT_TIME_INPUT_VALUE}
              max={duration ? formatDurationToISOTime(duration) : DEFAULT_TIME_INPUT_VALUE}
              step={TIME_INPUTS_STEP}
              className="min-w-36"
              onChange={handleChangeStart}
            />
          </InputFieldInline>
          <InputFieldInline>
            <Label>
              <LabelText htmlFor={endId}>To</LabelText>
            </Label>
            <Input
              id={endId}
              type="time"
              value={cue.end}
              size="sm"
              min={DEFAULT_TIME_INPUT_VALUE}
              max={duration ? formatDurationToISOTime(duration) : DEFAULT_TIME_INPUT_VALUE}
              step={TIME_INPUTS_STEP}
              className="min-w-36"
              onChange={handleChangeEnd}
            />
          </InputFieldInline>
        </div>
        <div className="actions flex flex-row items-center">
          <Button variant="inline" style="secondary" onClick={handleDelete} prefix={<Trash width={20} height={20} />}>
            Delete
          </Button>
          <Button
            variant="inline"
            style="primary"
            onClick={() => void handleListen()}
            prefix={<PlaySolid width={20} height={20} />}
          >
            Listen
          </Button>
        </div>
      </div>
      <div className="transcripts flex flex-col gap-3">
        {languages.map(({ id: languageId, name }) => {
          return <CueTranslation key={languageId} cueId={cueId} languageId={languageId} languageName={name} />;
        })}
      </div>
    </div>
  );
});
