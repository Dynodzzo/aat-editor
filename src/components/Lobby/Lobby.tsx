import { useEffect } from "react";
import { TranscriptionFormState } from "../TranscriptionForm/TranscriptionFormContext/TranscriptionFormContext";
import { useTextFileSelector } from "../../hooks/useTextFileSelector";

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
      console.table({ error });
    }

    if (fileData) {
      onStartEditing(fileData);
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
