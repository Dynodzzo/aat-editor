import { z } from "zod";
import { CueSchema, LanguageKeySchema, VoiceNameByLanguageSchema, VoiceSchema } from "./TranscriptionSchema";

export type LanguageKey = z.infer<typeof LanguageKeySchema>;
export type Voice = z.infer<typeof VoiceSchema> & { key: string };
export type VoiceNameByLanguage = z.infer<typeof VoiceNameByLanguageSchema>;
export type Cue = z.infer<typeof CueSchema> & { key: string };
export type CuesByLanguage = { [key in LanguageKey]?: Cue[] };
export type Language = {
  key: LanguageKey;
  name: string;
};

export type TranscriptionState = {
  duration: number;
  title: string;
  author: string;
  // fileAuthor: string;
  languages: LanguageKey[];
  voices: Voice[];
  cues: CuesByLanguage;
};
