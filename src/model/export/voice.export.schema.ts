import { z } from "zod";
import { TranslationExportSchema } from "./language.export.schema";

export const VoiceExportSchema = z.object({
  name: z.string(),
  color: z.string(),
  translation: TranslationExportSchema,
});

export type VoiceExport = z.infer<typeof VoiceExportSchema>;
