import { useEffect } from "react";
import { TranscriptionFormState } from "../TranscriptionForm/TranscriptionFormContext/TranscriptionFormContext";
import { useTextFileSelector } from "../../hooks/useTextFileSelector";
import { transcriptionFileSchema } from "../../model/TranscriptionSchema";

type LobbyProps = {
  onStartEditing: (state?: TranscriptionFormState) => void;
};

export const Lobby = ({ onStartEditing }: LobbyProps) => {
  const { fileData, error, isLoading, selectFile } = useTextFileSelector<TranscriptionFormState>();

  const handleImportClick = () => {
    selectFile();
  };

  const handleCreateClick = () => {
    onStartEditing();
  };

  useEffect(() => {
    if (error) {
      // TODO manage file errors
      console.table({ error });
    }

    if (fileData) {
      const { success, error } = transcriptionFileSchema.safeParse(fileData);
      if (success) {
        onStartEditing(fileData);
      } else {
        // TODO manage schema errors
        console.table({ error });
      }
    }
  }, [fileData, error]);

  return (
    <div>
      <h1>Lobby</h1>
      <button onClick={handleImportClick} disabled={isLoading}>
        Import
      </button>
      <button onClick={handleCreateClick} disabled={isLoading}>
        Create
      </button>
    </div>
  );
};
