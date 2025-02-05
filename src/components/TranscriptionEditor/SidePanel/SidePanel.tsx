import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { ConfigPanel } from "../ConfigPanel/ConfigPanel";

type SidePanelProps = {
  play?: () => void;
  pause?: () => void;
  playNextRegion?: () => void;
  playPreviousRegion?: () => void;
  isPlaying?: boolean;
};

export const SidePanel = ({ play, pause, playNextRegion, playPreviousRegion, isPlaying }: SidePanelProps) => {
  return (
    <div className="flex flex-col">
      <ConfigPanel />
      <AudioPlayer
        play={play}
        pause={pause}
        playNextRegion={playNextRegion}
        playPreviousRegion={playPreviousRegion}
        isPlaying={isPlaying}
      />
    </div>
  );
};
