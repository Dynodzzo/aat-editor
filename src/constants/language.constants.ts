import { Language } from "../model/transcription/language.model";

export const AVAILABLE_LANGUAGES_IDS = ["fr", "en", "it", "es", "de"] as const;

export const AVAILABLE_LANGUAGES: Omit<Language, "isActive">[] = [
  {
    id: "fr",
    name: "Français",
  },
  {
    id: "en",
    name: "English",
  },
  {
    id: "it",
    name: "Italiano",
  },
  {
    id: "es",
    name: "Español",
  },
  {
    id: "de",
    name: "Deutsch",
  },
];
