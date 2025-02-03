import { Language } from "../model/transcription/language.model";

export const AVAILABLE_LANGUAGES_IDS = ["fr", "en"] as const;

export const AVAILABLE_LANGUAGES: Omit<Language, "isActive">[] = [
  {
    id: "fr",
    name: "Français",
  },
  {
    id: "en",
    name: "English",
  },
];
