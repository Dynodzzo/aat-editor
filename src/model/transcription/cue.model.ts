import { LanguageId } from "./language.model";

export type CueTranslation = {
  id: string;
  cueId: string;
  languageId: LanguageId;
  text: string;
  note: string;
};

export type Cue = {
  id: string;
  start: string;
  end: string;
  voiceId: string;
};
