import { useRef } from "react";
import { TranscriptionFormState } from "../TranscriptionForm/TranscriptionFormContext/TranscriptionFormContext";

type LobbyProps = {
  onStartEditing: (state?: TranscriptionFormState) => void;
};

export const Lobby = ({ onStartEditing }: LobbyProps) => {
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = JSON.parse(event.target?.result?.toString() || "{}");
      onStartEditing(result);
    };

    reader.onerror = (event) => {
      console.log(event);
    };

    reader.readAsText(event.target.files?.[0] as Blob);
  };

  const handleImportClick = () => {
    if (importInputRef.current) {
      importInputRef.current.click();
    }
  };

  const handleCreateClick = () => {
    onStartEditing();
  };

  return (
    <div>
      <h1>Lobby</h1>
      <input type="file" accept=".json" hidden ref={importInputRef} onChange={handleFileChange} />
      <button onClick={handleImportClick}>Import</button>
      <button onClick={handleCreateClick}>Create</button>
    </div>
  );
};
