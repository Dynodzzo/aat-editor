import clsx from "clsx";
import { Separator } from "radix-ui";
import { memo, useCallback, useState } from "react";
import { selectCueNoteTranslationByCueIdAndLanguageId } from "../../../../store/features/cue-translation.slice";
import { selectContentLanguage } from "../../../../store/features/metadata.slice";
import { useAppSelector } from "../../../../store/hooks";
import { Cue } from "./Cue";

type CueContainerProps = {
  id: string;
  index: number;
  duration: number;
  isBeingPlayed?: boolean;
  translationLanguage?: string;
};

export const CueContainer = memo(function CueContainer({
  id,
  index,
  duration,
  isBeingPlayed,
  translationLanguage,
}: CueContainerProps) {
  const contentLanguage = useAppSelector(selectContentLanguage);

  const cueTranscriptionNote = useAppSelector((state) =>
    selectCueNoteTranslationByCueIdAndLanguageId(state, {
      cueId: id,
      languageId: contentLanguage,
    })
  );
  const cueTranslationNote = useAppSelector((state) =>
    selectCueNoteTranslationByCueIdAndLanguageId(state, {
      cueId: id,
      languageId: translationLanguage ?? "",
    })
  );

  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [hasNote, setHasNote] = useState(Boolean(!!cueTranscriptionNote || !!cueTranslationNote));

  const handleToggleNote = useCallback(() => {
    setIsNoteVisible((previousIsNoteVisible) => !previousIsNoteVisible);
  }, []);

  const handleAddNote = useCallback(() => {
    setHasNote(true);
    setIsNoteVisible(true);
  }, []);

  const handleRemoveNote = useCallback(() => {
    setHasNote(false);
  }, []);

  if (!id) return null;

  return (
    <div
      className={clsx("group flex flex-row bg-white", {
        "[background-size:10px_10px]  [background-image:repeating-linear-gradient(45deg,#f8f8f8_0,#f8f8f8_1px,#ffffff_0,#ffffff_50%)]":
          isBeingPlayed,
      })}
    >
      <Cue
        cueId={id}
        index={index}
        duration={duration}
        languageId={contentLanguage}
        hasNote={hasNote}
        isNoteVisible={isNoteVisible}
        onToggleNote={handleToggleNote}
        onAddNote={handleAddNote}
        onRemoveNote={handleRemoveNote}
      />
      <Separator.Root orientation="vertical" className="w-px bg-neutral-200" />
      <Cue
        cueId={id}
        duration={duration}
        languageId={translationLanguage ?? ""}
        hasNote={hasNote}
        isNoteVisible={isNoteVisible}
        onToggleNote={handleToggleNote}
        onAddNote={handleAddNote}
        onRemoveNote={handleRemoveNote}
      />
    </div>
  );
});
