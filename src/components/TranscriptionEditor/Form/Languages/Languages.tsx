import { LanguageKey } from "../../../../model/TranscriptionModel";
import { Chip } from "../../../ui/Chip/Chip";
import { Typography } from "../../../ui/Typography/Typography";
import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../../Context/useContext";
import { AVAILABLE_LANGUAGES } from "../FormConstants";

export const LanguagesForm = () => {
  const {
    transcriptionForm: { languages },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();

  const handleChangeLanguages = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const language = event.currentTarget.id as LanguageKey;

    if (languages.includes(language)) {
      dispatch({ type: "UPDATE_TRANSCRIPTION_LANGUAGES", payload: languages.filter((lang) => lang !== language) });
    } else {
      dispatch({ type: "UPDATE_TRANSCRIPTION_LANGUAGES", payload: [...languages, language] });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Languages</Typography>
      <div className="flex flex-row gap-2">
        {AVAILABLE_LANGUAGES.map(({ key, name }) => (
          <Chip key={key} id={key} value={name} highlighted={languages.includes(key)} onClick={handleChangeLanguages} />
        ))}
      </div>
    </div>
  );
};
