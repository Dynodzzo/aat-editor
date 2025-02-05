import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { ConfigPanel } from "../ConfigPanel/ConfigPanel";

export const SidePanel = () => {
  return (
    <div className="flex flex-col">
      <ConfigPanel />
      <AudioPlayer />
    </div>
  );
};
