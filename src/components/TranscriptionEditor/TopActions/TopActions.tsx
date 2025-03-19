import { ArrowLeft } from "iconoir-react";
import { memo } from "react";
import { Button } from "../../ui/Button/Button";

export const TopActions = memo(function TopActions() {
  return (
    <div className="top-nav flex flex-row h-10 bg-neutral-100 px-2">
      <Button
        prefix={<ArrowLeft width={12} height={12} strokeWidth={2} className="text-neutral-800" />}
        type="secondary"
      >
        Back
      </Button>
    </div>
  );
});
