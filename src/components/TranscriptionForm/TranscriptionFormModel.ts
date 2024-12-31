export type LanguageKey = "fr" | "en";

export type Language = {
  key: LanguageKey;
  name: string;
};

export type VoiceNameByLanguage = {
  [key in LanguageKey]?: string;
};

export type Voice = {
  key: string;
  id: string;
  color: string;
  name: VoiceNameByLanguage;
};

export type Cue = {
  key: string;
  start: string;
  end: string;
  voice: string;
  text: string;
  note?: string;
};

export type CuesByLanguage = {
  [key in LanguageKey]: Cue[];
};
