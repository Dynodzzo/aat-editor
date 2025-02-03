import { z } from "zod";

export const metadataExportSchema = z.object({
  title: z.string(),
  author: z.string(),
  fileAuthor: z.string(),
});

export type MetadataExport = z.infer<typeof metadataExportSchema>;
