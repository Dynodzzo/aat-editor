import { NavArrowDown, Plus } from "iconoir-react";
import { Separator } from "radix-ui";
import { useContext } from "react";
import { AudioContext } from "../../../../context/audio.context";
import { Cue } from "../../../../model/transcription/cue.model";
import { Language } from "../../../../model/transcription/language.model";
import { addCue } from "../../../../store/features/cue.slice";
import { useAppDispatch } from "../../../../store/hooks";
import { formatDurationToISOTime } from "../../../../utils/time.utils";
import { Button } from "../../../ui/Button/Button";
import { Select, SelectItem } from "../../../ui/Select/Select";
import { TextTrigger } from "../../../ui/Select/TextTrigger";

type HeaderProps = {
  translationLanguage: string;
  languages: Language[];
  onLanguageChange: (languageId: string) => void;
};

export const Header = ({ translationLanguage, languages, onLanguageChange }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { currentTimeRef } = useContext(AudioContext);

  const handleAddCue = () => {
    const newCue: Cue = {
      id: crypto.randomUUID(),
      voiceId: "",
      start: formatDurationToISOTime(currentTimeRef.current),
      end: formatDurationToISOTime(currentTimeRef.current + 1),
    };

    dispatch(addCue(newCue));
  };

  return (
    <div className="flex flex-row items-center bg-white h-12  border-b border-neutral-200">
      <div className="px-4 flex-1 flex flex-row justify-between items-center">
        <h2 className="text-sm font-normal text-neutral-800">Transcription</h2>
        <Button onClick={handleAddCue} prefix={<Plus width={16} height={16} />}>
          Add cue
        </Button>
      </div>
      <Separator.Root orientation="vertical" className="w-px h-full bg-neutral-200" />
      <div className="px-4 flex-1">
        <Select
          trigger={<TextTrigger id="translation-language" icon={<NavArrowDown width={16} height={16} />} />}
          value={translationLanguage}
          disabled={!languages.length}
          onChange={onLanguageChange}
        >
          {languages.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
