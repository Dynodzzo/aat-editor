import clsx from "clsx";
import { memo, useCallback } from "react";

export type TransformableInputProps = {
  type?: "text" | "password" | "time";
  value: string;
  id?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TransformableInput = memo(function Input({
  type = "text",
  value,
  id,
  placeholder = "",
  min,
  max,
  step,
  className = "",
  onChange,
}: TransformableInputProps) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event);
    },
    [onChange]
  );

  return (
    <div
      className={clsx(
        "border-1 border-transparent rounded-sm grid place-content-center",
        "hover:border-1 hover:not-focus-within:border-dashed hover:border-neutral-200",
        "focus-within:border-solid focus-within:border-neutral-200 focus-within:bg-neutral-50",
        className
      )}
    >
      <input
        id={id}
        className={clsx(
          "w-full h-full placeholder:italic placeholder:text-neutral-400 font-normal text-xs text-neutral-500 [text-align:inherit]",
          "focus-visible:outline-none"
        )}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </div>
  );
});
