import { LanguageKey } from "../../../model/TranscriptionModel";
import { AVAILABLE_LANGUAGES } from "../TranscriptionFormConstants";
import { useTranscriptionForm } from "../TranscriptionFormContext/TranscriptionFormContext";

const UNWANTED_KEYS = ["key"];

export const ExportActions = () => {
  const state = useTranscriptionForm();

  /**
   * Removes unwanted keys from the JSON object
   * @param key
   * @param value
   * @returns
   */
  const JSONReplacer = (key: string, value: any) => {
    if (UNWANTED_KEYS.includes(key)) {
      return undefined;
    }

    if (AVAILABLE_LANGUAGES.map((language) => language.key).includes(key as LanguageKey)) {
      if (!state.languages.includes(key as LanguageKey)) return undefined;
    }

    return value;
  };

  const getDownloadLink = () => {
    const data = JSON.stringify(state, JSONReplacer, 2);
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
