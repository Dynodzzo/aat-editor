import { memo, useMemo } from "react";
import { hexToHSL } from "../../../utils/color.utils";

type ColorIndicatorProps = {
  color: string;
};

export const ColorIndicator = memo(function ColorIndicator({ color }: ColorIndicatorProps) {
  const { h, s, l } = useMemo(() => hexToHSL(color), [color]);

  return (
    <div className="w-4 h-4 grid grid-rows-1 grid-cols-1">
      <div
        className="w-3 h-3 rounded-full row-[1] col-[1] place-self-center blur-[1px]"
        style={{ backgroundColor: `hsl(${h} ${s} ${l + 20})` }}
      ></div>
      <div
        className="w-2 h-2 rounded-full row-[1] col-[1] place-self-center z-10"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
});
