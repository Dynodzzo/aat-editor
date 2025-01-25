import clsx from "clsx";
import { memo, useCallback, useMemo } from "react";

export type InputVariant = "fill" | "outline";
export type InputSize = "sm" | "md";

export type InputProps = {
  value: string;
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  additionalClasses?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = memo(function InputField({
  value,
  placeholder = "",
  variant = "outline",
  size = "md",
  additionalClasses = "",
  onChange,
}: InputProps) {
  const variantClass = useMemo(() => {
    return variant === "fill" ? "bg-zinc-200" : "bg-transparent inset-ring inset-ring-zinc-300";
  }, [variant]);

  const sizeClass = useMemo(() => {
    return size === "md" ? "p-3" : "px-2 py-1";
  }, [size]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event);
    },
    [onChange]
  );

  return (
    <div className="text-sm text-zinc-500 font-normal">
      <input
        className={clsx(
          "w-full h-full placeholder:italic placeholder:text-zinc-400 rounded-md",
          variantClass,
          sizeClass,
          additionalClasses
        )}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
});
