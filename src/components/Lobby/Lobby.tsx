import { TranscriptionImporter } from "../TranscriptionImporter/TranscriptionImporter";
import { Button } from "../ui/Button/Button";

type LobbyProps = {
  onStartEditing: () => void;
};

export const Lobby = ({ onStartEditing }: LobbyProps) => {
  const handleCreateClick = () => {
    onStartEditing();
  };

  return (
    <div>
      <h1>Lobby</h1>
      <div className="flex flex-row gap-2">
        <TranscriptionImporter onFileImported={onStartEditing} />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
    </div>
  );
};
