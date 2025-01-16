import { LanguageKey } from "../../../../model/TranscriptionModel";
import { useAppContext } from "../../../Context/useContext";
import { AVAILABLE_LANGUAGES } from "../FormConstants";

const UNWANTED_KEYS = ["key"];

export const ExportActions = () => {
  const state = useAppContext();

  /**
   * Removes unwanted keys from the JSON object
   * @param key
   * @param value
   * @returns
   */
  const JSONReplacer = (key: string, value: unknown) => {
    if (UNWANTED_KEYS.includes(key)) {
      return undefined;
    }

    if (AVAILABLE_LANGUAGES.map((language) => language.key).includes(key as LanguageKey)) {
      if (!state.transcriptionForm.languages.includes(key as LanguageKey)) return undefined;
    }

    return value;
  };

  const getDownloadLink = () => {
    const data = JSON.stringify(state.transcriptionForm, JSONReplacer, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <>
      <a href={getDownloadLink()} target="_blank" rel="noreferrer noopener" download>
        Export
      </a>
    </>
  );
};
