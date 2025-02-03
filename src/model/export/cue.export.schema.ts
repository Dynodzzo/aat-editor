import { z } from "zod";
import { TranslationExportSchema } from "./language.export.schema";

export const CueExportSchema = z.object({
  start: z.string(),
  end: z.string(),
  voice: z.string(),
  text: TranslationExportSchema,
  note: TranslationExportSchema.optional(),
});

export type CueExport = z.infer<typeof CueExportSchema>;
