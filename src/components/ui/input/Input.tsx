import clsx from "clsx";
import { memo, useCallback, useMemo } from "react";

export type InputVariant = "fill" | "outline";
export type InputSize = "sm" | "md";

export type InputProps = {
  value: string;
  id?: string;
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = memo(function Input({
  value,
  id,
  placeholder = "",
  variant = "outline",
  size = "md",
  className = "",
  onChange,
}: InputProps) {
  const variantClass = useMemo(() => {
    return variant === "fill" ? "bg-zinc-200" : "bg-transparent inset-ring inset-ring-zinc-300";
  }, [variant]);

  const sizeClass = useMemo(() => {
    return size === "md" ? "p-3" : "p-2";
  }, [size]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event);
    },
    [onChange]
  );

  return (
    <div className={clsx("text-sm text-zinc-500 font-normal", className)}>
      <input
        id={id}
        className={clsx(
          "w-full h-full placeholder:italic placeholder:text-zinc-400 rounded-md [text-align:inherit]",
          variantClass,
          sizeClass
        )}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
});
