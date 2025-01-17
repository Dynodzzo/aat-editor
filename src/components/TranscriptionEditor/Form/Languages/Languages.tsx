import { LanguageKey } from "../../../../model/TranscriptionModel";
import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../../Context/useContext";
import { AVAILABLE_LANGUAGES } from "../FormConstants";

export const LanguagesForm = () => {
  const {
    transcriptionForm: { languages },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();

  const handleChangeLanguages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.id as LanguageKey;

    if (languages.includes(language)) {
      dispatch({ type: "UPDATE_TRANSCRIPTION_LANGUAGES", payload: languages.filter((lang) => lang !== language) });
    } else {
      dispatch({ type: "UPDATE_TRANSCRIPTION_LANGUAGES", payload: [...languages, language] });
    }
  };

  return (
    <fieldset>
      <legend>Languages</legend>
      {AVAILABLE_LANGUAGES.map(({ key, name }) => (
        <div key={key} className="inputWrapper">
          <label htmlFor={key}>
            <input id={key} type="checkbox" checked={languages.includes(key)} onChange={handleChangeLanguages} />
            {name}
          </label>
        </div>
      ))}
    </fieldset>
  );
};
