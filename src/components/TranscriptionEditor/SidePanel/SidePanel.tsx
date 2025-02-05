import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { ConfigPanel } from "../ConfigPanel/ConfigPanel";

type SidePanelProps = {
  play?: () => void;
  pause?: () => void;
  isPlaying?: boolean;
};

export const SidePanel = ({ play, pause, isPlaying }: SidePanelProps) => {
  return (
    <div className="flex flex-col">
      <ConfigPanel />
      <AudioPlayer play={play} pause={pause} isPlaying={isPlaying} />
    </div>
  );
};
