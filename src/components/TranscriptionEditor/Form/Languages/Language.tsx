import { LanguageId } from "../../../../model/transcription/language.model";
import { selectLanguageById } from "../../../../store/features/language.slice";
import { useAppSelector } from "../../../../store/hooks";
import { Chip } from "../../../ui/Chip/Chip";

type LanguageProps = {
  id: LanguageId;
  onToggle: (id: LanguageId) => void;
};

export const Language = ({ id, onToggle }: LanguageProps) => {
  const { name, isActive } = useAppSelector((state) => selectLanguageById(state, id));
  return <Chip id={id} value={name} highlighted={isActive} onClick={() => onToggle(id)} />;
};
