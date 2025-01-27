import clsx from "clsx";
import { memo, useMemo } from "react";

type ChipProps = {
  value: string;
  id?: string;
  highlighted?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
};

export const Chip = memo(function ColorIndicator({ value, id, highlighted, onClick }: ChipProps) {
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
      id={id}
      className={clsx("grid place-content-center px-3 py-2 rounded-full w-min cursor-pointer", containerClass)}
      onClick={onClick}
    >
      <span className={clsx("text-xs", textClass)}>{value}</span>
    </div>
  );
});
