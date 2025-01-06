import { TranscriptionState } from "../../model/TranscriptionModel";
import { TranscriptionFileSchema, transcriptionFileSchema } from "../../model/TranscriptionSchema";

export function checkFileFormat(fileData: TranscriptionFileSchema): { success: boolean; error?: string } {
  const { success, error } = transcriptionFileSchema.safeParse(fileData);

  if (success) {
    return { success };
  } else {
    // TODO parse error and return a user-friendly message
    return { success: false, error: JSON.stringify(error, null, 2) };
  }
}

export function hydrateData(fileData: TranscriptionFileSchema): TranscriptionState {
  return {
    duration: 0,
    ...fileData,
    voices: fileData.voices.map((voice) => ({ ...voice, key: crypto.randomUUID() })),
    cues: fileData.cues.map((cue) => ({ ...cue, key: crypto.randomUUID() })),
  };
}
