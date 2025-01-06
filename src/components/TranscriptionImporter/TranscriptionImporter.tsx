import { useEffect } from "react";
import { useTextFileSelector } from "../../hooks/useTextFileSelector";
import { checkFileFormat, hydrateData } from "./Utils";
import { TranscriptionFileSchema } from "../../model/TranscriptionSchema";
import { TranscriptionState } from "../../model/TranscriptionModel";

type TranscriptionImporterProps = {
  onFileImported: (state?: TranscriptionState) => void;
};

export const TranscriptionImporter = ({ onFileImported }: TranscriptionImporterProps) => {
  const { fileData, error, isLoading, selectFile } = useTextFileSelector<TranscriptionFileSchema>();

  const handleImportClick = () => {
    selectFile();
  };

  useEffect(() => {
    if (error) {
      // TODO manage file errors
      console.table({ error });
    }

    if (fileData) {
      const { success, error } = checkFileFormat(fileData);

      if (success) {
        onFileImported(hydrateData(fileData));
      } else {
        // TODO show error message
        console.table(error);
      }
    }
  }, [fileData, error]);

  return (
    <button onClick={handleImportClick} disabled={isLoading}>
      Import
    </button>
  );
};
