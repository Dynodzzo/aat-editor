import { useEffect } from "react";
import { AVAILABLE_LANGUAGES_IDS } from "../../constants/language.constants";
import { useTextFileSelector } from "../../hooks/useTextFileSelector";
import { TranscriptionExport } from "../../model/export/transcription.export.schema";
import { CueTranslation } from "../../model/transcription/cue.model";
import { Voice, VoiceTranslation } from "../../model/transcription/voice.model";
import { initializeCuesTranslations } from "../../store/features/cue-translation.slice";
import { initializeCues } from "../../store/features/cue.slice";
import { toggleLanguage } from "../../store/features/language.slice";
import { initializeMetadata } from "../../store/features/metadata.slice";
import { initializeVoicesTranslations } from "../../store/features/voice-translation.slice";
import { initializeVoices } from "../../store/features/voice.slice";
import { useAppDispatch } from "../../store/hooks";
import { Button } from "../ui/Button/Button";
import { checkFileFormat } from "./Utils";

type TranscriptionImporterProps = {
  onFileImported: () => void;
};

export const TranscriptionImporter = ({ onFileImported }: TranscriptionImporterProps) => {
  const dispatch = useAppDispatch();
  const { fileData, error, isLoading, selectFile } = useTextFileSelector<TranscriptionExport>();

  const handleImportClick = () => {
    selectFile();
  };

  useEffect(() => {
    if (error) {
      // TODO manage file errors
      console.table({ error });
    }

    if (fileData) {
      const { success, error } = checkFileFormat(fileData);
      const voicesIds: string[] = [];
      const cuesIds: string[] = [];

      if (success) {
        dispatch(
          initializeMetadata({
            title: fileData.title,
            author: fileData.author,
            fileAuthor: fileData.fileAuthor,
          })
        );

        fileData.languages.forEach((language) => {
          dispatch(toggleLanguage(language));
        });

        dispatch(
          initializeVoices(
            fileData.voices.map((voice) => {
              const id = crypto.randomUUID();
              voicesIds.push(id);
              return {
                id,
                name: voice.name,
                color: voice.color,
              } as Voice;
            })
          )
        );

        dispatch(
          initializeVoicesTranslations(
            fileData.voices.reduce((acc, voice, index) => {
              return [
                ...acc,
                ...AVAILABLE_LANGUAGES_IDS.map((language) => {
                  return {
                    id: crypto.randomUUID(),
                    voiceId: voicesIds[index],
                    languageId: language,
                    value: voice.translation[language] ?? "",
                  };
                }),
              ];
            }, [] as VoiceTranslation[])
          )
        );

        dispatch(
          initializeCues(
            fileData.cues.map((cue) => {
              const id = crypto.randomUUID();
              cuesIds.push(id);
              const voiceId = fileData.voices.findIndex((voice) => voice.name === cue.voice);

              return {
                id,
                start: cue.start,
                end: cue.end,
                voiceId: voicesIds[voiceId],
              };
            })
          )
        );

        dispatch(
          initializeCuesTranslations(
            fileData.cues.reduce((acc, cue, index) => {
              return [
                ...acc,
                ...AVAILABLE_LANGUAGES_IDS.map((language) => {
                  return {
                    id: crypto.randomUUID(),
                    cueId: cuesIds[index],
                    languageId: language,
                    text: cue.text[language] ?? "",
                    note: cue.note![language] ?? "",
                  };
                }),
              ];
            }, [] as CueTranslation[])
          )
        );

        onFileImported();
      } else {
        // TODO show error message
        console.table(error);
      }
    }
  }, [fileData, error, dispatch, onFileImported]);

  return (
    <Button onClick={handleImportClick} disabled={isLoading}>
      Import
    </Button>
  );
};
