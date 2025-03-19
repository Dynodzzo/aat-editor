import { Settings } from "iconoir-react";
import { memo } from "react";
import { IconButton } from "../../ui/Button/IconButton";
import { ExportButton } from "../Form/ExportButton/ExportButton";

export const RightActions = memo(function RightActions() {
  return (
    <div className="right-nav flex flex-col items-center w-10 bg-neutral-100 py-2 gap-3">
      <IconButton type="secondary" icon={<Settings width={18} height={18} />} />
      <ExportButton />
    </div>
  );
});
