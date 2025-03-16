import { AVAILABLE_LANGUAGES_IDS } from "../../../../constants/language.constants";
import { LanguageId } from "../../../../model/transcription/language.model";
import { toggleLanguage } from "../../../../store/features/language.slice";
import { useAppDispatch } from "../../../../store/hooks";
import { Language } from "./Language";

export const LanguagesForm = () => {
  const dispatch = useAppDispatch();

  const handleChangeLanguages = (id: LanguageId) => {
    dispatch(toggleLanguage(id));
  };

  return (
    <div className="flex flex-col gap-4">
      {AVAILABLE_LANGUAGES_IDS.map((id) => (
        <Language key={id} languageId={id} onToggle={handleChangeLanguages} />
      ))}
    </div>
  );
};
