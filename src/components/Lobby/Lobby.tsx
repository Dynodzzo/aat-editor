import { TranscriptionState } from "../../model/TranscriptionModel";
import { TranscriptionImporter } from "../TranscriptionImporter/TranscriptionImporter";

type LobbyProps = {
  onStartEditing: (state?: TranscriptionState) => void;
};

export const Lobby = ({ onStartEditing }: LobbyProps) => {
  const handleCreateClick = () => {
    onStartEditing();
  };

  return (
    <div>
      <h1>Lobby</h1>
      <TranscriptionImporter onFileImported={onStartEditing} />
      <button onClick={handleCreateClick}>Create</button>
    </div>
  );
};
