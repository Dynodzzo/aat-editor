import clsx from "clsx";
import { MoreVert, Page, PlaySolid } from "iconoir-react";
import { memo, useCallback, useContext, useMemo } from "react";
import { AudioContext } from "../../../../context/audio.context";
import {
  selectCueNoteTranslationByCueIdAndLanguageId,
  selectCueTextTranslationByCueIdAndLanguageId,
  selectCueTranslationIdByCueIdAndLanguageId,
  updateCueTranslation,
} from "../../../../store/features/cue-translation.slice";
import { deleteCue, selectCueVoiceIdById, updateCueVoiceId } from "../../../../store/features/cue.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IconButton } from "../../../ui/Button/IconButton";
import { DropdownMenu, DropdownMenuItem } from "../../../ui/DropDownMenu/DropDownMenu";
import { AutoHeightTextarea } from "../../../ui/Input/AutoHeightTextarea";
import { CueVoice } from "./CueVoice";
import { Timecodes } from "./Timecodes";

type CueProps = {
  index?: number;
  cueId: string;
  languageId: string;
  hasNote: boolean;
  isNoteVisible: boolean;
  duration: number;
  onToggleNote: () => void;
  onAddNote: () => void;
  onRemoveNote: () => void;
};

export const Cue = memo(function Cue({
  index,
  cueId,
  languageId,
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

  const idSelectorKeys = useMemo(() => ({ cueId, languageId }), [cueId, languageId]);
  const translationId = useAppSelector((state) => selectCueTranslationIdByCueIdAndLanguageId(state, idSelectorKeys));
  const text = useAppSelector((state) => selectCueTextTranslationByCueIdAndLanguageId(state, idSelectorKeys));
  const note = useAppSelector((state) => selectCueNoteTranslationByCueIdAndLanguageId(state, idSelectorKeys));
  const voiceId = useAppSelector((state) => selectCueVoiceIdById(state, cueId));

  const showPrefix = index !== undefined;

  const handleChangeVoice = useCallback(
    (voiceId: string) => {
      dispatch(updateCueVoiceId({ id: cueId, voiceId }));
    },
    [dispatch, cueId]
  );

  const handleChangeText = useCallback(
    (value: string) => {
      if (!translationId) return;
      dispatch(updateCueTranslation({ id: translationId, text: value, note: note ?? "" }));
    },
    [dispatch, translationId, note]
  );

  const handleChangeNote = useCallback(
    (value: string) => {
      if (!translationId) return;
      dispatch(updateCueTranslation({ id: translationId, text: text ?? "", note: value }));
    },
    [dispatch, translationId, text]
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteCue(cueId));
  }, [dispatch, cueId]);

  const handleListen = useCallback(() => {
    void playRegion?.(cueId);
  }, [playRegion, cueId]);

  if (!cueId) return null;

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
          <div className="left-group flex flex-row items-center gap-2">
            <Timecodes cueId={cueId} />
            {hasNote && (
              <IconButton
                type={isNoteVisible ? "primary" : "secondary"}
                icon={<Page width={12} height={12} />}
                onClick={onToggleNote}
              />
            )}
          </div>
          <CueVoice value={voiceId} onChangeVoice={handleChangeVoice} />
        </div>
        <div className="cue-transcript px-4.5">
          <div className="top-row flex flex-row items-center">
            <AutoHeightTextarea
              value={text!}
              onChange={handleChangeText}
              placeholder="Enter text"
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
          <div className="note flex px-4.5">
            <AutoHeightTextarea
              value={note!}
              onChange={handleChangeNote}
              placeholder="Enter note"
              className="grow italic font-light text-xs text-neutral-500"
            />
          </div>
        </>
      )}
    </div>
  );
});
