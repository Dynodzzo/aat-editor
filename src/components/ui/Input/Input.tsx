import clsx from "clsx";
import { memo, useCallback } from "react";

export type InputVariant = "fill" | "outline";
export type InputSize = "sm" | "md";

export type InputProps = {
  type?: "text" | "password" | "time";
  value: string;
  id?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = memo(function Input({
  type = "text",
  value,
  id,
  placeholder = "",
  min,
  max,
  step,
  className = "",
  onChange,
}: InputProps) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event);
    },
    [onChange]
  );

  return (
    <div
      className={clsx(
        "px-2 py-1 bg-neutral-50 ring-1 ring-neutral-200 rounded-sm",
        "focus-within:ring-2 focus-within:ring-neutral-400",
        className
      )}
    >
      <input
        id={id}
        className={clsx(
          "w-full h-6 placeholder:italic placeholder:text-neutral-400 font-normal text-sm text-neutral-500 [text-align:inherit] focus-visible:outline-none"
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
