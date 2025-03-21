import clsx from "clsx";
import { MoreVert, Page, PlaySolid } from "iconoir-react";
import { memo, useCallback, useContext } from "react";
import { AudioContext } from "../../../../context/audio.context";
import { CueTranslation, Cue as CueType } from "../../../../model/transcription/cue.model";
import { updateCueTranslation } from "../../../../store/features/cue-translation.slice";
import { deleteCue, updateCueEnd, updateCueStart, updateCueVoiceId } from "../../../../store/features/cue.slice";
import { useAppDispatch } from "../../../../store/hooks";
import { IconButton } from "../../../ui/Button/IconButton";
import { DropdownMenu, DropdownMenuItem } from "../../../ui/DropDownMenu/DropDownMenu";
import { AutoHeightTextarea } from "../../../ui/Input/AutoHeightTextarea";
import { CueVoice } from "./CueVoice";
import { Timecodes } from "./Timecodes";

type CueProps = {
  index?: number;
  cue: CueType;
  translation: CueTranslation;
  hasNote: boolean;
  isNoteVisible: boolean;
  duration: number;
  onToggleNote: () => void;
  onAddNote: () => void;
  onRemoveNote: () => void;
};

export const Cue = memo(function Cue({
  index,
  cue,
  translation,
  isNoteVisible,
  hasNote,
  onToggleNote,
  onAddNote,
  onRemoveNote,
}: CueProps) {
  const dispatch = useAppDispatch();
  const {
    playerControls: { playRegion },
  } = useContext(AudioContext);

  const showPrefix = index !== undefined;

  const handleChangeStart = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(updateCueStart({ id: cue.id, start: event.target.value }));
    },
    [dispatch, cue]
  );

  const handleChangeEnd = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!translation) return;
    dispatch(updateCueTranslation({ id: translation.id, text: event.target.value, note: translation.note }));
  };

  const handleChangeNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!translation) return;
    dispatch(updateCueTranslation({ id: translation.id, text: translation.text, note: event.target.value }));
  };

  const handleDelete = useCallback(() => {
    dispatch(deleteCue(cue.id));
  }, [dispatch, cue]);

  const handleListen = useCallback(() => {
    void playRegion?.(cue.id);
  }, [playRegion, cue]);

  if (!cue) return null;

  return (
    <div
      className={clsx("py-3 flex-1 grid grid-cols-[min-content_1fr] auto-rows-min gap-y-2 group-hover:bg-neutral-50")}
    >
      <div
        className={clsx("prefix text-neutral-800 flex flex-row items-center", {
          "pl-4.5": showPrefix,
        })}
      >
        {showPrefix && (
          <>
            <span className="size-6 leading-6 text-xs font-bold group-hover:hidden align-middle text-center">
              {index + 1}
            </span>

            <IconButton
              className="size-6 hidden group-hover:block"
              type="secondary"
              onClick={handleListen}
              icon={<PlaySolid width={16} height={16} />}
            />
          </>
        )}
      </div>

      <div className="content flex flex-col gap-3 w-full">
        <div className="cue-header px-4.5 flex flex-row items-center justify-between">
          <div className="left-group flex flex-row items-center">
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
                onClick={onToggleNote}
              />
            )}
          </div>
          <CueVoice value={cue.voiceId} onChangeVoice={handleChangeVoice} />
        </div>
        <div className="cue-transcript px-4.5">
          <div className="top-row flex flex-row items-center">
            <AutoHeightTextarea
              value={translation?.text}
              onChange={handleChangeText}
              className="grow font-normal text-sm text-neutral-500"
            />
            <DropdownMenu icon={<IconButton type="secondary" icon={<MoreVert width={12} height={12} />} />}>
              <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
              {!hasNote && <DropdownMenuItem onSelect={onAddNote}>Add note</DropdownMenuItem>}
              {hasNote && <DropdownMenuItem onSelect={onRemoveNote}>Remove note</DropdownMenuItem>}
            </DropdownMenu>
          </div>
        </div>
      </div>
      {hasNote && isNoteVisible && (
        <>
          <div></div>
          <div className="note px-4.5">
            <AutoHeightTextarea
              value={translation?.note}
              onChange={handleChangeNote}
              className="italic font-light text-xs text-neutral-500"
            />
          </div>
        </>
      )}
    </div>
  );
});
