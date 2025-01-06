import { z } from "zod";

const SUPPORTED_LANGUAGES = ["fr", "en"] as const;

export const LanguageKeySchema = z.enum(SUPPORTED_LANGUAGES);
export const StringByLanguageSchema = z.record(LanguageKeySchema, z.string());
export const VoiceSchema = z.object({
  id: z.string(),
  color: z.string(),
  name: StringByLanguageSchema,
});
export const CueSchema = z.object({
  start: z.string(),
  end: z.string(),
  voice: z.string(),
  text: StringByLanguageSchema,
  note: StringByLanguageSchema.optional(),
});

const LanguagesSchema = z.array(LanguageKeySchema);
const VoicesSchema = z.array(VoiceSchema);
const CuesSchema = z.array(CueSchema);

export const transcriptionFileSchema = z.object({
  title: z.string(),
  author: z.string(),
  // fileAuthor: z.string(),
  languages: LanguagesSchema,
  voices: VoicesSchema,
  cues: CuesSchema,
});

export type TranscriptionFileSchema = z.infer<typeof transcriptionFileSchema>;
