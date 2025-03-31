import { useThrottle } from "@uidotdev/usehooks";
import { memo, useCallback, useEffect, useRef, useState } from "react";

export type ColorInputProps = {
  value: string;
  id?: string;
  onChange?: (value: string) => void;
};

export const ColorInput = memo(function ColorInput({ value, id, onChange }: ColorInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string>(value);
  const throttledColor = useThrottle(color, 500);

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
    if (onChange) onChange(throttledColor);
  }, [throttledColor, onChange]);

  return (
    <div className="w-4 h-4 rounded-full cursor-pointer grid place-items-center" onClick={handleClick}>
      <div className="w-4 h-4 inset-ring-2 inset-ring-neutral-100 rounded-full" style={{ backgroundColor: value }}>
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
