import clsx from "clsx";
import { MoreVert, Page, PlaySolid } from "iconoir-react";
import { memo, useCallback, useContext, useState } from "react";
import { AudioContext } from "../../../../context/audio.context";
import { selectCueTranslationsByCueIdAndLanguageId } from "../../../../store/features/cue-translation.slice";
import {
  deleteCue,
  selectCueById,
  updateCueEnd,
  updateCueStart,
  updateCueVoiceId,
} from "../../../../store/features/cue.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IconButton } from "../../../ui/Button/IconButton";
import { DropdownMenu, DropdownMenuItem } from "../../../ui/DropDownMenu/DropDownMenu";
import { TransformableInput } from "../../../ui/Input/TransformableInput";
import { CueVoice } from "./CueVoice";
import { Timecodes } from "./Timecodes";

type CueProps = {
  index: number;
  cueId: string;
  languageId: string;
  duration: number;
  isBeingPlayed?: boolean;
};

export const Cue = memo(function Cue({ index, cueId, languageId, isBeingPlayed }: CueProps) {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const dispatch = useAppDispatch();
  const cue = useAppSelector((state) => selectCueById(state, cueId));
  const {
    playerControls: { playRegion },
  } = useContext(AudioContext);

  const translations = useAppSelector((state) => selectCueTranslationsByCueIdAndLanguageId(state, cueId, languageId));

  let hasNote = false;
  let text = "";
  let note = "";

  if (translations) {
    hasNote = Boolean(translations.note);
    text = translations.text;
    note = translations.note;
  }

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

  const handleToggleNote = useCallback(() => {
    setIsNoteVisible((previousIsNoteVisible) => !previousIsNoteVisible);
  }, []);

  const handleMenuOptionSelected = useCallback(
    (value: string) => {
      switch (value) {
        case "delete":
          handleDelete();
          break;
        case "add_note":
          break;
        default:
          break;
      }
    },
    [handleDelete]
  );

  const handleListen = useCallback(() => {
    void playRegion?.(cue.id);
  }, [playRegion, cue]);

  const isEven = index % 2 === 0;

  if (!cue) return null;

  return (
    <div
      className={clsx("group py-3 grid grid-cols-[min-content_1fr] auto-rows-min gap-y-2", {
        "inset-ring-2 inset-ring-slate-500": isBeingPlayed,
        "bg-zinc-50": isEven,
        "bg-zinc-100": !isEven,
      })}
    >
      <div className="prefix pl-4.5 text-neutral-800 flex flex-row items-center">
        <span className="size-6 leading-6 text-xs font-bold group-hover:hidden align-middle text-center">
          {index + 1}
        </span>
        <IconButton
          className="size-6 hidden group-hover:block"
          type="secondary"
          onClick={handleListen}
          icon={<PlaySolid width={16} height={16} />}
        />
      </div>
      <div className="content flex flex-col gap-3 w-full">
        <div className="cue-header px-4.5 flex flex-row items-center justify-between">
          <div className="left-group flex flex-row items-center gap-2">
            <Timecodes
              startTime={cue.start}
              endTime={cue.end}
              onChangeStartTime={handleChangeStart}
              onChangeEndTime={handleChangeEnd}
            />
            {hasNote && (
              <IconButton
                type={isNoteVisible ? "primary" : "secondary"}
                icon={<Page width={12} height={12} />}
                onClick={handleToggleNote}
              />
            )}
          </div>
          <CueVoice value={cue.voiceId} onChangeVoice={handleChangeVoice} />
        </div>
        <div className="cue-transcript px-4.5">
          <div className="top-row flex flex-row items-center">
            <TransformableInput value={text} className="grow font-normal text-sm text-neutral-500" />
            <DropdownMenu icon={<IconButton type="secondary" icon={<MoreVert width={12} height={12} />} />}>
              <DropdownMenuItem onSelect={() => void handleMenuOptionSelected("delete")}>Delete</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => void handleMenuOptionSelected("add_note")}>Add note</DropdownMenuItem>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {hasNote && isNoteVisible && (
        <>
          <div></div>
          <div className="note px-4.5">
            <TransformableInput value={note} className="italic font-light text-xs text-neutral-500" />
          </div>
        </>
      )}
    </div>
  );
});
