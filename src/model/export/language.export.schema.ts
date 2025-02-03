import { z } from "zod";
import { AVAILABLE_LANGUAGES_IDS } from "../../constants/language.constants";

export const LanguageIdSchema = z.enum(AVAILABLE_LANGUAGES_IDS);
export const TranslationExportSchema = z.record(LanguageIdSchema, z.string());

export type LanguageId = z.infer<typeof LanguageIdSchema>;
export type TranslationExport = z.infer<typeof TranslationExportSchema>;
