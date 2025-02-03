import { AVAILABLE_LANGUAGES_IDS } from "../../../../constants/language.constants";
import { LanguageId } from "../../../../model/transcription/language.model";
import { toggleLanguage } from "../../../../store/features/language.slice";
import { useAppDispatch } from "../../../../store/hooks";
import { Typography } from "../../../ui/Typography/Typography";
import { Language } from "./Language";

export const LanguagesForm = () => {
  const dispatch = useAppDispatch();

  const handleChangeLanguages = (id: LanguageId) => {
    dispatch(toggleLanguage(id));
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Languages</Typography>
      <div className="flex flex-row gap-2">
        {AVAILABLE_LANGUAGES_IDS.map((id) => (
          <Language key={id} id={id} onToggle={handleChangeLanguages} />
        ))}
      </div>
    </div>
  );
};
