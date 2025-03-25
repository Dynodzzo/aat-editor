import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { ConfigPanel } from "../ConfigPanel/ConfigPanel";

export const SidePanel = () => {
  return (
    <div className="flex flex-col basis-100 bg-white">
      <ConfigPanel />
      <AudioPlayer />
    </div>
  );
};
