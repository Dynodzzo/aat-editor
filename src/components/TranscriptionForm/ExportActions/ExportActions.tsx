import { useTranscriptionForm } from "../TranscriptionFormContext/TranscriptionFormContext";

const UNWANTED_KEYS = ["key", "duration"];

export const ExportActions = () => {
  const state = useTranscriptionForm();

  // const formatVoices = () => {
  //   return voices.map(({ id, color, name }) => {
  //     return {
  //       id,
  //       color,
  //       name: Object.entries(name).reduce((acc, [key, value]) => {
  //         if (languages.includes(key as LanguageKey)) {
  //           return { ...acc, [key]: value };
  //         }

  //         return acc;
  //       }, {}),
  //     };
  //   });
  // };

  // const formatCues = () => {
  //   return Object.entries(cues).reduce((acc, [key, value]) => {
  //     if (languages.includes(key as LanguageKey)) {
  //       return {
  //         ...acc,
  //         [key]: value.map(({ start, end, voice, text, note }) => ({
  //           start,
  //           end,
  //           voice,
  //           text,
  //           note,
  //         })),
  //       };
  //     }

  //     return acc;
  //   }, {});
  // };

  // const formatDataForExport = () => {
  //   return {
  //     title,
  //     author,
  //     languages,
  //     voices: formatVoices(),
  //     cues: formatCues(),
  //   };
  // };

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
      <a href={getDownloadLink()} target="_blank" rel="noreferrer noopener">
        Export
      </a>
    </>
  );
};
