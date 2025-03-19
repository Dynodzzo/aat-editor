import clsx from "clsx";
import { Separator } from "radix-ui";
import { useCallback, useState } from "react";
import { selectCueTranslationsByCueIdAndLanguageId } from "../../../../store/features/cue-translation.slice";
import { selectCueById } from "../../../../store/features/cue.slice";
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

export const CueContainer = ({ id, index, duration, isBeingPlayed, translationLanguage }: CueContainerProps) => {
  const contentLanguage = useAppSelector(selectContentLanguage);
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  const cue = useAppSelector((state) => selectCueById(state, id));
  const transcriptions = useAppSelector((state) =>
    selectCueTranslationsByCueIdAndLanguageId(state, id, contentLanguage)
  );
  const translations = useAppSelector((state) =>
    selectCueTranslationsByCueIdAndLanguageId(state, id, translationLanguage ?? "")
  );

  const hasNote = Boolean(translations?.note ?? transcriptions?.note);

  const handleToggleNote = useCallback(() => {
    setIsNoteVisible((previousIsNoteVisible) => !previousIsNoteVisible);
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
        cue={cue}
        index={index}
        duration={duration}
        translation={transcriptions!}
        hasNote={hasNote}
        isNoteVisible={isNoteVisible}
        toggleNote={handleToggleNote}
      />
      <Separator.Root orientation="vertical" className="w-px bg-neutral-200" />
      <Cue
        cue={cue}
        duration={duration}
        translation={translations!}
        hasNote={hasNote}
        isNoteVisible={isNoteVisible}
        toggleNote={handleToggleNote}
      />
    </div>
  );
};
