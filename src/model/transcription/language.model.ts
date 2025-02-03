import { AVAILABLE_LANGUAGES_IDS } from "../../constants/language.constants";

export type LanguageId = (typeof AVAILABLE_LANGUAGES_IDS)[number];
export type Language = {
  id: LanguageId;
  name: string;
  isActive: boolean;
};
