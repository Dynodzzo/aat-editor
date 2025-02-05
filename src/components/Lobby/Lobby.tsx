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
      <div className="flex flex-row gap-2 p-6">
        <TranscriptionImporter onFileImported={onStartEditing} />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
    </div>
  );
};
