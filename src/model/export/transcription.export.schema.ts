import { z } from "zod";
import { CueExportSchema } from "./cue.export.schema";
import { LanguageIdSchema } from "./language.export.schema";
import { metadataExportSchema } from "./metadata.export.schema";
import { VoiceExportSchema } from "./voice.export.schema";

export const transcriptionSchema = z.object({
  ...metadataExportSchema.shape,
  languages: z.array(LanguageIdSchema),
  voices: z.array(VoiceExportSchema),
  cues: z.array(CueExportSchema),
});
export type TranscriptionExport = z.infer<typeof transcriptionSchema>;
