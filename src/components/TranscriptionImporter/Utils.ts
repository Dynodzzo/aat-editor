import { TranscriptionExport, transcriptionSchema } from "../../model/export/transcription.export.schema";

export function checkFileFormat(fileData: TranscriptionExport): { success: boolean; error?: string } {
  const { success, error } = transcriptionSchema.safeParse(fileData);

  if (success) {
    return { success };
  } else {
    // TODO parse error and return a user-friendly message
    return { success: false, error: JSON.stringify(error, null, 2) };
  }
}
