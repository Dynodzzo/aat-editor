import { AVAILABLE_LANGUAGES } from "../TranscriptionFormConstants";
import {
  useTranscriptionForm,
  useTranscriptionFormDispatch,
} from "../TranscriptionFormContext/TranscriptionFormContext";
import { LanguageKey } from "../TranscriptionFormModel";

export const LanguagesForm = () => {
  const { languages } = useTranscriptionForm();
  const dispatch = useTranscriptionFormDispatch();

  const handleChangeLanguages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.id as LanguageKey;

    if (languages.includes(language)) {
      dispatch({ type: "UPDATE_LANGUAGES", payload: languages.filter((lang) => lang !== language) });
    } else {
      dispatch({ type: "UPDATE_LANGUAGES", payload: [...languages, language] });
    }
  };

  return (
    <fieldset>
      <legend>Languages</legend>
      <div className="inputWrapper">
        {AVAILABLE_LANGUAGES.map(({ key, name }) => (
          <label key={key} htmlFor={key}>
            {name}
            <input id={key} type="checkbox" checked={languages.includes(key)} onChange={handleChangeLanguages} />
          </label>
        ))}
      </div>
    </fieldset>
  );
};
