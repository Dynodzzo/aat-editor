import { useCallback, useRef } from "react";
import { CueExport } from "../../../../model/export/cue.export.schema";
import { TranslationExport } from "../../../../model/export/language.export.schema";
import { MetadataExport } from "../../../../model/export/metadata.export.schema";
import { TranscriptionExport } from "../../../../model/export/transcription.export.schema";
import { VoiceExport } from "../../../../model/export/voice.export.schema";
import { LanguageId } from "../../../../model/transcription/language.model";
import { RootState, store } from "../../../../store/store";
import { Button } from "../../../ui/Button/Button";

export const ExportButton = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const getMetadataToExport = useCallback((state: RootState): MetadataExport => {
    return state.metadata;
  }, []);

  const getLanguagesToExport = useCallback((state: RootState): LanguageId[] => {
    return Object.values(state.languages.entities)
      .filter((language) => language.isActive)
      .map((language) => language.id);
  }, []);

  const getVoicesToExport = useCallback((state: RootState, activeLanguages: LanguageId[]): VoiceExport[] => {
    return Object.values(state.voices.entities).map((voice) => {
      const voiceTranslations = Object.values(state.voiceTranslations.entities).filter(
        (translation) => translation.voiceId === voice.id
      );

      const voiceTranslationByLanguage = Object.groupBy(voiceTranslations, (translation) => translation.languageId);

      const translation = activeLanguages.reduce((acc, language: LanguageId) => {
        if (!voiceTranslationByLanguage[language]) return acc;

        return {
          ...acc,
          [language]: voiceTranslationByLanguage[language][0].value,
        };
      }, {} as TranslationExport);

      return {
        name: voice.name,
        color: voice.color,
        translation,
      };
    });
  }, []);

  const getCuesToExport = useCallback((state: RootState, activeLanguages: LanguageId[]): CueExport[] => {
    return Object.values(state.cues.entities).map((cue) => {
      const cueTranslations = Object.values(state.cueTranslations.entities).filter(
        (translation) => translation.cueId === cue.id
      );

      const cueTranslationByLanguage = Object.groupBy(cueTranslations, (translation) => translation.languageId);

      const textTranslation = activeLanguages.reduce((acc, language: LanguageId) => {
        if (!cueTranslationByLanguage[language]) return acc;

        return {
          ...acc,
          [language]: cueTranslationByLanguage[language][0].text,
        };
      }, {} as TranslationExport);

      const noteTranslation = activeLanguages.reduce((acc, language: LanguageId) => {
        if (!cueTranslationByLanguage[language]) return acc;

        return {
          ...acc,
          [language]: cueTranslationByLanguage[language][0].note,
        };
      }, {} as TranslationExport);

      const voiceName = state.voices.entities[cue.voiceId]?.name;

      return {
        start: cue.start,
        end: cue.end,
        voice: voiceName,
        text: textTranslation,
        note: noteTranslation,
      };
    });
  }, []);

  const getTranscriptionToExport = useCallback(
    (state: RootState): TranscriptionExport => {
      const metadata = getMetadataToExport(state);
      const activeLanguages = getLanguagesToExport(state);
      const voices = getVoicesToExport(state, activeLanguages);
      const cues = getCuesToExport(state, activeLanguages);

      return {
        ...metadata,
        languages: activeLanguages,
        voices,
        cues,
      };
    },
    [getMetadataToExport, getLanguagesToExport, getVoicesToExport, getCuesToExport]
  );

  const getDownloadLink = () => {
    const state = store.getState();
    const stateStr = getTranscriptionToExport(state);
    const data = JSON.stringify(stateStr, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const handleLinkClick = () => {
    if (linkRef.current) {
      linkRef.current.href = getDownloadLink();
      linkRef.current.click();
    }
  };

  return (
    <>
      <Button onClick={handleLinkClick}>Export</Button>
      <a ref={linkRef} target="_blank" rel="noreferrer noopener" download hidden></a>
    </>
  );
};
