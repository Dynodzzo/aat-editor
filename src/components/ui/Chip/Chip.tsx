import clsx from "clsx";
import { memo, useMemo } from "react";

type ChipProps = {
  value: string;
  highlighted?: boolean;
  onClick?: () => void;
};

export const Chip = memo(function ColorIndicator({ value, highlighted, onClick }: ChipProps) {
  const containerClass = useMemo(() => {
    return highlighted
      ? "inset-ring-2 inset-ring-slate-600 text-slate-600"
      : "inset-ring inset-ring-zinc-500 text-zinc-500";
  }, [highlighted]);

  const textClass = useMemo(() => {
    return highlighted ? "font-semibold" : "font-medium";
  }, [highlighted]);

  return (
    <div
      className={clsx("grid place-content-center px-3 py-2 rounded-full w-min cursor-pointer", containerClass)}
      onClick={onClick}
    >
      <span className={clsx("text-xs", textClass)}>{value}</span>
    </div>
  );
});
