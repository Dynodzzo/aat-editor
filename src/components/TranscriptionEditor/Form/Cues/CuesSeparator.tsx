import { Separator } from "radix-ui";
import { memo } from "react";

export const CuesSeparator = memo(function CuesSeparator() {
  return (
    <div className="flex flex-row items-stretch">
      <div className="px-4 grow bg-transparent">
        <Separator.Root
          orientation="horizontal"
          className="w-full h-px [background:repeating-linear-gradient(90deg,#E5E5E5,#E5E5E5_4px,transparent_4px,transparent_8px)]"
        />
      </div>
      <Separator.Root orientation="vertical" className="w-px h-full bg-neutral-200" />
      <div className="px-4 grow">
        <Separator.Root
          orientation="horizontal"
          className="w-full h-px [background:repeating-linear-gradient(90deg,#E5E5E5,#E5E5E5_4px,transparent_4px,transparent_8px)]"
        />
      </div>
    </div>
  );
});
