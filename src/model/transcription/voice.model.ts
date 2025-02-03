import { LanguageId } from "./language.model";

export type VoiceTranslation = {
  id: string;
  voiceId: string;
  languageId: LanguageId;
  value: string;
};

export type Voice = {
  id: string;
  name: string;
  color: string;
};
