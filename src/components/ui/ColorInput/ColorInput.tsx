import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { hexToHSL } from "../../../utils/color.utils";

export type ColorInputProps = {
  value: string;
  id?: string;
  onChange?: (value: string) => void;
};

export const ColorInput = memo(function ColorInput({ value, id, onChange }: ColorInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string>(value);
  const deferredColor = useDeferredValue<string>(color);
  const [previousDeferredColor, setPreviousDeferredColor] = useState<string>(deferredColor);

  const { h, s, l } = useMemo(() => hexToHSL(deferredColor), [deferredColor]);

  const handleClick = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor(event.target.value);
    },
    [setColor]
  );

  useEffect(() => {
    if (deferredColor !== previousDeferredColor) {
      setPreviousDeferredColor(deferredColor);
      if (onChange) onChange(deferredColor);
    }
  }, [deferredColor, previousDeferredColor, onChange]);

  return (
    <div
      className="w-4 h-4 rounded-full cursor-pointer  grid place-items-center"
      style={{ boxShadow: `0.5px 0.5px 4px 0px hsl(${h} ${s} ${l + 20})` }}
      onClick={handleClick}
    >
      <div className="w-4 h-4 inset-ring-2 inset-ring-slate-100 rounded-full" style={{ backgroundColor: value }}>
        <input
          ref={inputRef}
          id={id}
          type="color"
          value={color}
          onChange={handleChange}
          className="opacity-0  w-0 h-0"
        />
      </div>
    </div>
  );
});
