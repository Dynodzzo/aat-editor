import { Separator } from "radix-ui";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { ConfigPanel } from "../ConfigPanel/ConfigPanel";

export const SidePanel = () => {
  return (
    <div className="flex flex-col basis-100">
      <ConfigPanel />
      <Separator.Root orientation="horizontal" className="w-full h-px bg-neutral-200" />
      <AudioPlayer />
    </div>
  );
};
